import LinkModel from "beinformed/models/links/LinkModel";

describe("LinkModel", () => {
  it("should be able to create an empty LinkModel object", () => {
    const link = new LinkModel();

    expect(link instanceof LinkModel).toBe(true);
  });
});
