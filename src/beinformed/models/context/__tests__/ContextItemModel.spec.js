import ContextItemModel from "beinformed/models/context/ContextItemModel";

describe("ContextItemModel", () => {
  it("should be able to create an empty ContextItemModel object", () => {
    const contextItem = new ContextItemModel();

    expect(contextItem instanceof ContextItemModel).toBe(true);
  });
});
