// @flow
import {
  APPLICATION_PATH,
  BASE,
  CONTENT_PATH,
  HTTP_METHODS
} from "beinformed/constants/Constants";

import Parameter from "beinformed/models/href/Parameter";

import type { Location } from "react-router-dom";

/**
 * Defines a Href with the parameters
 */
class Href {
  _path: string;
  _parameters: Parameter[];
  _hash: string;
  _state: Object | null;
  _method: string;
  _resourcetype: string;

  /**
   * Create a Href
   */
  constructor(href?: string | Href | Object | null, resourcetype?: string) {
    this.path = "";
    this.parameters = [];
    this.hash = "";
    this.state = null;
    this.method = HTTP_METHODS.GET;
    this.resourcetype = resourcetype || "";

    if (href instanceof Href) {
      this.setFromHref(href);
    } else if (href !== null && typeof href === "object" && href._path) {
      this.setFromObject(href);
    } else if (href !== null && typeof href === "object" && href.pathname) {
      this.setFromLocation(href);
    } else if (typeof href === "string") {
      this.setFromString(href);
    }

    if (this.path.indexOf(APPLICATION_PATH) === 0) {
      this.path = this.path.substring(APPLICATION_PATH.length);
    }
  }

  /**
   * Set parameters from Href model input
   */
  setFromHref(href: Href) {
    this.path = href.path;
    this.parameters = href.parameters;
    this.hash = href.hash;
  }

  /**
   * Set parameters from object input
   */
  setFromObject(href: Object) {
    this.path = href._path;
    if (Array.isArray(href._parameters)) {
      href._parameters.map(param =>
        this.addParameter(param._name, param._value, param._prefix)
      );
    }
    this.hash = href._hash;
  }

  setFromLocation(href: Location) {
    this.path = href.pathname;
    this.addParametersFromHref(href.search);
    this.hash = Href.getHashFromString(href.hash);
    this.state = href.state || null;
  }

  /**
   * Set parameters from string input
   */
  setFromString(href: string) {
    this.path = Href.getPathFromString(href);
    this.addParametersFromHref(href);
    this.hash = Href.getHashFromString(href);
  }

  get isChangePassword(): boolean {
    return this._path.indexOf("/change-password") > -1;
  }

  // Check if url is relative (not checking for absolute urls with same domain)
  get isExternal(): boolean {
    const isRelative =
      (this.path.substr(0, 2) !== "//" && this.path.substr(0, 1) === "/") ||
      this.path.substr(0, 1) === "#";
    const isCamelRoute =
      this.path.startsWith("/restServices") &&
      !this.path.startsWith("/restServices/ui");

    return !isRelative || isCamelRoute;
  }

  /**
   * Retrieve the relative path part of a href string, e.g. https://www.beinformed.com/BeInformed/tab/view?q=url => /tab/view
   */
  static getPathFromString(href: string) {
    const decodedHref = decodeURI(href);

    const hrefNoHash = decodedHref.includes("#")
      ? decodedHref.substr(0, decodedHref.indexOf("#"))
      : decodedHref;

    const temphref =
      hrefNoHash.indexOf(BASE) > -1
        ? hrefNoHash.substr(hrefNoHash.indexOf(BASE) + BASE.length)
        : hrefNoHash;

    return temphref.indexOf("?") > -1 ? temphref.split("?")[0] : temphref;
  }

  /**
   * Retrieve hash of href string
   * @param {string} href - A complete url
   * @return {string} the hash of an url or an empty string
   */
  static getHashFromString(href: string = "") {
    return href.includes("#") ? href.substr(href.indexOf("#") + 1) : "";
  }

  /**
   * Add a parameter for each parameter found in the querystring of an URL string, e.g. https://www.beinformed.com?q=url => q=url
   * @param {string} href - A complete URL
   */
  addParametersFromHref(href: string) {
    if (href.indexOf("?") > -1) {
      href
        .split("?")[1]
        .split("&")
        .forEach(param => {
          const paramFromString: Parameter | null = Parameter.fromString(param);

          if (paramFromString && paramFromString !== null) {
            this._parameters.push(paramFromString);
          }
        });
    }

    return this;
  }

  /**
   * Add a querystring parameter to the parameter collection of this Href, skips parameters that have a value of null
   */
  addParameter(
    name: string,
    value: string | null,
    prefix: string | null = null
  ) {
    if (value !== null) {
      this.removeParameter(name, prefix);
      this._parameters.push(new Parameter(prefix, name, value));
    }

    return this;
  }

  /**
   * Adds or overwrites a parameter when it exists and value is not null.
   * Removes the parameter when the value is null
   */
  setParameter(
    name: string,
    value: string | null,
    prefix: string | null = null
  ) {
    if (value === null) {
      this.removeParameter(name, prefix);
    } else {
      this.addParameter(name, value, prefix);
    }
  }

  /**
   * Retrieve a parameter by it's name and (optionally) prefix
   */
  getParameter(name: string, prefix: string | null = null): ?Parameter {
    return this._parameters.find(
      param => param.prefix === prefix && param.name === name
    );
  }

  hasParameter(name: string, prefix: string | null = null): boolean {
    return typeof this.getParameter(name, prefix) !== "undefined";
  }

  /**
   * Get request method
   */
  get method(): string {
    return this._method;
  }

  /**
   * Set request method
   */
  set method(method: string) {
    this._method = method || HTTP_METHODS.GET;
  }

  /**
   * Retrieve all paremters
   */
  get parameters(): Parameter[] {
    return this._parameters;
  }

  /**
   * Replace parameters of Href
   */
  set parameters(parameters: Parameter[]) {
    this._parameters = parameters;
  }

  /**
   * Remove a parameter from the parameter collection
   */
  removeParameter(name: string, prefix: string | null = null) {
    this._parameters = this._parameters.filter(
      param => param.prefix !== prefix || param.name !== name
    );

    return this;
  }

  /**
   * Get the parameters as a querystring, e.g. param1=value1&param2=value2, optionally with prefix
   */
  getQuerystring(withPrefix: boolean = false): string {
    return this.parameters
      .filter(
        param => typeof param.value !== "undefined" && param.value !== null
      )
      .map(param => param.toString(withPrefix))
      .join("&");
  }

  /**
   * Retrieve a querystring that only contains parameter that can be send to the modular ui, parameters are filtered by prefix
   */
  getQuerystringForModularUI(prefix: string = ""): string {
    return this.parameters
      .filter(
        param =>
          param.isModUIParameter &&
          (!prefix || !param.prefix || param.prefix === prefix) &&
          (typeof param.value !== "undefined" && param.value !== null)
      )
      .map(param => param.toString(false))
      .join("&");
  }

  /**
   * Retrieve all parameters from the parameter collection in a querystring style name1=value1&name2=value2, without the prefix
   */
  get querystring(): string {
    return this.getQuerystring(false);
  }

  /**
   * Set the path of the Href, the part before the querystring question mark
   */
  set path(path: string) {
    this._path = path;
  }

  /**
   * Retrieve the path
   */
  get path(): string {
    return this._path || "";
  }

  /**
   * Set hash
   */
  set hash(hash: string) {
    this._hash = hash;
  }

  /**
   * Retrieve hash
   */
  get hash(): string {
    return this._hash;
  }

  set state(state: Object | null) {
    this._state = state;
  }

  get state(): Object | null {
    return this._state;
  }

  /**
   * Set resourctype
   */
  set resourcetype(resourcetype: string) {
    this._resourcetype = resourcetype;
  }

  /**
   * Retrieve resourceType
   */
  get resourcetype(): string {
    return this._resourcetype;
  }

  /**
   * Retrieve the path combined with the BASE of the application, e.g. /BeInformed
   */
  get absolutepath(): string {
    return BASE + this.path;
  }

  /**
   * Retrieves the combination of the path and the querystring
   */
  get href(): string {
    const querystring = this.querystring;

    return querystring.length > 0
      ? [this.path, querystring].join("?")
      : this.path;
  }

  /**
   * Getting the URL including the base path
   */
  get absolutehref(): string {
    const querystring = this.getQuerystring(true);

    return querystring.length > 0
      ? [this.absolutepath, querystring].join("?")
      : this.absolutepath;
  }

  /**
   * Checks if the URL starts within the given href
   */
  startsWith(href: Href): boolean {
    return `${this.path}/`.indexOf(`${href.path}/`) === 0;
  }

  /**
   * Checks if the given Href equals this Href
   */
  equals(href?: Href | string): boolean {
    if (href instanceof Href) {
      return this.path === href.path;
    }

    return this.path === href;
  }

  equalsWithParameters(href: Href): boolean {
    if (!this.equals(href)) {
      return false;
    }

    if (href instanceof Href) {
      if (this.parameters.length !== href.parameters.length) {
        return false;
      }

      const thisParams = this.parameters.map(param => param.toString());
      return (
        typeof href.parameters.find(
          param => !thisParams.includes(param.toString())
        ) === "undefined"
      );
    }

    throw new Error(`${href} is not an instance of Href`);
  }

  /**
   * Check if this href is in context of an other href. Used to determine if extra context information should be requested.
   */
  hasOtherContext(otherHref: Href): boolean {
    if (!otherHref) {
      return false;
    }
    const thisUriParts = this.path.split("/");
    const otherUriParts = otherHref.path.split("/");

    if (thisUriParts.length === otherUriParts.length) {
      thisUriParts.pop();
      otherUriParts.pop();
    }

    const hasSameContext = thisUriParts.every((uriPart, i) => {
      if (i < otherUriParts.length) {
        return uriPart === otherUriParts[i];
      }

      return true;
    });

    return !hasSameContext;
  }

  /**
   * Indicates if the link is a content link
   */
  get isContent(): boolean {
    return this.absolutepath.indexOf(CONTENT_PATH) === 0;
  }

  /**
   * Returns a complete url from the Href
   */
  toString(): string {
    return this.href;
  }

  toLocation(): Location {
    const querystring = this.querystring;
    const hash = this.hash;

    return {
      pathname: this.path,
      search: querystring.length > 0 ? `?${this.querystring}` : "",
      hash: hash.length > 0 ? `#${this.hash}` : "",
      state: this.state
    };
  }
}

export default Href;
