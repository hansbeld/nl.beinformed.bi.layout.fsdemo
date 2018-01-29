import LookupAttributeModel from "beinformed/models/attributes/LookupAttributeModel";

describe("LookupAttributeModel", () => {
  it("should be able to create an instance of LookupAttributeModel", () => {
    const lookupAttribute = new LookupAttributeModel();

    expect(lookupAttribute instanceof LookupAttributeModel).toBe(true);

    expect(lookupAttribute.type).toBe("lookup");
  });

  it("has a lookupLink", () => {
    const lookupAttribute = new LookupAttributeModel({
      _links: {
        lookupservice: {
          href:
            "/lookupOptions?lookupToken=41e23fd5-9a4c-41de-9c19-0ec0d9b3c643"
        }
      }
    });

    expect(lookupAttribute.lookupLink.href.path).toBe("/lookupOptions");

    lookupAttribute.addOption({
      code: "optionA",
      label: "Option A",
      selected: true
    });

    expect(lookupAttribute.options.length).toBe(1);
    expect(lookupAttribute.options.all[0].selected).toBe(true);

    lookupAttribute.addOption({
      code: "optionA"
    });
    expect(lookupAttribute.options.length).toBe(1);

    lookupAttribute.update("optionB");

    expect(lookupAttribute.options.length).toBe(2);
    expect(lookupAttribute.options.all[1].selected).toBe(true);

    lookupAttribute.update("optionB");
    expect(lookupAttribute.options.all[1].selected).toBe(false);
  });
});
