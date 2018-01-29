// jest.mock("ChoiceAttributeOptionModel", jest.fn());

import ChoiceAttributeOptionCollection from "beinformed/models/attributes/ChoiceAttributeOptionCollection";

describe("ChoiceAttributeOptionCollection", () => {
  it("can handle simple options", () => {
    const data = {
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
          label: "E-book"
        },
        {
          code: "Audio",
          label: "Audio"
        }
      ]
    };

    const collection = ChoiceAttributeOptionCollection.create(
      data,
      contributions
    );

    expect(collection.length).toBe(4);
    expect(collection.selected[0].code).toBe("Hardcover");
  });

  it("can handle boolean", () => {
    const data = { key: "StageCondition" };
    const contributions = {
      label: "Stage condition",
      type: "boolean",
      mandatory: false,
      multiplechoice: false,
      layouthint: ["radiobutton"]
    };

    const collection = ChoiceAttributeOptionCollection.create(
      data,
      contributions
    );

    expect(collection.length).toBe(2);
  });

  it("can handle taxonomy options", () => {
    const data = { key: "TaxonomyNativeCountry", value: ["UnitedKingdom"] };
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
            { code: "Netherlands", label: "Netherlands" },
            { code: "UnitedKingdom", label: "United Kingdom" },
            { code: "Germany", label: "Germany" },
            { code: "Belgium", label: "Belgium" }
          ]
        }
      ]
    };

    const collection = ChoiceAttributeOptionCollection.create(
      data,
      contributions
    );

    expect(collection.length).toBe(1);
    expect(collection.all[0].children.all[1].code).toBe("UnitedKingdom");
  });

  it("can handle dynamicschema", () => {
    const data = {
      key: "Person",
      value: ["2"],
      dynamicschema: [
        {
          code: "1",
          label: "Stephen King"
        },
        {
          code: "2",
          label: "Douglas Coupland",
          selected: true
        },
        {
          code: "3",
          label: "A.M. Homes"
        },
        {
          code: "4",
          label: "Nick Hornby"
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

    const collection = ChoiceAttributeOptionCollection.create(
      data,
      contributions
    );

    expect(collection.length).toBe(4);
    expect(collection.selected[0].code).toBe("2");
  });
});
