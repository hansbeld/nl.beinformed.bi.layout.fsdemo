// @flow
/**
 * Constraint
 */
export default class ConstraintModel {
  _id: string;
  _validateMethod: ?ConstraintValidateMethodType;
  _parameters: ?ConstraintParametersType;

  /**
   * Construct constraint
   */
  constructor(
    id: string,
    validateMethod?: ConstraintValidateMethodType | null,
    parameters?: ConstraintParametersType
  ) {
    this._id = id;
    this._validateMethod = validateMethod;
    this._parameters = parameters;
  }

  /**
   * Retreive type of constraint
   */
  get id(): string {
    return this._id;
  }

  /**
   * Returns available data for constraint
   */
  get parameters(): ?ConstraintParametersType | null {
    return this._parameters;
  }

  /**
   * Inidicates if validation message is present
   */
  hasValidation() {
    return this._validateMethod && this._validateMethod !== null;
  }

  /**
   * Validate constraint with value
   */
  validate(value: string) {
    const validateMethod = this._validateMethod;

    if (validateMethod) {
      return validateMethod(value);
    }

    return true;
  }

  get isMandatoryConstraint(): boolean {
    return this._id === "mandatory" || this._id === "Constraint.Mandatory";
  }
}
