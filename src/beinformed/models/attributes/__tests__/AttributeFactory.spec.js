import AttributeFactory from "beinformed/models/attributes/AttributeFactory";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";
import PasswordAttributeModel from "beinformed/models/attributes/PasswordAttributeModel";
import DateAttributeModel from "beinformed/models/attributes/DateAttributeModel";

describe("AttributeFactory", () => {
  it("should be able to create a string attribute from a simple JSON structure", () => {
    const stringAttribute = AttributeFactory.createAttribute(
      "string",
      "string",
      {
        name: "string"
      },
      {
        type: "string"
      }
    );

    expect(stringAttribute instanceof StringAttributeModel).toBe(true);
    expect(stringAttribute.value).toBe(null);
    expect(stringAttribute.name).toBe("string");

    stringAttribute.inputvalue = "test string";

    expect(stringAttribute.value).toBe("test string");
  });

  it("should be able to create a string attribute with value from a simple JSON structure", () => {
    const stringAttribute = AttributeFactory.createAttribute(
      "string",
      "string",
      {
        name: "string",
        value: "test string"
      },
      {
        type: "string"
      }
    );

    expect(stringAttribute.value).toBe("test string");
  });

  it("should be able to create a password attribute from a simple JSON structure", () => {
    const passwordAttribute = AttributeFactory.createAttribute(
      "password",
      "password",
      {
        name: "password",
        value: "test password"
      },
      {
        type: "password",
        label: "Password attribute"
      }
    );

    expect(passwordAttribute instanceof PasswordAttributeModel).toBe(true);
  });

  it("should be able to create a date attribute from a simple JSON structure", () => {
    const dateAttribute = AttributeFactory.createAttribute(
      "date",
      "date",
      {
        name: "date",
        value: "2018-11-29"
      },
      {
        type: "date",
        label: "Date attribute",
        format: "DD-MM-YYYY"
      }
    );

    expect(dateAttribute instanceof DateAttributeModel).toBe(true);
    expect(dateAttribute.inputvalue).toBe("29-11-2018");
    expect(dateAttribute.value).toBe("2018-11-29");
  });
});
