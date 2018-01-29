import ConstraintModel from "beinformed/models/constraints/ConstraintModel";

describe("ConstraintModel", () => {
  it("should be able to create an instance of Constraint", () => {
    const constraint = new ConstraintModel();

    expect(constraint instanceof ConstraintModel).toBe(true);
  });
});
