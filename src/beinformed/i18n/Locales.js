// @flow
import MessageFormat from "message-format";
import acceptLanguage from "accept-language";

import englishMessages from "beinformed/i18n/translations/layout_en.nl.json";
import dutchMessages from "beinformed/i18n/translations/layout_nl.nl.json";
import englishErrors from "beinformed/i18n/translations/beinformed_error_messages_en.nl.json";
import dutchErrors from "beinformed/i18n/translations/beinformed_error_messages_nl.nl.json";

import languages from "beinformed/i18n/languages.json";

/**
 * Order of locales is the prefered order of locales.
 * When user has an accept language header that does not correspond to the locales array,
 * the first one is used as the prefered language
 */
export const availableLocales = [
  {
    code: "en",
    messages: englishMessages,
    errors: englishErrors
  },
  {
    code: "nl",
    messages: dutchMessages,
    errors: dutchErrors
  }
];

export const getNativeName = (locale: string) => {
  const aLocale = locale.split("-");

  if (aLocale.length > 0) {
    const language = languages.lang[aLocale[0]];

    if (language) {
      return language[1] + (aLocale[1] ? ` (${aLocale[1].toUpperCase()})` : "");
    }
  }

  throw new Error(`Can not find language name based on locale: ${locale}`);
};

/**
 * Exported messages from Be Informed have placeholders in the syntax ${placeholder_name} where our messageformat module uses {placeholder_name}.
 * This method converts the ${} to {}
 */
const fixPlaceHolders = messages =>
  JSON.parse(
    JSON.stringify(messages)
      .replace(/(\${(.*?)})/g, "{$2}")
      .replace(/('{(.*?)})/g, "''{$2}")
  );

class Locale {
  _code: string;
  _messages: { [string]: string };
  _errors: { [string]: string };

  constructor(locale: {
    code: string,
    messages: { [string]: string },
    errors: { [string]: string }
  }) {
    this._code = locale.code;
    this._messages = locale.messages;
    this._errors = locale.errors;
  }

  get code(): string {
    return this._code;
  }

  get nativeName(): string {
    const aLocale = this.code.split("-");

    if (aLocale.length > 0) {
      const language = languages.lang[aLocale[0]];

      if (language) {
        return (
          language[1] + (aLocale[1] ? ` (${aLocale[1].toUpperCase()})` : "")
        );
      }
    }

    throw new Error(`Can not find language name based on locale: ${this.code}`);
  }

  /**
   * Retrieve a pluralized message. See {@link https://github.com/messageformat/messageformat.js#readme} for more information of the pluralization format
   */
  getMessage(
    id: string,
    defaultMessage?: string,
    parameters?: MessageParametersType
  ) {
    if (!id && !defaultMessage) {
      return "[message: id or defaultMessage missing]";
    }

    const message =
      this._messages[id] || this._errors[id] || defaultMessage || id;

    if (parameters) {
      return new MessageFormat(this.code, fixPlaceHolders(message)).format(
        parameters
      );
    }

    return message;
  }

  /**
   * Add or change messages for this locale. It is not possible to remove messages.
   */
  update(messages: Object = {}, errors: Object = {}) {
    this._messages = {
      ...this._messages,
      ...messages
    };

    this._errors = {
      ...this._errors,
      ...errors
    };
  }
}

class Locales {
  _locales: Locale[];

  constructor(locales: Array<LocaleConfigurationType> = availableLocales) {
    this._locales = locales.map(locale => new Locale(locale));
  }

  static rehydrate(hydatedLocales: {
    _locales: Array<{
      _code: string,
      _messages: {
        [string]: string
      },
      _errors: {
        [string]: string
      }
    }>
  }) {
    if (hydatedLocales && hydatedLocales._locales) {
      return new Locales(
        hydatedLocales._locales.map(locale => ({
          code: locale._code,
          messages: locale._messages,
          errors: locale._errors
        }))
      );
    }

    return new Locales([]);
  }

  get all(): Locale[] {
    return this._locales;
  }

  hasLocale(localeCode: string) {
    return (
      typeof this._locales.find(item => item.code === localeCode) !==
      "undefined"
    );
  }

  getLocale(localeCode: string) {
    if (this.hasLocale(localeCode)) {
      const locale = this._locales.find(item => item.code === localeCode);
      if (locale) {
        return locale;
      }
    }
    throw new Error(`Locale configuration for locale ${localeCode} not found`);
  }

  get availableLocaleCodes(): Array<string> {
    return this._locales.map(locale => locale.code);
  }

  getPreferredLocale(acceptLanguageHeader: string | null) {
    if (acceptLanguageHeader === null) {
      return "en";
    }

    acceptLanguage.languages(this.availableLocaleCodes);
    return acceptLanguage.get(acceptLanguageHeader);
  }

  /**
   * Add or change messages and errors for the given locale. It is not possible to remove messages.
   */
  update(locale: string, messages: Object = {}, errors: Object = {}) {
    if (this.hasLocale(locale)) {
      this.getLocale(locale).update(messages, errors);
    } else {
      this._locales.push(
        new Locale({
          code: locale,
          messages,
          errors
        })
      );
    }
  }
}

export default Locales;
