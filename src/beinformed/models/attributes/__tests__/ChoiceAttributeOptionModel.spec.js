import ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";
import ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
import ContentModel from "beinformed/models/content/ContentModel";

describe("ChoiceAttributeOptionModel", () => {
  it("should be able to create an empty ChoiceAttributeOptionModel", () => {
    const option = new ChoiceAttributeOptionModel();

    expect(option instanceof ChoiceAttributeOptionModel);
    expect(option.getInitialChildModelLinks().length).toBe(0);
    expect(option.label).toBe("");
    expect(option.code).toBe("");
    expect(option.count).toBe(null);
    expect(option.concept).toBe(null);
    expect(option.isBooleanType).toBe(false);
    expect(option.level).toBe(0);

    option.level = 1;
    expect(option.level).toBe(1);
  });

  it("Can create a ChoiceAttributeOptionModel with standard json", () => {
    const option = new ChoiceAttributeOptionModel(
      {
        label: "Hardcover2",
        code: "Hardcover2",
        selected: false,
        _links: {
          concept: {
            href:
              "/concepts/Incident/Business design/Process elementen/Eerste contact.bixml/UitslagBlaastestType"
          }
        },
        children: [
          {
            label: "Child1",
            code: "Child1",
            selected: false
          }
        ]
      },
      "2016-01-01"
    );

    expect(option.getInitialChildModelLinks().length).toBe(1);

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

    option.setChildModels([concept]);

    expect(option.concept instanceof ConceptDetailModel).toBe(true);
    expect(option.concept.type).toBe("ConceptDetail");
  });

  it("Can handle content models", () => {
    const attribute = new ChoiceAttributeOptionModel({});

    expect(attribute.content).toEqual(new Map());

    expect(() => {
      attribute.addContent("contentType", "bla");
    }).toThrow();

    attribute.addContent("contentType", new ContentModel({}));
    expect(attribute.content.get("contentType")).toEqual(new ContentModel({}));
  });
});
