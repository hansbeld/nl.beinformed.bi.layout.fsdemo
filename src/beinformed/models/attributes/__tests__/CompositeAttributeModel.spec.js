import CompositeAttributeModel from "beinformed/models/attributes/CompositeAttributeModel";

describe("ChoiceAttributeModel", () => {
  it("creates a composite attribute for old date range attribute", () => {
    const data = {
      key: "DateRange",
      children: [
        {
          key: "BeginDate"
        },
        {
          key: "EndDate"
        }
      ]
    };

    const contributions = {
      label: "Date range",
      type: "range",
      mandatory: false,
      children: [
        {
          BeginDate: {
            label: "Begin",
            type: "date",
            mandatory: true,
            format: "dd-MM-yyyy"
          }
        },
        {
          EndDate: {
            label: "End",
            type: "date",
            mandatory: true,
            format: "dd-MM-yyyy"
          }
        }
      ]
    };

    const attribute = new CompositeAttributeModel(data, contributions);

    expect(attribute.children.length).toBe(2);
    expect(attribute.children.first.name).toBe("BeginDate");
    expect(attribute.children.last.name).toBe("EndDate");
  });

  it("create a composite attribute for a new date range attribute", () => {
    const data = {
      key: "daterange",
      children: [{ key: "start1", value: "2010-01-01" }, { key: "end1" }]
    };
    const contributions = {
      label: "DateRange",
      type: "range",
      mandatory: false,
      children: [
        {
          start1: {
            label: "start1",
            type: "date",
            mandatory: false,
            format: "dd-MM-yyyy"
          }
        },
        {
          end1: {
            label: "end1",
            type: "date",
            mandatory: false,
            format: "dd-MM-yyyy"
          }
        }
      ]
    };

    const attribute = new CompositeAttributeModel(data, contributions);

    expect(attribute.children.length).toBe(2);
    expect(attribute.children.first.name).toBe("start1");
    expect(attribute.children.first.value).toBe("2010-01-01");
    expect(attribute.children.last.name).toBe("end1");
  });
});
