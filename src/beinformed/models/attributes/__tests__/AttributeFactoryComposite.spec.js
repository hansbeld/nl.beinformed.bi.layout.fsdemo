import AttributeFactory from "beinformed/models/attributes/AttributeFactory";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";
import PasswordAttributeModel from "beinformed/models/attributes/PasswordAttributeModel";
import DateAttributeModel from "beinformed/models/attributes/DateAttributeModel";

describe("AttributeFactoryComposite", () => {
  it("should be able to create a composite attribute from a simple JSON structure", () => {
    const composite = AttributeFactory.createAttribute(
      null,
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

  it("should be able to create a composite attribute from a form JSON structure", () => {
    const composite = AttributeFactory.createAttribute(
      null,
      "BookRelationWithPublisher",
      [
        {
          elementid: "BookRelationWithPublisher",
          elements: [
            {
              elementid: "BookDateFromA",
              suggestion: "2020-01-01T12:00:00.000"
            },
            {
              elementid: "BookDateTo"
            }
          ]
        }
      ],
      {
        type: "range",
        label: "Book relation with publisher",
        mandatory: true,
        children: [
          {
            BookDateFromA: {
              type: "date",
              label: "Date from",
              mandatory: true,
              formatlabel: "dd-mm-jjjj",
              format: "dd-MM-yyyy"
            }
          },
          {
            BookDateTo: {
              type: "date",
              label: "Date to",
              mandatory: false,
              formatlabel: "dd-mm-jjjj",
              format: "dd-MM-yyyy"
            }
          }
        ]
      }
    );

    expect(composite.children.length).toBe(2);
    expect(composite.children.first.value).toBe("2020-01-01T12:00:00.000");
    expect(composite.children.last.value).toBe(null);
  });

  it("should be able to create a composite attribute from a list JSON structure", () => {
    const composite = AttributeFactory.createAttribute(
      null,
      "DateRange",
      {
        DateRange: {
          StartDate: "2020-01-01T12:00:00.000",
          EndDate: "2020-01-01T13:00:00.000"
        }
      },
      {
        type: "range",
        label: "Time",
        readonly: true,
        children: [
          {
            StartDate: {
              type: "datetime",
              label: "Start",
              readonly: true,
              format: "dd-MM-yyyy HH:mm",
              placeholder: "dd-mm-yyyy hh:mm"
            }
          },
          {
            EndDate: {
              type: "datetime",
              label: "End",
              readonly: true,
              format: "dd-MM-yyyy HH:mm",
              placeholder: "dd-mm-yyyy hh:mm"
            }
          }
        ]
      }
    );

    expect(composite.children.length).toBe(2);
    expect(composite.children.first.value).toBe("2020-01-01T12:00:00.000");
    expect(composite.children.last.value).toBe("2020-01-01T13:00:00.000");
  });
});
