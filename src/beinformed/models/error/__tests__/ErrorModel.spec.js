import ErrorModel from "beinformed/models/error/ErrorModel";

describe("ErrorModel", () => {
  it("Should be able to creat an error", () => {
    const err = new ErrorModel("error1");

    expect(err.id).toBe("error1");
    expect(err.parameters).toBe(null);
    expect(err.isClientConstraint).toBe(false);

    const err2 = new ErrorModel(
      "error2",
      {
        param1: "parameter 1"
      },
      true
    );

    expect(err2.parameters.param1).toBe("parameter 1");
    expect(err2.isClientConstraint).toBe(true);
  });
});
