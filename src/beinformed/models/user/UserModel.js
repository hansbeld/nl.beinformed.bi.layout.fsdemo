// @flow
import AttributeCollection from "beinformed/models/attributes/AttributeCollection";
import ResourceModel from "beinformed/models/base/ResourceModel";

import type ModularUIResponse from "beinformed/modularui/ModularUIResponse";

/**
 * User model
 */
export default class UserModel extends ResourceModel {
  _attributeCollection: AttributeCollection;

  /**
   * constructor
   */
  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this._attributeCollection = new AttributeCollection(
      this.data,
      this.contributions.attributes
    );
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "User";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "userdata"
    );
  }

  /**
   * Retrieve username of user
   */
  get username(): string {
    return this.data.userid || "Guest";
  }

  /**
   * returns all the attributes from the attribute collection
   */
  get attributeCollection(): AttributeCollection {
    return this._attributeCollection;
  }

  /**
   * retrieve the fullname of the user
   */
  get fullname(): string {
    return this.data.fullname || "Guest";
  }

  get label(): string {
    return this.contributions.label;
  }
}
