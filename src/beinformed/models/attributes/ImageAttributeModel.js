// @flow
import AttributeModel from "beinformed/models/attributes/AttributeModel";

/**
 * Image attribute
 */
export default class ImageAttributeModel extends AttributeModel<
  AttributeContributionsJSON
> {
  /**
   * @overwrite
   */
  get type(): string {
    return "image";
  }
}
