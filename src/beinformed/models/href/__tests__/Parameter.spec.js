import Parameter from "beinformed/models/href/Parameter";

describe("Parameter", () => {
  it("should be able to create an empty Parameter object", () => {
    const parameter = new Parameter();

    expect(parameter instanceof Parameter).toBe(true);
  });
});
