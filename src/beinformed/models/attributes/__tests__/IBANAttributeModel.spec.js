import IBANAttributeModel from "beinformed/models/attributes/IBANAttributeModel";

describe("IBANAttributeModel", () => {
  it("should be able to create an empty IBANAttribute object", () => {
    const attribute = new IBANAttributeModel();

    expect(attribute instanceof IBANAttributeModel).toBe(true);
  });

  it("has an IBAN constraint", () => {
    const attribute = new IBANAttributeModel({});

    expect(attribute.constraintCollection.length).toBe(1);

    expect(attribute.isIBAN("ongeldigeIBAN")).toBe(false);
    expect(attribute.isIBAN("NL39 RABO 0300 0652 64")).toBe(true);
  });
});
