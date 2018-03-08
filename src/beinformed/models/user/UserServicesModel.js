// @flow
import ResourceModel from "beinformed/models/base/ResourceModel";
import UserModel from "beinformed/models/user/UserModel";

import type LinkModel from "beinformed/models/links/LinkModel";
import type Href from "beinformed/models/href/Href";

/**
 * UserServicesModel model
 */
export default class UserServicesModel extends ResourceModel<
  UserServicesJSON,
  UserServicesContributionsJSON
> {
  _user: UserModel | null;

  /**
   * @overwrite
   */
  get type(): string {
    return "UserServices";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "user_services"
    );
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    const userData = this.links.getLinkByKey("Userdata");
    return userData ? [userData] : [];
  }

  /**
   * @override
   */
  setChildModels() {
    const userModel = this.childModels.find(model => model.type === "User");
    if (userModel) {
      this.user = userModel;
    }
  }

  /**
   * return the user for the current user
   */
  get user(): UserModel | null {
    return this._user || null;
  }

  /**
   * Set user data
   */
  set user(user: UserModel | null) {
    this._user = user;
  }

  /**
   * Getting the label of the application
   */
  get label(): string {
    return this.contributions.label || "";
  }

  get changePassword(): Href | null {
    const changePasswordLink = this.links.getLinkByKey("ChangePassword");

    if (changePasswordLink) {
      return changePasswordLink.href;
    }

    return null;
  }
}
