import RangeFilterModel from "beinformed/models/filters/RangeFilterModel";
import CompositeAttributeModel from "beinformed/models/attributes/CompositeAttributeModel";
import NumberAttributeModel from "beinformed/models/attributes/NumberAttributeModel";

describe("RangeFilterModel", () => {
  it("should be able to create a RangeFilterModel", () => {
    const rangeFilter = new RangeFilterModel(
      {
        name: "NumberOfPages",
        startNumber: {
          param: "NumberOfPages",
          value: "12"
        },
        endNumber: {
          param: "endNumberOfPages"
        }
      },
      {
        type: "numberrangefilter",
        label: "Number of pages",
        layouthint: ["slider"],
        children: [
          {
            startNumber: {
              label: "is groter dan",
              name: "NumberOfPages",
              layouthint: [],
              format: "0",
              minimum: 1
            }
          },
          {
            endNumber: {
              label: "is kleiner",
              name: "endNumberOfPages",
              layouthint: [],
              format: "0",
              maximum: 1000
            }
          }
        ]
      }
    );

    expect(rangeFilter instanceof RangeFilterModel).toBe(true);

    expect(rangeFilter.attribute instanceof CompositeAttributeModel).toBe(true);

    expect(rangeFilter.attribute.start instanceof NumberAttributeModel).toBe(
      true
    );
    expect(rangeFilter.attribute.end instanceof NumberAttributeModel).toBe(
      true
    );

    expect(rangeFilter.attribute.start.value).toBe(12);
    expect(rangeFilter.attribute.end.value).toBe(null);
  });
});
