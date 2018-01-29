import XMLAttributeModel from "beinformed/models/attributes/XMLAttributeModel";

describe("XMLAttributeModel", () => {
  it("should be able to create an empty XMLAttributeModel object", () => {
    const attribute = new XMLAttributeModel();

    expect(attribute instanceof XMLAttributeModel).toBe(true);

    expect(attribute.type).toBe("xml");
    expect(attribute.rows).toBe(10);

    expect(attribute.isValidXML("<invalid>text<invalid>")).toBe(false);
    expect(attribute.isValidXML("<valid>text</valid>")).toBe(true);
    expect(attribute.isValidXML("{ isJson: true }")).toBe(false);
    expect(attribute.isValidXML()).toBe(false);

    expect(attribute.constraintCollection.length).toBe(1);
  });
});
