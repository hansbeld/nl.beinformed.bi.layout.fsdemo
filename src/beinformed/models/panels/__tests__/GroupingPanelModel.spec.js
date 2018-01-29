import GroupingPanelModel from "beinformed/models/panels/GroupingPanelModel";

describe("GroupingPanelModel", () => {
  it("should be able to create an empty GroupingPanelModel object", () => {
    const groupingPanel = new GroupingPanelModel();

    expect(groupingPanel instanceof GroupingPanelModel).toBe(true);
  });
});
