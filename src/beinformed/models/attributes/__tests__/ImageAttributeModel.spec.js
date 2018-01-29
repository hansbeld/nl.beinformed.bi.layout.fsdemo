import ImageAttributeModel from "beinformed/models/attributes/ImageAttributeModel";

describe("ImageAttributeModel", () => {
  it("should be able to create an empty ImageAttribute object", () => {
    const attribute = new ImageAttributeModel();

    expect(attribute instanceof ImageAttributeModel).toBe(true);
    expect(attribute.type).toBe("image");
  });
});
