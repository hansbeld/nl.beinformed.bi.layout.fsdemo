// @flow
import { get } from "lodash";

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
    return get(this.contributions, "text", null);
  }
}
