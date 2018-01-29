import FormObjectModel from "beinformed/models/form/FormObjectModel";

describe("FormObjectModel", () => {
  it("should be able to create an empty FormObjectModel object", () => {
    const formObject = new FormObjectModel();

    expect(formObject instanceof FormObjectModel).toBe(true);
  });
});
