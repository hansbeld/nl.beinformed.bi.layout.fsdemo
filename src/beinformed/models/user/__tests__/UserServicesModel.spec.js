import UserModel from "beinformed/models/user/UserModel";
import UserServicesModel from "beinformed/models/user/UserServicesModel";

describe("UserServicesModel", () => {
  it("should be able to create an empty UserServicesModel object", () => {
    const userServices = new UserServicesModel({});

    expect(userServices instanceof UserServicesModel).toBe(true);
    expect(userServices.user === null).toBe(true);
  });
});
