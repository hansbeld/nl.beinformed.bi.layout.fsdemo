// @flow
import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";

import type Locales from "beinformed/i18n/Locales";

export type receiveLocaleType = {
  type: "UPDATE_LOCALE",
  payload: string
};

export type setLocalesType = {
  type: "SET_LOCALES",
  payload: {
    locales: Locales,
    locale: string
  }
};

/**
 * Update current locale
 */
export const receiveLocale = (locale: string): receiveLocaleType => ({
  type: "UPDATE_LOCALE",
  payload: locale
});

/**
 * Change locale of application and redirect
 */
export const updateLocale = (locale: string): ThunkAction => dispatch => {
  dispatch(startProgress());
  dispatch(receiveLocale(locale));

  dispatch(finishProgress());
};

export const setLocales = (
  locales: Locales,
  locale: string
): setLocalesType => ({
  type: "SET_LOCALES",
  payload: {
    locales,
    locale
  }
});
