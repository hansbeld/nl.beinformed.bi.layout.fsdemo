// @flow
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";

/**
 * BSN attribute
 */
export default class BSNAttributeModel extends StringAttributeModel {
  /**
   * @overwrite
   */
  get type(): string {
    return "bsn";
  }

  isValidBSN(bsn: string) {
    const bsnNumber = bsn.replace(/\D/, "");
    const bsnLength = bsnNumber.length;
    const MINBSNLENGTH = 8;
    const MAXBSNLENGTH = 9;

    if (
      bsnLength < MINBSNLENGTH ||
      bsnLength > MAXBSNLENGTH ||
      isNaN(bsnNumber)
    ) {
      return false;
    }

    let pos = 0;
    let result = 0;

    for (let i = bsnLength; i > 0; i--) {
      const digit = parseInt(bsnNumber.charAt(pos), 10);

      result += i === 1 ? digit * i * -1 : digit * i;
      pos = pos + 1;
    }

    return result % 11 === 0; // eslint-disable-line no-magic-numbers
  }

  /**
   * Add BSN constraint to constraints of attribute
   */
  addConstraints(): ConstraintCollection {
    const constraints = new ConstraintCollection();

    constraints.addConstraint(
      "Constraint.BSN.InvalidFormat",
      this.isValidBSN.bind(this),
      { value: this.inputvalue }
    );

    return constraints;
  }
}
