import GroupingModel from "beinformed/models/grouping/GroupingModel";

describe("GroupingModel", () => {
  it("should be able to create an empty GroupingModel object", () => {
    const grouping = new GroupingModel({});

    expect(grouping instanceof GroupingModel).toBe(true);
  });
});
