import AttributeFactory from "beinformed/models/attributes/AttributeFactory";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";
import PasswordAttributeModel from "beinformed/models/attributes/PasswordAttributeModel";
import DateAttributeModel from "beinformed/models/attributes/DateAttributeModel";

describe("AttributeFactory", () => {
  it("should be able to create a string attribute from a simple JSON structure", () => {
    const stringAttribute = AttributeFactory.createAttribute(
      "string",
      "string",
      {
        name: "string"
      },
      {
        type: "string"
      }
    );

    expect(stringAttribute instanceof StringAttributeModel).toBe(true);
    expect(stringAttribute.value).toBe(null);
    expect(stringAttribute.name).toBe("string");

    stringAttribute.inputvalue = "test string";

    expect(stringAttribute.value).toBe("test string");
  });

  it("should be able to create a string attribute with value from a simple JSON structure", () => {
    const stringAttribute = AttributeFactory.createAttribute(
      "string",
      "string",
      {
        name: "string",
        value: "test string"
      },
      {
        type: "string"
      }
    );

    expect(stringAttribute.value).toBe("test string");
  });

  it("should be able to create a number attribute with value from a simple JSON structure", () => {
    const numberAttribute = AttributeFactory.createAttribute(
      "number",
      "number",
      {
        name: "number",
        value: 0
      },
      {
        type: "number"
      }
    );

    expect(numberAttribute.value).toBe(0);
  });

  it("should be able to create a choice attribute with treshold from a standard JSON structure", () => {
    const choiceAttribute = AttributeFactory.createAttribute(
      "choice",
      "choice",
      {
        name: "choice"
      },
      {
        type: "string",
        optionMode: "dynamicWithThreshold",
        multiplechoice: false,
        layouthint: ["combobox"],
        enumerated: true
      }
    );

    expect(choiceAttribute.value).toBe(null);
  });

  it("should be able to create a password attribute from a simple JSON structure", () => {
    const passwordAttribute = AttributeFactory.createAttribute(
      "password",
      "password",
      {
        name: "password",
        value: "test password"
      },
      {
        type: "password",
        label: "Password attribute"
      }
    );

    expect(passwordAttribute instanceof PasswordAttributeModel).toBe(true);
  });

  it("should be able to create a date attribute from a simple JSON structure", () => {
    const dateAttribute = AttributeFactory.createAttribute(
      "date",
      "date",
      {
        name: "date",
        value: "2018-11-29"
      },
      {
        type: "date",
        label: "Date attribute",
        format: "DD-MM-YYYY"
      }
    );

    expect(dateAttribute instanceof DateAttributeModel).toBe(true);
    expect(dateAttribute.inputvalue).toBe("29-11-2018");
    expect(dateAttribute.value).toBe("2018-11-29");
  });

  it("should be able to create a composite attribute from a simple JSON structure", () => {
    const composite = AttributeFactory.createAttribute(
      "composite",
      "composite",
      {
        ControleDBC: ["OperatieMammatumorPassend"],
        DiagnoseBehandelCombinatie: "n020107057",
        GeenVereisten: true
      },
      {
        type: "composite",
        label: "results",
        children: [
          {
            ControleDBC: {
              type: "string",
              label: "Controle DBC",
              optionMode: "static",
              falseAllowed: true,
              multiplechoice: true,
              _links: {
                concept: {
                  href:
                    "/concepts/DBC controle/Business design/DBC controle.bixml/ControleDBC"
                }
              },
              layouthint: ["checkbox"],
              enumerated: true,
              options: [
                {
                  code: "OperatieMammatumorPassend",
                  label: "Hersteloperatie van borst met prothese passend",
                  _links: {
                    concept: {
                      href:
                        "/concepts/DBC controle/Business design/Hersteloperatie van borst/Controle hersteloperatie van borst met prothese.bixml/HersteloperatieVanBorstMetProthesePassend"
                    }
                  }
                }
              ]
            }
          },
          {
            GeenVereisten: {
              type: "boolean",
              label: "Geen vereisten",
              _links: {
                concept: {
                  href:
                    "/concepts/Zorgactiviteiten/Business design/Zorgactiviteiten.bixml/GeenVereisten"
                }
              },
              layouthint: ["radiobutton"]
            }
          }
        ]
      }
    );

    expect(composite.children.all[0].value).toBe("OperatieMammatumorPassend");
  });

  it("should be able to create a choice attribute with dynamicschema inside a composite", () => {
    const composite = AttributeFactory.createAttribute(
      null,
      "results",
      {
        dynamicschema: {
          "results.PeriodOfInterestRate": [
            {
              code: "n2YearsRepaymentMortgage",
              label: "2 years"
            },
            {
              code: "n3YearsRepaymentMortgage",
              label: "3 years"
            }
          ]
        },
        results: {
          PeriodOfInterestRate: "n5YearsRepaymentMortgage"
        }
      },
      {
        type: "composite",
        label: "results",
        children: [
          {
            PeriodOfInterestRate: {
              type: "string",
              label: "Period of interest rate",
              optionMode: "dynamic",
              falseAllowed: true,
              multiplechoice: false,
              layouthint: ["combobox"],
              dynamicschemaId: "results.PeriodOfInterestRate",
              enumerated: true
            }
          }
        ]
      }
    );

    expect(composite.type).toBe("composite");
    expect(composite.children.length).toBe(1);

    const periodOfInterest = composite.children.first;
    expect(periodOfInterest.type).toBe("choice");
    expect(periodOfInterest.key).toBe("PeriodOfInterestRate");
    expect(periodOfInterest.options.length).toBe(2);
  });
});
