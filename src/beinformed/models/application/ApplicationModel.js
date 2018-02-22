// @flow
import type LinkCollection from "beinformed/models/links/LinkCollection";
import type UserServicesModel from "beinformed/models/user/UserServicesModel";

import ResourceModel from "beinformed/models/base/ResourceModel";
import LinkModel from "beinformed/models/links/LinkModel";

/**
 * The Application model
 */
export default class ApplicationModel extends ResourceModel {
  _userServices: UserServicesModel | null;

  /**
   * @overwrite
   */
  get type(): string {
    return "Application";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "Application"
    );
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    const userService = this.links.getLinkByKey("UserServices");
    if (userService && userService.href.path === "/login") {
      throw new Error(
        "The user service (Login panel) should not have the uri '/login', use a different URI because this uri matches the login service."
      );
    }

    return userService ? [userService] : [];
  }

  /**
   * @override
   */
  setChildModels() {
    const userServiceModel = this.childModels.find(
      model => model.type === "UserServices"
    );

    if (userServiceModel) {
      this.userServices = userServiceModel;
    }
  }

  /**
   * Getting the label of the application
   */
  get label(): string {
    return this.contributions.label || "";
  }

  /**
   * Getting the tab links
   */
  get tabs(): LinkCollection {
    return this.links.getLinksByGroup("tab");
  }

  /**
   * Get modelcatalog link
   */
  get modelcatalog(): LinkModel {
    return LinkModel.create("modelcatalog", "/modelcatalog", "Model catalog");
  }

  /**
   * Set the userservices for this application
   */
  set userServices(userServices: UserServicesModel) {
    this._userServices = userServices;
  }

  /**
   * returns the userservices configured for this application
   */
  get userServices(): UserServicesModel | null {
    return this._userServices ? this._userServices : null;
  }
}
