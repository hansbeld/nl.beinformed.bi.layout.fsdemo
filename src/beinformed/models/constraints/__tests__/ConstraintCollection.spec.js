import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";

describe("ConstraintCollection", () => {
  it("should be able to create an instance of ConstraintCollection", () => {
    const constraints = new ConstraintCollection();

    expect(constraints instanceof ConstraintCollection).toBe(true);
  });
});
