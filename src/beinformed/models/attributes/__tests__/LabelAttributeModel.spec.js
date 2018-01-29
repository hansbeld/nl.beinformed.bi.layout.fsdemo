import LabelAttributeModel from "beinformed/models/attributes/LabelAttributeModel";

describe("LabelAttributeModel", () => {
  it("should be able to create an empty LabelAttribute object", () => {
    const attribute = new LabelAttributeModel();

    expect(attribute instanceof LabelAttributeModel).toBe(true);
    expect(attribute.type).toBe("label");
  });
});
