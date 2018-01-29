import PanelCollection from "beinformed/models/panels/PanelCollection";

describe("PanelCollection", () => {
  it("should be able to create an empty PanelCollection object", () => {
    const panelCollection = new PanelCollection();

    expect(panelCollection instanceof PanelCollection).toBe(true);
  });
});
