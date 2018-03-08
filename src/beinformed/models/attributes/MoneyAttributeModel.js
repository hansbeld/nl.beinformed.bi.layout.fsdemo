// @flow
import { get } from "lodash";

import NumberAttributeModel from "beinformed/models/attributes/NumberAttributeModel";

import DecimalFormat from "beinformed/utils/number/DecimalFormat";

/**
 * Money Attribute model
 */
export default class MoneyAttributeModel extends NumberAttributeModel {
  /**
   * @overwrite
   */
  get type(): string {
    return "money";
  }

  /**
   * Retrieve currency symbol
   */
  get currencySymbol(): string {
    return get(this.contributions, "currencySymbol", "");
  }

  /**
   * Retrieve currency symbol as prefix
   */
  get prefix(): string {
    return this.currencySymbol;
  }

  formatValue(value: string | number | null): string {
    if (this.format !== null) {
      return new DecimalFormat(this.format).format(value);
    }

    if (value) {
      return value.toString();
    }

    return "";
  }
}
