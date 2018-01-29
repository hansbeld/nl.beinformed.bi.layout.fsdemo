import HelptextAttributeModel from "beinformed/models/attributes/HelptextAttributeModel";

describe("HelptextAttributeModel", () => {
  it("should be able to create an empty HelptextAttribute object", () => {
    const attribute = new HelptextAttributeModel();

    expect(attribute instanceof HelptextAttributeModel).toBe(true);
    expect(attribute.type).toBe("helptext");
    expect(attribute.text).toBe(null);

    const attributeWithText = new HelptextAttributeModel(
      {},
      { text: "Example helptext text" }
    );

    expect(attributeWithText.text).toBe("Example helptext text");
  });
});
