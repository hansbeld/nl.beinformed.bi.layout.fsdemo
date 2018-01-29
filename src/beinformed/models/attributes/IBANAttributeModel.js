// @flow
import IBAN from "iban";

import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";

/**
 * IBAN attribute
 */
export default class IBANAttributeModel extends StringAttributeModel {
  /**
   * @overwrite
   */
  get type(): string {
    return "iban";
  }

  isIBAN(value: string) {
    return IBAN.isValid(value);
  }

  /**
   * Add constraints for iban number
   * @return {ConstraintCollection}
   */
  addConstraints() {
    const constraints = new ConstraintCollection();

    constraints.addConstraint(
      "Constraint.IBAN.InvalidFormat",
      this.isIBAN.bind(this),
      { value: this.inputvalue }
    );

    return constraints;
  }
}
