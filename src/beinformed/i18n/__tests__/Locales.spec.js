import { getNativeName } from "beinformed/i18n/Locales";
import Locales from "beinformed/i18n/Locales";

jest.mock(
  "../translations/layout_en.nl.json",
  () => ({
    testMessage: "testMessage",
    messageWithParams: "Param 1: {param1}, Param 2: {param2}",
    messageWithJavaParams: "Param 1: ${param1}, Param 2: ${param2}"
  }),
  { virtual: true }
);

describe("Locales", () => {
  it("should be able to give back the native name of a locale", () => {
    expect(getNativeName("de")).toBe("Deutsch");

    expect(getNativeName("en")).toBe("English");
    expect(getNativeName("en-GB")).toBe("English (GB)");
    expect(getNativeName("en-US")).toBe("English (US)");
    expect(getNativeName("fr-FR-FR")).toBe("Français (FR)");

    expect(() => {
      getNativeName("");
    }).toThrow();
  });

  it("should be able to retrieve information about a locale", () => {
    expect(() => {
      getNativeName("bla");
    }).toThrow();

    expect(new Locales().all.length).toBe(2);
    expect(new Locales().getLocale("en").code).toBe("en");
    expect(new Locales().getLocale("en").nativeName).toBe("English");
    expect(() => {
      expect(new Locales().getLocale("bla").nativeName);
    }).toThrow();
  });

  it("should be able to retrieve messages", () => {
    const englishLocale = new Locales().getLocale("en");

    expect(englishLocale.getMessage("testMessage", "exists")).toBe(
      "testMessage"
    );
    expect(englishLocale.getMessage("notPresent", "not exists")).toBe(
      "not exists"
    );
    expect(englishLocale.getMessage("notPresent")).toBe("notPresent");

    expect(() => {
      expect(englishLocale.getMessage()).toThrow();
    });

    expect(
      englishLocale.getMessage("messageWithParams", "default message", {
        param1: "first parameter",
        param2: "second parameter"
      })
    ).toBe("Param 1: first parameter, Param 2: second parameter");

    expect(
      englishLocale.getMessage("messageWithJavaParams", "default message", {
        param1: "first parameter",
        param2: "second parameter"
      })
    ).toBe("Param 1: first parameter, Param 2: second parameter");
  });
});
