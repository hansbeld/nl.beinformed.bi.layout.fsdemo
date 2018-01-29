import javaToMomentFormat from "beinformed/utils/datetime/javaToMomentFormat";

describe("javaToMomentFormat", () => {
  test("should be able to convert Java SimpleDateTime formats to a moment format", () => {
    // 2001.07.04 AD at 12:08:56 PDT
    expect(javaToMomentFormat("yyyy.MM.dd 'at' HH:mm:ss z")).toBe(
      "YYYY.MM.DD [at] HH:mm:ss ZZ"
    );

    // Wed, Jul 4, '01
    expect(javaToMomentFormat("EEE, MMM d, ''yy")).toBe("ddd, MMM D, 'YY");

    // 12:08 PM
    expect(javaToMomentFormat("h:mm a")).toBe("h:mm a");

    // 12 o'clock PM, Pacific Daylight Time
    expect(javaToMomentFormat("hh 'o''clock' a, zzzz")).toBe(
      "hh [o'clock] a, Z"
    );

    // 1:08 PM, PDT
    expect(javaToMomentFormat("k:mm a, z")).toBe("k:mm a, ZZ");

    // "K:mm a, z" | 0:08 PM, PDT
    expect(javaToMomentFormat("k:mm a, z")).toBe("k:mm a, ZZ");

    // "yyyyy.MMMMM.dd GGG hh:mm aaa"| 02001.July.04 AD 12:08 PM
    expect(javaToMomentFormat("yyyyy.MMMMM.dd GGG hh:mm aaa")).toBe(
      "YYYYY.MMMMM.DD GGG hh:mm aaa"
    );

    // "EEE, d MMM yyyy HH:mm:ss Z"| Wed, 4 Jul 2001 12:08:56 -0700
    expect(javaToMomentFormat("EEE, d MMM yyyy HH:mm:ss Z")).toBe(
      "ddd, D MMM YYYY HH:mm:ss ZZ"
    );

    // "yyMMddHHmmssZ"| 010704120856-0700
    expect(javaToMomentFormat("yyMMddHHmmssZ")).toBe("YYMMDDHHmmssZZ");

    // "yyyy-MM-dd'T'HH:mm:ss.SSSZ"| 2001-07-04T12:08:56.235-0700
    expect(javaToMomentFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ")).toBe(
      "YYYY-MM-DD[T]HH:mm:ss.SSSZZ"
    );

    // "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"| 2001-07-04T12:08:56.235-07:00
    expect(javaToMomentFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX")).toBe(
      "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
    );

    // "YYYY-'W'ww-u"| 2001-W27-3
    expect(javaToMomentFormat("YYYY-'W'ww-u")).toBe("YYYY-[W]WW-E");
  });
});
