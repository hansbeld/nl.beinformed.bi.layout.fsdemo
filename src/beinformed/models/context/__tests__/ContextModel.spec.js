import ContextModel from "beinformed/models/context/ContextModel";

describe("ContextModel", () => {
  it("should be able to create an empty ContextModel object", () => {
    const context = new ContextModel();

    expect(context instanceof ContextModel).toBe(true);
  });
});
