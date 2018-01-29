import AttributeModel from "beinformed/models/attributes/AttributeModel";

import Href from "beinformed/models/href/Href";
import ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
import ContentModel from "beinformed/models/content/ContentModel";

import CompositeAttributeContribution from "./_TreeFormAttributeContribution.json";
import CompositeAttributeData from "./_TreeFormAttributeData.json";

describe("AttributeModel", () => {
  it("should be able to create an empty AttributeModel object", () => {
    const attribute = new AttributeModel();

    expect(attribute instanceof AttributeModel).toBeTruthy();
    expect(attribute.getInitialChildModelLinks().length).toBe(0);

    expect(attribute.key).toBeUndefined();
    expect(attribute.label).toBe("");
    expect(attribute.value).toBe(null);
    expect(attribute.readonlyvalue).toBe("");
    expect(attribute.type).toBeUndefined();
    expect(attribute.layouthint.all).toEqual([]);
    expect(attribute.format).toBe(null);
    expect(attribute.links.size).toBe(0);
    expect(attribute.downloadLink).toBe(null);
    expect(attribute.readonly).toBe(false);
    expect(attribute.readonly).toBe(false);
    expect(attribute.formatLabel).toBe("");
    expect(attribute.assistantMessage).toBe(null);

    attribute.setChildModels([]);
    expect(attribute.concept).toBe(null);
  });

  it("should create Attribute from typical modular UI response", () => {
    const attributeJSON = {
      key: "ISBN10",
      value: "1234567890"
    };
    const attributeContribution = {
      label: "ISBN10",
      type: "string"
    };

    const attribute = new AttributeModel(attributeJSON, attributeContribution);

    expect(attribute instanceof AttributeModel).toBeTruthy();
    expect(attribute.key).toBe("ISBN10");
    expect(attribute.name).toBe("ISBN10");
    expect(attribute.label).toBe("ISBN10");
    expect(attribute.value).toBe("1234567890");
    expect(attribute.readonlyvalue).toBe("1234567890");
    expect(attribute.type).toBe("string");
    expect(attribute.layouthint.all).toEqual([]);
    expect(attribute.format).toBe(null);

    expect(attribute.conceptLink).toBe(null);

    // check abstract methods to throw
    expect(() => {
      attribute.reset();
    }).toThrow();
    expect(() => {
      attribute.update();
    }).toThrow();
  });

  it("Can set and get label", () => {
    const attribute = new AttributeModel();

    attribute.label = "Dummy label";

    expect(attribute.label).toBe("Dummy label");
  });

  it("can set and get inputvalues", () => {
    const attribute = new AttributeModel();

    attribute.inputvalue = "Test value";

    expect(attribute.inputvalue).toBe("Test value");
  });

  it("Attribute with server error message", () => {
    const attribute = new AttributeModel({
      message: {
        id: "Error.Mandatory",
        parameters: {}
      }
    });

    expect(attribute.errorCollection.all.length).toBe(1);
  });

  it("can be aligned using layouthints", () => {
    const attribute = new AttributeModel({});

    expect(attribute.alignment).toBe("left");

    attribute.layouthint.add("align-center");
    expect(attribute.alignment).toBe("center");

    attribute.layouthint.collection = [];
    attribute.layouthint.add("align-right");
    expect(attribute.alignment).toBe("right");
  });

  it("can have a download link", () => {
    const attribute = new AttributeModel({
      key: "documentFile",
      _links: {
        download: [
          {
            href: "/download",
            name: "documentFile"
          }
        ]
      }
    });

    expect(attribute.downloadLink.key).toBe("documentFile");
    expect(attribute.downloadLink.href).toEqual(new Href("/download"));
    expect(attribute.hasDownloadLink()).toBe(true);
  });

  it("Checks constraints", () => {
    const attribute = new AttributeModel({});

    expect(attribute.constraintCollection.length).toBe(0);

    expect(() => {
      attribute.isNotEmptyString();
    }).toThrow();

    expect(() => {
      attribute.isExactLength();
    }).toThrow();
    expect(() => {
      attribute.isExactLength("");
    }).toThrow();

    expect(() => {
      attribute.isBetween();
    }).toThrow();
    expect(() => {
      attribute.isBetween("");
    }).toThrow();

    expect(() => {
      attribute.isLongEnough();
    }).toThrow();
    expect(() => {
      attribute.isLongEnough("");
    }).toThrow();

    expect(() => {
      attribute.isSmallEnough();
    }).toThrow();
    expect(() => {
      attribute.isSmallEnough("");
    }).toThrow();

    expect(attribute.isNotEmptyString("")).toBe(false);
    expect(attribute.isNotEmptyString("bla")).toBe(true);

    let attributesWithConstraints = new AttributeModel(
      {},
      {
        minLength: 5,
        maxLength: 7
      }
    );

    expect(attributesWithConstraints.isExactLength("123456")).toBe(false);
    expect(attributesWithConstraints.isExactLength("12345")).toBe(true);

    expect(attributesWithConstraints.isBetween("1234")).toBe(false);
    expect(attributesWithConstraints.isBetween("12345")).toBe(true);
    expect(attributesWithConstraints.isBetween("1234567")).toBe(true);
    expect(attributesWithConstraints.isBetween("12345678")).toBe(false);
    expect(attributesWithConstraints.isBetween("123456")).toBe(true);

    expect(attributesWithConstraints.isLongEnough("1234")).toBe(false);
    expect(attributesWithConstraints.isLongEnough("12345")).toBe(true);
    expect(attributesWithConstraints.isLongEnough("123456")).toBe(true);

    expect(attributesWithConstraints.isSmallEnough("123456")).toBe(true);
    expect(attributesWithConstraints.isSmallEnough("1234567")).toBe(true);
    expect(attributesWithConstraints.isSmallEnough("12345678")).toBe(false);

    attributesWithConstraints = new AttributeModel(
      {},
      {
        mandatory: true
      }
    );

    expect(attributesWithConstraints.constraintCollection.length).toBe(1);
    expect(attributesWithConstraints.constraintCollection.all[0].id).toBe(
      "Constraint.Mandatory"
    );

    attributesWithConstraints = new AttributeModel(
      {},
      {
        minLength: 5,
        maxLength: 5
      }
    );

    expect(attributesWithConstraints.constraintCollection.length).toBe(1);
    expect(attributesWithConstraints.constraintCollection.all[0].id).toBe(
      "Constraint.InvalidLengthExact"
    );

    attributesWithConstraints = new AttributeModel(
      {},
      {
        minLength: 5
      }
    );

    expect(attributesWithConstraints.constraintCollection.length).toBe(1);
    expect(attributesWithConstraints.constraintCollection.all[0].id).toBe(
      "Constraint.InvalidLengthTooShort"
    );

    attributesWithConstraints = new AttributeModel(
      {},
      {
        maxLength: 7
      }
    );

    expect(attributesWithConstraints.constraintCollection.length).toBe(1);
    expect(attributesWithConstraints.constraintCollection.all[0].id).toBe(
      "Constraint.InvalidLengthTooLong"
    );

    attributesWithConstraints = new AttributeModel(
      {},
      {
        minLength: 5,
        maxLength: 7
      }
    );

    expect(attributesWithConstraints.constraintCollection.length).toBe(1);
    expect(attributesWithConstraints.constraintCollection.all[0].id).toBe(
      "Constraint.InvalidLengthBetween"
    );
  });

  it("Returns error information", () => {
    const attribute = new AttributeModel(
      {},
      {
        minLength: 5,
        maxLength: 7
      }
    );

    expect(attribute.inError()).toBe(false);

    attribute.addMissingError();
    expect(attribute.inError()).toBe(false);

    attribute.resetErrors();
    attribute.addServerError("Constraint.InvalidLengthTooLong", {
      "min-value": 5
    });

    expect(attribute.inError()).toBe(false);

    attribute.updateLastModification();

    let isValid = attribute.validate("1234");
    expect(isValid).toBe(false);
    expect(attribute.inError()).toBe(true);

    attribute.updateLastModification();
    isValid = attribute.validate("12345");
    expect(isValid).toBe(true);
    expect(attribute.inError()).toBe(false);
  });

  it("Set changed since", () => {
    const attribute = new AttributeModel({});
    attribute.updateLastModification();
    expect(attribute.isChangedSince(0)).toBe(true);
  });

  it("Can set and get editable property", () => {
    const attribute = new AttributeModel({});

    expect(attribute.isEditable).toBe(false);

    attribute.isEditable = true;
    expect(attribute.isEditable).toBe(true);
  });

  it("Can indicate if it is a dependent question", () => {
    const attribute = new AttributeModel(
      {},
      {
        layouthint: ["show when dependent-control:BLA equals [AA|BB]"]
      }
    );

    expect(attribute.isDependentAttribute).toBe(true);
  });

  it("Can handle concept and content links", () => {
    const attribute = new AttributeModel(
      {
        _links: {
          self: {
            href: "/concept"
          }
        },
        referenceDate: "2010-09-10"
      },
      {
        _links: {
          concept: {
            href:
              "/concepts/Incident/Business design/Process elementen/Eerste contact.bixml/UitslagBlaastestType"
          }
        }
      }
    );

    expect(attribute.getInitialChildModelLinks().length).toBe(1);

    expect(attribute.conceptLink.href.path).toEqual(
      "/concepts/Incident/Business design/Process elementen/Eerste contact.bixml/UitslagBlaastestType"
    );

    expect(attribute.referenceDate).toBe("2010-09-10");

    attribute.referenceDate = "2010-10-10";
    expect(attribute.referenceDate).toBe("2010-10-10");

    expect(attribute.conceptLink.href.getParameter("entryDate").value).toBe(
      "2010-10-10"
    );
  });

  it("Can handle concept (child)models", () => {
    const attribute = new AttributeModel(
      {
        _links: {
          self: {
            href: "/concept"
          }
        },
        referenceDate: "2016-01-01"
      },
      {
        _links: {
          concept: {
            href:
              "/concepts/Incident/Business design/Process elementen/Eerste contact.bixml/UitslagBlaastestType"
          }
        }
      }
    );

    const concept = new ConceptDetailModel({
      data: {
        _links: {
          self: {
            href:
              "/concepts/Incident/Business design/Process elementen/Eerste contact.bixml/UitslagBlaastestType"
          }
        },
        filter: {
          entryDate: {
            param: "entryDate",
            name: "entryDate",
            value: "2016-01-01"
          }
        }
      },
      contributions: {
        _links: {},
        filter: [
          {
            entryDate: {
              type: "datefilter",
              label: "Entry date",
              layouthint: [],
              format: "dd-MM-yyyy"
            }
          }
        ]
      }
    });

    attribute.setChildModels([concept]);

    expect(attribute.concept instanceof ConceptDetailModel).toBe(true);
    expect(attribute.concept.type).toBe("ConceptDetail");
  });

  it("Can handle content models", () => {
    const attribute = new AttributeModel({});

    expect(attribute.content).toEqual(new Map());

    expect(() => {
      attribute.addContent("contentType", "bla");
    }).toThrow();

    attribute.addContent("contentType", new ContentModel({}));
    expect(attribute.content.get("contentType")).toEqual(new ContentModel({}));
  });

  // it("Can handle composite attributes", () => {
  //   const attribute = new AttributeModel(CompositeAttributeData, CompositeAttributeContribution);
  //
  //   expect(attribute.hasChildren()).toBe(false);
  //   expect(attribute.children).toEqual(["Snelheid", "GordelDragen", "Drank"]);
  // })
});
