// @flow
import AttributeModel from "beinformed/models/attributes/AttributeModel";

/**
 * Label Attribute model
 */
export default class LabelAttributeModel extends AttributeModel {
  /**
   * @overwrite
   */
  get type(): string {
    return "label";
  }
}
