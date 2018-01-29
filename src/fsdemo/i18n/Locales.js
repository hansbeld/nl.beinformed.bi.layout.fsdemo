// @flow
import defaultEnglishMessages from "beinformed/i18n/translations/layout_en.nl.json";
import defaultDutchMessages from "beinformed/i18n/translations/layout_nl.nl.json";

import englishMessages from "fsdemo/i18n/translations/layout_en.nl.json";
import dutchMessages from "fsdemo/i18n/translations/layout_nl.nl.json";

import englishErrors from "beinformed/i18n/translations/beinformed_error_messages_en.nl.json";
import dutchErrors from "beinformed/i18n/translations/beinformed_error_messages_nl.nl.json";

/**
 * Order of locales is the prefered order of locales.
 * When user has an accept language header that does not correspond to the locales array,
 * the first one is used as the prefered language
 */
export const availableLocales = [
  {
    code: "en",
    messages: Object.assign(defaultEnglishMessages, englishMessages),
    errors: englishErrors
  },
  {
    code: "nl",
    messages: Object.assign(defaultDutchMessages, dutchMessages),
    errors: dutchErrors
  }
];
