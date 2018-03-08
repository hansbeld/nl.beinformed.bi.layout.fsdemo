// @flow

import AttributeModel from "beinformed/models/attributes/AttributeModel";

/**
 * Password attribute
 */
export default class CaptchaAttributeModel extends AttributeModel<
  CaptchaAttributeContributionsJSON
> {
  /**
   * @overwrite
   */
  get type(): string {
    return "captcha";
  }

  /**
   * Update the attribute by name and value
   */
  update(value: string) {
    this.updateLastModification();
    this.inputvalue = value;

    return this;
  }
}
