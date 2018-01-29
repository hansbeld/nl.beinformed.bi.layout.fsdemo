import BSNAttributeModel from "beinformed/models/attributes/BSNAttributeModel";

describe("BSNAttributeModel", () => {
  it("should be able to create an empty BSNAttributeModel object", () => {
    const attribute = new BSNAttributeModel();

    expect(attribute instanceof BSNAttributeModel).toBe(true);

    attribute.inputvalue = "123";
    expect(attribute.isValid).toBe(false);

    attribute.inputvalue = "177813702";
    expect(attribute.isValid).toBe(true);

    attribute.inputvalue = "123456789";
    expect(attribute.isValid).toBe(false);
  });
});
