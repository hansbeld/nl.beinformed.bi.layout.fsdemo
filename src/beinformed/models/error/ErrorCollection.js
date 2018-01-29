// @flow
import type ConstraintModel from "beinformed/models/constraints/ConstraintModel";
import BaseCollection from "beinformed/models/base/BaseCollection";
import ErrorModel from "beinformed/models/error/ErrorModel";

/**
 * Form Objects
 */
export default class ErrorCollection extends BaseCollection<ErrorModel> {
  _type: string;

  /**
   * constructor
   */
  constructor(type: string, errorCollection?: ErrorCollection) {
    super();

    this._type = type;
    this.collection = [];

    if (errorCollection) {
      this.collection = [...errorCollection.collection];
    }
  }

  get serverErrors(): Array<ErrorModel> {
    return this.collection.filter(error => !error.isClientConstraint);
  }

  findById(id: string) {
    return this.collection.findIndex(item => item.id === id);
  }

  /**
   * Add an error to the collection
   */
  addError(id: string, parameters?: MessageParametersType) {
    const itemIdx = this.findById(id);

    if (itemIdx > -1) {
      this.remove(itemIdx);
    }

    this.add(new ErrorModel(id, parameters));
  }

  removeError(id: string) {
    const itemIdx = this.findById(id);
    this.remove(itemIdx);
  }

  /**
   * Add a server error to the collection
   */
  addServerError(id: string, parameters?: MessageParametersType | null) {
    if (parameters) {
      this.addError(id, parameters);
    } else {
      this.addError(id);
    }
  }

  removeServerError(id: string) {
    this.removeError(id);
  }

  removeServerErrors() {
    this.serverErrors.forEach(error => {
      this.removeError(error.id);
    });
  }

  /**
   * Add constraints to error collection
   */
  addConstraints(constraints: Array<ConstraintModel>) {
    this.collection = [
      ...this.collection,
      ...constraints.map(
        constraint => new ErrorModel(constraint.id, constraint.parameters, true)
      )
    ];
  }

  /**
   * Indicates if a mandatory constraint is available and if it is in error.
   * Rationale: When a mandatory constraint is in error other constraint probably don't mather because there is no value to check
   */
  hasMandatoryError(): boolean {
    const mandatoryConstraint = this.collection.find(
      constraint => constraint.id === "Constraint.Mandatory"
    );

    return typeof mandatoryConstraint !== "undefined";
  }
}
