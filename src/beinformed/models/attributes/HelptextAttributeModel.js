// @flow
import LabelAttributeModel from "beinformed/models/attributes/LabelAttributeModel";

/**
 * Helptext attribute
 */
export default class HelptextAttributeModel extends LabelAttributeModel {
  /**
   * @overwrite
   */
  get type(): string {
    return "helptext";
  }

  /**
   * Get helptext text
   */
  get text(): string | null {
    return this.contributions.text || null;
  }
}
