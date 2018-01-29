import RangeFilterModel from "beinformed/models/filters/RangeFilterModel";

import CompositeAttributeModel from "beinformed/models/attributes/CompositeAttributeModel";
import NumberAttributeModel from "beinformed/models/attributes/NumberAttributeModel";

describe.skip("RangeFilterModel", () => {
  let filterData;
  let filterContributions;

  beforeEach(() => {
    filterData = {
      name: "NumberOfPages",
      startNumber: {
        param: "NumberOfPages"
      },
      endNumber: {
        param: "endNumberOfPages"
      }
    };
    filterContributions = {
      name: "NumberOfPages",
      label: "Number of pages",
      type: "numberrangefilter",
      layouthint: ["slider"],
      startNumber: {
        label: "is groter dan",
        name: "NumberOfPages",
        layouthint: [],
        format: "0",
        minimum: 1
      },
      endNumber: {
        label: "is kleiner",
        name: "endNumberOfPages",
        layouthint: [],
        format: "0",
        maximum: 1000
      }
    };
  });

  it("should be able to create a RangeFilterModel", () => {
    const rangeFilter = new RangeFilterModel(filterData, filterContributions);

    expect(rangeFilter instanceof RangeFilterModel).toBe(true);

    expect(rangeFilter.attribute.start instanceof NumberAttributeModel).toBe(
      true
    );
    expect(rangeFilter.attribute.end instanceof NumberAttributeModel).toBe(
      true
    );
  });
});
