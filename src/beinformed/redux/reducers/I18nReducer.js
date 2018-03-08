// @flow
import Cache from "beinformed/utils/browser/Cache";
import Locales from "beinformed/i18n/Locales";

export type I18nState = {
  locales: ?Locales,
  locale: string
};

const updateLocale = (state, action) => {
  // set locale in cookie
  if (document && document.cookie) {
    document.cookie = `locale=${action.payload}`;
  }

  // clear cache because of cached contributions
  Cache.clear();

  return {
    ...state,
    locale: action.payload
  };
};

// REDUCER
const initialState = {
  locales: new Locales(),
  locale: "en"
};

/**
 * Form reducer
 */
export default function i18nReducer(
  state: I18nState = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "SET_LOCALES":
      return {
        ...state,
        locales: action.payload.locales,
        locale: action.payload.locale
      };

    case "UPDATE_LOCALE":
      return updateLocale(state, action);

    default:
      return state;
  }
}
