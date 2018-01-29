import normalizeChoiceAttributeOptionsJSON from "beinformed/models/attributes/normalizeChoiceAttributeOptionsJSON";

describe("normalizeChoiceAttributeOptionsJSON", () => {
  it("should return empty array when no data and contributions are provided", () => {
    const output = normalizeChoiceAttributeOptionsJSON();

    expect(output.length).toBe(0);
  });

  it("can handle options from contributions", () => {
    const data = {
      suggestion: ["BureauApeldoornAdemAnalyse"],
      key: "LocatieAdemanalyse",
      value: ["BureauApeldoornAdemAnalyse"],
      _links: {}
    };
    const contributions = {
      type: "string",
      label: "Locatie ademanalyse",
      mandatory: false,
      optionMode: "static",
      multiplechoice: false,
      layouthint: ["combobox"],
      enumerated: true,
      options: [
        {
          code: "BureauApeldoornAdemAnalyse",
          label: "Bureau apeldoornAdem analyse",
          _links: {
            concept: {
              href:
                "/concepts/Incident/Business design/Process elementen/Ademanalyse.bixml/BureauApeldoornAdemAnalyse"
            }
          }
        },
        {
          code: "BureauUtrechtAdemAnalyse",
          label: "Bureau Utrecht adem analyse",
          _links: {
            concept: {
              href:
                "/concepts/Incident/Business design/Process elementen/Ademanalyse.bixml/BureauUtrechtAdemAnalyse"
            }
          }
        },
        {
          code: "ZiekenhuisUtrechtAdemAnalyse",
          label: "Ziekenhuis Utrecht adem analyse",
          _links: {
            concept: {
              href:
                "/concepts/Incident/Business design/Process elementen/Ademanalyse.bixml/ZiekenhuisUtrechtAdemAnalyse"
            }
          }
        }
      ]
    };

    const choiceAttributeOptions = normalizeChoiceAttributeOptionsJSON(
      data,
      contributions
    );
    expect(choiceAttributeOptions.length).toBe(3);
    expect(choiceAttributeOptions[1].code).toBe("BureauUtrechtAdemAnalyse");
    expect(choiceAttributeOptions[1].label).toBe("Bureau Utrecht adem analyse");
    expect(choiceAttributeOptions[1].selected).toBe(false);
    expect(choiceAttributeOptions[0].selected).toBe(true);
  });

  it("can handle options from filter contributions", () => {
    const data = {
      name: "CHECKBOX",
      param: "CHECKBOX"
    };
    const contributions = {
      name: "CHECKBOX",
      type: "choicefilter",
      label: "Checkboxfilter",
      layouthint: ["checkbox"],
      multiplechoice: true,
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

    const choiceAttributeOptions = normalizeChoiceAttributeOptionsJSON(
      data,
      contributions
    );
    expect(choiceAttributeOptions.length).toBe(4);
    expect(choiceAttributeOptions[3].code).toBe("Audio");
    expect(choiceAttributeOptions[3].label).toBe("Audio book");
  });

  it("can handle options from dynamicschema", () => {
    const data = {
      elementid: "noteType",
      suggestion: ["Comment"],
      dynamicschema: [
        {
          code: "Comment",
          label: "Comment"
        },
        {
          code: "SecondComment",
          label: "Second Comment"
        }
      ]
    };
    const contributions = {
      label: "Notitie type",
      type: "string",
      mandatory: true,
      multiplechoice: false,
      layouthint: ["combobox"],
      options: []
    };

    const choiceAttributeOptions = normalizeChoiceAttributeOptionsJSON(
      data,
      contributions
    );
    expect(choiceAttributeOptions.length).toBe(2);
    expect(choiceAttributeOptions[0].code).toBe("Comment");
    expect(choiceAttributeOptions[0].label).toBe("Comment");
  });
});
