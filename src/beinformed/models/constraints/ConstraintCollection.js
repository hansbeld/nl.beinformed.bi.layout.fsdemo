// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";
import ConstraintModel from "beinformed/models/constraints/ConstraintModel";

/**
 * Attribute constraints
 */
export default class ConstraintCollection extends BaseCollection<
  ConstraintModel
> {
  /**
   * Add constraint
   */
  addConstraint(
    id: string,
    validateMethod?: ConstraintValidateMethodType | null,
    data?: ConstraintParametersType
  ) {
    this.add(new ConstraintModel(id, validateMethod, data));
  }

  /**
   * Validate if complete collection is valid
   */
  validate(value: string) {
    return (
      typeof this.collection.find(
        constraint => constraint.validate(value) === false
      ) === "undefined"
    );
  }

  /**
   * Indicates if a mandatory constraint exists in the collection
   */
  hasMandatoryConstraint(): boolean {
    return (
      typeof this.collection.find(
        constraint => constraint.isMandatoryConstraint
      ) !== "undefined"
    );
  }

  /**
   * Retrieve all invalid constraints
   */
  invalidConstraints(value: string): ConstraintModel[] {
    if (value === "" && !this.hasMandatoryConstraint()) {
      return [];
    }

    return this.collection.filter(
      constraint => constraint.validate(value) === false
    );
  }
}
