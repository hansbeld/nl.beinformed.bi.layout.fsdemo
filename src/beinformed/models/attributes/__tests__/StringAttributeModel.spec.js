import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";

describe("StringAttributeModel", () => {
  it("should be able to create an empty StringAttribute object", () => {
    const attribute = new StringAttributeModel();

    expect(attribute instanceof StringAttributeModel).toBe(true);
    expect(attribute.regexpvalidationmessage).toBe(null);
    expect(attribute.postfix).toBe("");
    expect(attribute.prefix).toBe("");
    expect(attribute.placeholder).toBe("");

    attribute.placeholder = "This is a placeholder";
    expect(attribute.placeholder).toBe("This is a placeholder");
  });

  it("can be reset to an empty string", () => {
    const attribute = new StringAttributeModel();

    attribute.inputvalue = "Test String";

    expect(attribute.inputvalue).toBe("Test String");

    attribute.reset();

    expect(attribute.inputvalue).toBe("");
    expect(attribute.isValid).toBe(true);
  });

  it("can update", () => {
    const attribute = new StringAttributeModel({});

    attribute.update("bla");

    expect(attribute.readonlyvalue).toBe("bla");
  });

  it("can reset a mandatory attribute", () => {
    const attribute = new StringAttributeModel();

    attribute.mandatory = true;

    attribute.reset();

    expect(attribute.isValid).toBe(true);
  });

  it("can handle postcode attribute constraints", () => {
    const attribute = new StringAttributeModel(
      {},
      {
        regexp: "[1-9]{1}[0-9]{3}[\\s]?[a-zA-Z]{2}",
        layouthint: ["zipcode"],
        mandatory: true
      }
    );

    expect(attribute.constraintCollection.length).toBe(2);

    expect(attribute.matchesRegExp("AAAA AB")).toBe(false);
    expect(attribute.matchesRegExp("1234 AB")).toBe(true);
    expect(attribute.matchesRegExp("1234AB")).toBe(true);
  });

  it("can handle email attribute constraints", () => {
    const attribute = new StringAttributeModel(
      {},
      {
        regexp:
          "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$",
        layouthint: ["email"],
        mandatory: true
      }
    );

    expect(attribute.constraintCollection.length).toBe(2);

    expect(attribute.matchesRegExp("invalid_email")).toBe(false);
    expect(attribute.matchesRegExp("first.last@example.com")).toBe(true);
    expect(attribute.matchesRegExp("CAPITALS_lower@domain.COM")).toBe(true);
  });

  it("can handle custom regex constraints", () => {
    const attribute = new StringAttributeModel(
      {},
      {
        regexp: "^#?([a-f0-9]{6}|[a-f0-9]{3})$",
        mandatory: true
      }
    );

    expect(attribute.constraintCollection.length).toBe(2);

    expect(attribute.matchesRegExp("not_hex")).toBe(false);
    expect(attribute.matchesRegExp("#a3c456")).toBe(true);
  });
});
