import AttributeFactory from "beinformed/models/attributes/AttributeFactory";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";
import PasswordAttributeModel from "beinformed/models/attributes/PasswordAttributeModel";
import DateAttributeModel from "beinformed/models/attributes/DateAttributeModel";

describe("AttributeFactory With Dynamicschema", () => {
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

  it("should be able to create a choice attribute where an other attribute has a dynamicschema", () => {
    const composite = AttributeFactory.createAttribute(
      null,
      "DocumentType",
      {
        Creator: "1",
        DocumentType: "eBook",
        dynamicschema: {
          Creator: [
            {
              code: "1",
              label: "Arnold"
            }
          ]
        }
      },
      {
        type: "string",
        label: "Document type",
        optionMode: "static",
        readonly: true,
        multiplechoice: false,
        layouthint: ["combobox"],
        enumerated: true,
        options: [
          {
            code: "eBook",
            label: "eBook"
          }
        ]
      }
    );

    expect(composite.type).toBe("choice");
    expect(composite.options.length).toBe(1);
  });

  it("should create a choice attribute with dynamischema on a form", () => {
    const choice = AttributeFactory.createAttribute(
      null,
      "Person",
      [
        {
          elementid: "Person",
          dynamicschema: [
            {
              code: "1",
              label: "Stephen King"
            },
            {
              code: "2",
              label: "Douglas Coupland"
            }
          ]
        },
        {
          elementid: "BelowCodemapsAreAllWithLargeOn",
          static: true,
          value: "Below codemaps are all with large on"
        },
        {
          elementid: "FruitStaticSingle",
          _links: {
            lookupservice: {
              href:
                "/lookupOptions?lookupToken=da9fe2ee-a0da-46b7-8e0e-1909fd2d0ce2"
            }
          }
        }
      ],
      {
        type: "string",
        label: "Person",
        mandatory: false,
        optionMode: "dynamicWithThreshold",
        multiplechoice: false,
        layouthint: ["combobox"],
        enumerated: true
      }
    );

    expect(choice.type).toBe("choice");
    expect(choice.options.length).toBe(2);
  });
});
