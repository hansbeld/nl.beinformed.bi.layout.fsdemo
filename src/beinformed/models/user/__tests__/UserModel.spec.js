import UserModel from "beinformed/models/user/UserModel";

describe("UserModel", () => {
  it("should be able to create an empty UserModel object", () => {
    const user = new UserModel({});

    expect(user instanceof UserModel).toBe(true);
  });
});
