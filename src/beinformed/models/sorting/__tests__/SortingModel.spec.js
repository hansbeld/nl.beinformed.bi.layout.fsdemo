import SortingModel from "beinformed/models/sorting/SortingModel";

import mockList from "./list.json";
import mockListContributions from "./listContributions.json";

describe("SortingModel", () => {
  it("should be able to create an empty sorting instance", () => {
    const sorting = new SortingModel();

    expect(sorting instanceof SortingModel).toBeTruthy();

    expect(sorting.options.length).toEqual(0);
    expect(sorting.name).toBe("sort");
    expect(sorting.value).toEqual([]);
  });

  it("can consume a typical modular UI json sorting structure", () => {
    const sorting = new SortingModel(
      mockList.sorting,
      mockListContributions.sorting
    );

    expect(sorting.options.length).toBe(4); // eslint-disable-line no-magic-numbers
    expect(sorting.name).toBe("sort");
    expect(sorting.value).toEqual([]);
  });

  it("can change sorting", () => {
    const sorting = new SortingModel(
      mockList.sorting,
      mockListContributions.sorting
    );

    sorting.value = "ISBN10 desc";
    expect(sorting.value[0].value).toBe("ISBN10");
    expect(sorting.value[0].order).toBe("desc");
  });
});
