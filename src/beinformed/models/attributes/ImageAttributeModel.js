// @flow
import AttributeModel from "beinformed/models/attributes/AttributeModel";

/**
 * Image attribute
 */
export default class ImageAttributeModel extends AttributeModel {
  /**
   * @overwrite
   */
  get type(): string {
    return "image";
  }
}
