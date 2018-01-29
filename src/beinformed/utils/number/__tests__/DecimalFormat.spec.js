import DecimalFormat from "../DecimalFormat";

describe("DecimalFormat", () => {
  it("should be able to handle the java.text.DecimalFormat", () => {
    expect(new DecimalFormat("###,###.###").format("123456.789")).toBe(
      "123,456.789"
    );
    expect(new DecimalFormat("###.##").format("123456.789")).toBe("123456.79");
    expect(new DecimalFormat("000000.000").format("123.78")).toBe("000123.780");
    expect(new DecimalFormat("$###,###.###").format("12345.67")).toBe(
      "$12,345.67"
    );
    expect(new DecimalFormat("\u00A5###,###.###").format("12345.67")).toBe(
      "¥12,345.67"
    );

    expect(new DecimalFormat("#,##0.00").format("111")).toBe("111.00");
  });
});
