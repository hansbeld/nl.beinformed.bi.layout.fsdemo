// @flow
import Href from "beinformed/models/href/Href";

import type Locales from "beinformed/i18n/Locales";

export const getFullRequestUrl = (request: HttpServletRequestJava) => {
  const requestUrl = request.getRequestURL().toString();
  const queryString = request.getQueryString();

  if (queryString) {
    return `${requestUrl}?${queryString}`;
  }

  return requestUrl;
};

export const getFullRequestHref = (request: HttpServletRequestJava) =>
  new Href(getFullRequestUrl(request));

export const getPreferredLocale = (
  request: HttpServletRequestJava,
  locales: Locales
) => {
  const languageFromCookie = getCookieFromRequest(request, "locale");
  const acceptLanguageHeader =
    languageFromCookie || request.getHeader("Accept-Language");

  // when no accept language header or cookie present, get first locale code
  if (acceptLanguageHeader === null) {
    return locales.availableLocaleCodes[0];
  }

  return locales.getPreferredLocale(acceptLanguageHeader);
};

export const getCookieFromRequest = (
  request: HttpServletRequestJava,
  cookieName: string
) => {
  const cookies = request.getCookies();
  const cookieObject = {};

  if (cookies !== null) {
    // eslint-disable-next-line guard-for-in
    for (const i in cookies) {
      cookieObject[cookies[i].getName()] = cookies[i].getValue();
    }
  }

  return cookieObject[cookieName];
};
