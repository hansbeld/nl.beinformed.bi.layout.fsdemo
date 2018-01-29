// eslint-disable no-magic-numbers
import ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";

import ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
import ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";
/**
 * Most of the input data for attributes comes via the normalizeAttributeJSON, so have a different format then the JSON message has.
 */
describe("ChoiceAttributeModel", () => {
  it("should be able to create an empty AttributeModel object", () => {
    const attribute = new ChoiceAttributeModel();

    expect(attribute instanceof ChoiceAttributeModel).toBeTruthy();
    expect(attribute.key).toBeUndefined();
    expect(attribute.label).toBe("");
    expect(attribute.value).toBe(null);
    expect(attribute.type).toBe("choice");
    expect(attribute.layouthint.all).toEqual([]);
    expect(attribute.format).toBe(null);
    expect(attribute.options.length).toBe(0);
    expect(attribute.choicetype).toBe("checkbox");
    expect(attribute.isDependentControl).toBe(false);
    expect(attribute.placeholder).toBe("");
    expect(attribute.getInitialChildModelLinks().length).toBe(0);
  });

  it("can create a readonly choice attribute from a case property", () => {
    const data = {
      key: "Format",
      value: "Paperback"
    };

    const contributions = {
      label: "Format",
      type: "string",
      multiplechoice: false,
      layouthint: ["combobox"],
      enumerated: true,
      options: [
        {
          code: "Hardcover",
          label: "Hardcover"
        },
        {
          code: "Paperback",
          label: "Paperback"
        },
        {
          code: "Ebook",
          label: "Ebook"
        },
        {
          code: "Audio",
          label: "Audio book"
        }
      ]
    };

    const attribute = new ChoiceAttributeModel(data, contributions);

    expect(attribute.options.length).toBe(4);
  });

  it("should create a choice attribute for a boolean type", () => {
    const data = {
      key: "StageCondition"
    };

    const contributions = {
      label: "Stage condition",
      type: "boolean",
      mandatory: false,
      multiplechoice: false,
      layouthint: ["radiobutton"]
    };

    const attribute = new ChoiceAttributeModel(data, contributions);

    expect(attribute.options.length).toBe(2);
  });

  it("should create choice Attribute from typical modular UI response", () => {
    const data = {
      key: "Format",
      value: ["Paperback"]
    };

    const contributions = {
      label: "Format",
      type: "string",
      layouthint: ["combobox"],
      enumerated: true,
      options: [
        {
          code: "Hardcover",
          label: "Hardcover"
        },
        {
          code: "Paperback",
          label: "Paperback"
        },
        {
          code: "Ebook",
          label: "Ebook"
        },
        {
          code: "Audio",
          label: "Audio book"
        }
      ]
    };

    const attribute = new ChoiceAttributeModel(data, contributions);

    expect(attribute instanceof ChoiceAttributeModel).toBeTruthy();
    expect(attribute.key).toBe("Format");
    expect(attribute.label).toBe("Format");
    expect(attribute.value).toBe("Paperback");
    expect(attribute.type).toBe("choice");
    expect(attribute.layouthint.all).toEqual(["combobox"]);
    expect(attribute.choicetype).toBe("combobox");
    expect(attribute.format).toBe(null);

    expect(attribute.options.length).toBe(4);
  });

  it("should be able to enable and disable options", () => {
    const data = {
      key: "Format"
    };

    const contributions = {
      label: "Format",
      type: "string",
      layouthint: ["combobox"],
      enumerated: true,
      options: [
        {
          code: "Hardcover",
          label: "Hardcover"
        },
        {
          code: "Paperback",
          label: "Paperback"
        },
        {
          code: "Ebook",
          label: "Ebook"
        },
        {
          code: "Audio",
          label: "Audio book"
        }
      ]
    };

    const attribute = new ChoiceAttributeModel(data, contributions);
    expect(attribute.inputvalue).toBe("");

    attribute.enableOption("Hardcover");
    expect(attribute.selected.length).toBe(1);
    expect(attribute.inputvalue).toBe("Hardcover");

    attribute.enableOption("Hardcover");
    expect(attribute.inputvalue).toBe("Hardcover");

    attribute.disableOption("Hardcover");
    expect(attribute.inputvalue).toBe("");

    attribute.toggleOption("Hardcover");
    expect(attribute.inputvalue).toBe("Hardcover");
    attribute.toggleOption("Hardcover");
    expect(attribute.inputvalue).toBe("");

    attribute.update("Hardcover");
    expect(attribute.inputvalue).toBe("Hardcover");

    attribute.reset();
    expect(attribute.inputvalue).toBe("");
  });

  it("should be able to create a checkbox list", () => {
    const data = {
      key: "Format",
      value: ["Paperback"]
    };

    const contributions = {
      label: "Format",
      type: "string",
      layouthint: ["checkbox"],
      multiplechoice: true,
      enumerated: true,
      options: [
        {
          code: "Hardcover",
          label: "Hardcover"
        },
        {
          code: "Paperback",
          label: "Paperback"
        },
        {
          code: "Ebook",
          label: "Ebook"
        },
        {
          code: "Audio",
          label: "Audio book"
        }
      ]
    };

    const attribute = new ChoiceAttributeModel(data, contributions);

    expect(attribute.choicetype).toBe("checkbox");
    expect(attribute.inputvalue).toBe("Paperback");

    attribute.enableOption("Hardcover");
    attribute.enableOption("Paperback");
    attribute.enableOption("Paperback");

    expect(attribute.inputvalue).toBe("Hardcover,Paperback");
  });

  it("can create a choice attribute model with a dynamicschema", () => {
    const data = {
      key: "Person",
      value: ["1"],
      dynamicschema: [
        {
          code: "1",
          label: "Stephen King"
        },
        {
          code: "2",
          label: "Douglas Coupland"
        },
        {
          code: "3",
          label: "A.M. Homes"
        },
        {
          code: "4",
          label: "Nick Hornby"
        },
        {
          code: "5",
          label: "Paul Auster"
        },
        {
          code: "6",
          label: "Zadie Smith"
        },
        {
          code: "7",
          label: "John Grisham"
        },
        {
          code: "8",
          label: "Claire Vaye Watkins"
        },
        {
          code: "9",
          label: "Roald Dahl"
        },
        {
          code: "10",
          label: "Quentin Blake"
        },
        {
          code: "11",
          label: "Graham Roumieu"
        },
        {
          code: "12",
          label: "Shumon Basar"
        },
        {
          code: "13",
          label: "Hans Ulrich Obrist"
        },
        {
          code: "14",
          label: "Richard Yates"
        },
        {
          code: "54",
          label: "Peter Straub"
        }
      ]
    };

    const contributions = {
      label: "Person",
      type: "string",
      mandatory: false,
      multiplechoice: false,
      layouthint: ["combobox"],
      enumerated: true,
      options: []
    };

    const attribute = new ChoiceAttributeModel(data, contributions);

    expect(attribute.options.length).toBe(15);
  });

  it("can create a taxonomy choice attribute", () => {
    const data = {
      key: "TaxonomyNativeCountry",
      value: ["UnitedKingdom"]
    };

    const contributions = {
      label: "Taxonomy Native Country",
      type: "string",
      mandatory: false,
      multiplechoice: false,
      layouthint: ["radiobutton"],
      enumerated: true,
      options: [
        {
          code: "NativeCountry",
          label: "Native country",
          children: [
            {
              code: "Netherlands",
              label: "Netherlands"
            },
            {
              code: "UnitedKingdom",
              label: "United Kingdom"
            },
            {
              code: "Germany",
              label: "Germany"
            },
            {
              code: "Belgium",
              label: "Belgium"
            }
          ]
        }
      ]
    };

    const attribute = new ChoiceAttributeModel(data, contributions);

    expect(attribute.options.length).toBe(1);
    expect(attribute.options.first.children.length).toBe(4);
    expect(attribute.readonlyvalue).toBe("United Kingdom");
    expect(attribute.isTree).toBe(true);
  });

  it("can create a choice attribute from choice filter input", () => {
    const data = {
      param: "Format",
      name: "Format",
      options: [
        {
          key: "Hardcover",
          selected: true,
          count: 11
        },
        {
          key: "Paperback",
          selected: true,
          count: 18
        },
        {
          key: "Ebook",
          count: 1
        },
        {
          key: "Audio",
          count: 2
        }
      ]
    };

    const contributions = {
      name: "Format",
      label: "Format",
      layouthint: ["checkbox"],
      multiplechoice: true,
      enumerated: true,
      options: [
        {
          key: "Hardcover",
          label: "Hardcover"
        },
        {
          key: "Paperback",
          label: "Paperback"
        },
        {
          key: "Ebook",
          label: "Ebook"
        },
        {
          key: "Audio",
          label: "Audio book"
        }
      ]
    };

    const attribute = new ChoiceAttributeModel(data, contributions);

    expect(attribute.options.length).toBe(4);
    expect(attribute.label).toBe("Format");

    expect(attribute.selected.length).toBe(2);
    expect(attribute.readonlyvalue).toBe("Hardcover,Paperback");
  });

  it("Can handle concept links and content", () => {
    const data = {
      _links: {
        concept: {
          href: "/concepts/Link/To/Model.bixml/Format"
        }
      },
      key: "Format",
      value: "Paperback"
    };

    const contributions = {
      label: "Format",
      type: "string",
      multiplechoice: false,
      layouthint: ["combobox"],
      options: [
        {
          code: "Hardcover",
          label: "Hardcover",
          _links: {
            concept: {
              href: "/concepts/Link/To/Model.bixml/Hardcover"
            }
          }
        },
        {
          code: "Paperback",
          label: "Paperback"
        },
        {
          code: "Ebook",
          label: "Ebook"
        },
        {
          code: "Audio",
          label: "Audio book"
        }
      ],
      content: {
        optionElements: [
          {
            labelElement: {
              label: "Label: Long label",
              labelTypes: ["LongLabel"]
            }
          },
          {
            contentElement: {
              label: "Content: Reference",
              sectionReferenceTypes: ["Reference"],
              layouthint: ["inline", "full-width"]
            }
          }
        ]
      }
    };

    const attribute = new ChoiceAttributeModel(data, contributions);

    expect(attribute.getInitialChildModelLinks().length).toBe(2);
    expect(
      attribute.contentConfiguration instanceof ContentConfigurationElements
    ).toBe(true);
    expect(
      attribute.contentConfiguration.getContentElementConfigBySectionReferenceType(
        "Reference"
      )[0].label
    ).toBe("Content: Reference");
  });

  it("Can handle concept (child)models", () => {
    const attribute = new ChoiceAttributeModel(
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

    expect(attribute.contentConfiguration).toBe(null);

    expect(attribute.referenceDate).toBe("2016-01-01");

    attribute.setChildModels([concept]);

    expect(attribute.concept instanceof ConceptDetailModel).toBe(true);
    expect(attribute.concept.type).toBe("ConceptDetail");

    attribute.referenceDate = "2010-10-10";
    expect(attribute.referenceDate).toBe("2010-10-10");

    expect(attribute.conceptLink.href.getParameter("entryDate").value).toBe(
      "2010-10-10"
    );

    attribute.setChildModels([concept]);

    expect(attribute.concept instanceof ConceptDetailModel).toBe(false);
  });
});
