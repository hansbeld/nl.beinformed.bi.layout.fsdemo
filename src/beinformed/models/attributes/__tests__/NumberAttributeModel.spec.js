import NumberAttributeModel from "beinformed/models/attributes/NumberAttributeModel";

describe("NumberAttributeModel", () => {
  it("should be able to create an empty NumberAttribute object", () => {
    const attribute = new NumberAttributeModel();

    expect(attribute instanceof NumberAttributeModel).toBe(true);

    expect(attribute.getInitialInputValue(21)).toBe("21");
    expect(attribute.getInitialInputValue(0)).toBe("0");

    expect(attribute.groupingSeparator).toBe("");
    expect(attribute.decimalSeparator).toBe("");
    expect(attribute.minValue).toBeUndefined();
    expect(attribute.maxValue).toBeUndefined();
    expect(attribute.maxDigits).toBe(0);
  });

  it("can have a format", () => {
    const attribute = new NumberAttributeModel(
      {},
      {
        format: "##.00",
        groupingSeparator: ".",
        decimalSeparator: ","
      }
    );

    expect(attribute.groupingSeparator).toBe(".");
    expect(attribute.decimalSeparator).toBe(",");
    expect(attribute.maxDigits).toBe(2);
  });

  it("can parse numbers based on configuration", () => {
    const attribute = new NumberAttributeModel();

    expect(attribute.parseToNumber()).toBeNaN();
    expect(attribute.parseToNumber(null)).toBeNaN();
    expect(attribute.parseToNumber("")).toBeNaN();
    expect(attribute.parseToNumber("A")).toBeNaN();

    expect(attribute.parseToNumber(1)).toBe(1);
    expect(attribute.parseToNumber("1")).toBe(1);
    expect(attribute.parseToNumber(1.1234)).toBe(1.1234);

    const attributeWithDecimalConfig = new NumberAttributeModel(
      {},
      {
        decimalSeparator: ","
      }
    );

    expect(attributeWithDecimalConfig.parseToNumber("112,22")).toBe(112.22);
  });

  it("has constraints", () => {
    let attribute = new NumberAttributeModel();
    expect(attribute.constraintCollection.length).toBe(1);

    expect(attribute.isInteger("1")).toBe(true);
    expect(attribute.isInteger("a")).toBe(false);
    expect(attribute.isInteger(-1)).toBe(true);

    // is true because input is parsed to number without decimals when no format is set:
    expect(attribute.isInteger(1, 234)).toBe(true);

    expect(attribute.isInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(attribute.isInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(true);

    expect(attribute.isInteger(Number.MIN_SAFE_INTEGER)).toBe(true);
    expect(attribute.isInteger(Number.MIN_SAFE_INTEGER - 1)).toBe(true);

    attribute = new NumberAttributeModel(
      {},
      {
        format: "##.00",
        minimum: 1,
        maximum: 1000
      }
    );
    expect(attribute.isValidDecimal("1")).toBe(true);
    expect(attribute.isValidDecimal("a")).toBe(false);
    expect(attribute.isValidDecimal(-1)).toBe(true);
    expect(attribute.isValidDecimal(1.21)).toBe(true);
    expect(attribute.isValidDecimal(1.2231)).toBe(false);

    expect(attribute.isExactNumber(1)).toBe(true);
    expect(attribute.isExactNumber(2)).toBe(false);

    expect(attribute.isSameOrAboveMinNumber(-1)).toBe(false);
    expect(attribute.isSameOrAboveMinNumber(1)).toBe(true);
    expect(attribute.isSameOrAboveMinNumber(2)).toBe(true);

    expect(attribute.isSameOrBelowMaxNumber(1001)).toBe(false);
    expect(attribute.isSameOrBelowMaxNumber(1000)).toBe(true);
    expect(attribute.isSameOrBelowMaxNumber(999)).toBe(true);

    expect(attribute.isBetweenNumbers(500)).toBe(true);

    expect(attribute.constraintCollection.length).toBe(2);

    attribute = new NumberAttributeModel(
      {},
      {
        minimum: 1,
        maximum: 1
      }
    );
    expect(attribute.constraintCollection.length).toBe(2);

    attribute = new NumberAttributeModel(
      {},
      {
        minimum: 1
      }
    );
    expect(attribute.constraintCollection.length).toBe(2);

    attribute = new NumberAttributeModel(
      {},
      {
        maximum: 1000
      }
    );
    expect(attribute.constraintCollection.length).toBe(2);
  });

  it("can update", () => {
    const attribute = new NumberAttributeModel();
    attribute.update("12.3");

    expect(attribute.readonlyvalue).toBe("12.3");

    attribute.reset();
    expect(attribute.readonlyvalue).toBe("");
  });
});
