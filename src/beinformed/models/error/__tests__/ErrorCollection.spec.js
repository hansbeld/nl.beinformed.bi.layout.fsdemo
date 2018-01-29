import ErrorCollection from "beinformed/models/error/ErrorCollection";
import ConstraintModel from "beinformed/models/constraints/ConstraintModel";

describe("ErrorCollection", () => {
  it("Should be able to creat an error collection", () => {
    const collection = new ErrorCollection();

    expect(collection.all.length).toBe(0);
    expect(collection.serverErrors.length).toBe(0);

    collection.addServerError("server_error");
    expect(collection.serverErrors.length).toBe(1);

    collection.addServerError("server_error2", null);
    expect(collection.serverErrors.length).toBe(2);

    collection.addServerError("server_error3", {
      param1: "parameter 1",
      param2: "parameter 2"
    });
    expect(collection.serverErrors.length).toBe(3);
  });

  it("Should be able to create an errorcollection from an other errorcollection", () => {
    const collection1 = new ErrorCollection();
    collection1.addServerError("error1");

    const collection2 = new ErrorCollection("coll2", collection1);

    expect(collection2.length).toBe(1);
  });

  it("Should be able to add constraint errors", () => {
    const collection = new ErrorCollection();

    collection.addConstraints([new ConstraintModel("constraintid")]);

    expect(collection.all.length).toBe(1);
    expect(collection.serverErrors.length).toBe(0);
  });
});
