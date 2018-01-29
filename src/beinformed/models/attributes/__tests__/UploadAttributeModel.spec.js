import UploadAttributeModel from "beinformed/models/attributes/UploadAttributeModel";

describe("UploadAttributeModel", () => {
  it("should be able to create an empty UploadAttributeModel object", () => {
    const attribute = new UploadAttributeModel({});

    expect(attribute instanceof UploadAttributeModel).toBe(true);
    expect(attribute.type).toBe("upload");
    expect(attribute.multiple).toBe(false);
    expect(attribute.constraintCollection.length).toBe(0);
  });

  it("Can have upload constraints", () => {
    const attribute = new UploadAttributeModel(
      {},
      {
        allowedMimeTypes: ["image/jpeg", "image/png"],
        allowedExtensions: ["jpg", "jpeg", "png"],
        uploadMaxFileSize: 10000
      }
    );

    expect(attribute.constraintCollection.length).toBe(2);

    expect(attribute.constraintCollection.all[0].id).toBe(
      "Constraint.File.InvalidExtension"
    );
    expect(attribute.constraintCollection.all[1].id).toBe(
      "Constraint.File.maxFilesize"
    );
  });
});
