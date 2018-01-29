// @flow
import deepmerge from "deepmerge";

import Cache from "beinformed/utils/browser/Cache";
import FetchError from "beinformed/utils/fetch/FetchError";

import { HTTP_METHODS } from "beinformed/constants/Constants";

const SUCCESS_CODE = 200;
const CLIENT_ERROR_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const REDIRECTION_CODE = 300;

const xhrdefault = {
  method: HTTP_METHODS.GET,
  params: "",
  data: null,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",

    // needed for csrf, see: https://plaza.beinformed.com/amdoc/user-interface/modular-ui/modular-ui-security
    "X-Requested-With": "XMLHttpRequest"
  },
  events: {}
};

/**
 * Encode parameter strings
 */
const encodeParams = (params: string): string =>
  params
    .split("&")
    .map(param =>
      param
        .split("=")
        .map(item => encodeURIComponent(item))
        .join("=")
    )
    .join("&");

/**
 * Convert Response to JSON, returns text when response can't be converted to JSON.
 */
const responseToJSON = (response): Object => {
  if (response.responseText) {
    if (typeof response.responseText === "object") {
      return response.responseText;
    }

    try {
      return JSON.parse(response.responseText);
    } catch (err) {
      return {
        error: "No responseText"
      };
    }
  } else {
    return {
      error: "No responseText"
    };
  }
};

/**
 * Process error response.
 *
 * @param  {XMLHttpRequest} failedXhr - The xmlhttp request object that failed.
 * @return {Object} - Returns object with fail information.
 */
const transferFailed = failedXhr =>
  new FetchError(responseToJSON(failedXhr), failedXhr);

/**
 * Create and fix url when params or both querystring and params exist.
 */
const constructUrl = (url: string, params: string): string => {
  if (params && params !== "") {
    if (url.includes("?")) {
      const aUrl = url.split("?");

      return `${aUrl[0]}?${aUrl[1]}&${encodeParams(params)}`;
    }

    return `${url}?${encodeParams(params)}`;
  }

  return url;
};

/**
 * XMLHttp Wrapper, based on {@link https://github.com/radiosilence/xr}.
 */
const xhr = (args: Object): Promise<Object> =>
  new Promise((resolve, reject) => {
    const options = deepmerge(xhrdefault, args);
    const xmlhttp = new XMLHttpRequest();

    // set events, @see {@link https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html#events}

    if (args.onProgress && args.onProgress !== null) {
      xmlhttp.addEventListener("progress", args.onProgress);
    }
    xmlhttp.addEventListener("abort", () => reject(transferFailed(xmlhttp)));
    xmlhttp.addEventListener("error", () => reject(transferFailed(xmlhttp)));
    xmlhttp.addEventListener("load", () => {
      const responseJSON = responseToJSON(xmlhttp);

      if (xmlhttp.status === UNAUTHORIZED_CODE) {
        return responseJSON.error === "No responseText"
          ? reject(
              new FetchError(
                responseToJSON({
                  status: UNAUTHORIZED_CODE,
                  error: {
                    id: "NOT_AUTHORIZED"
                  }
                }),
                xmlhttp
              )
            )
          : reject(transferFailed(responseJSON));
      }

      if (xmlhttp.status >= SUCCESS_CODE && xmlhttp.status < REDIRECTION_CODE) {
        return resolve(responseJSON);
      } else if (
        xmlhttp.status === CLIENT_ERROR_CODE &&
        responseJSON.hasOwnProperty("formresponse")
      ) {
        return resolve(responseJSON);
      }

      return reject(transferFailed(xmlhttp));
    });
    xmlhttp.addEventListener("timeout", () => reject(transferFailed(xmlhttp)));

    // Set custom events
    Object.keys(options.events).forEach(eventName => {
      xmlhttp.addEventListener(eventName, options.events[eventName]);
    });

    // Open connection
    xmlhttp.open(
      options.method,
      constructUrl(options.url, options.params),
      true
    );

    if (Cache.hasItem("basic")) {
      xmlhttp.withCredentials = true;
      const basicToken = Cache.getItem("basic");

      if (typeof basicToken === "string") {
        xmlhttp.setRequestHeader("Authorization", `Basic ${basicToken}`);
      }
    }

    // Set headers
    Object.keys(options.headers).forEach(headerName => {
      xmlhttp.setRequestHeader(headerName, options.headers[headerName]);
    });

    // Send data
    const data =
      typeof options.data === "object"
        ? JSON.stringify(options.data)
        : options.data;

    if (typeof options.data === "undefined") {
      xmlhttp.send();
    } else {
      xmlhttp.send(data);
    }
  });

export default xhr;
