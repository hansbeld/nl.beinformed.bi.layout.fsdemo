// @flow
/**
 * Wrapper around an error message / object
 */
class ErrorModel {
  _id: string;
  _parameters: MessageParametersType | null;
  _isClientConstraint: boolean;

  /**
   * Contruct
   */
  constructor(
    id: string,
    parameters?: MessageParametersType | null,
    isClientConstraint?: boolean
  ) {
    this._id = id;
    this._parameters = parameters || null;

    this._isClientConstraint = isClientConstraint || false;
  }

  /**
   * Get id of error
   */
  get id(): string {
    return this._id;
  }

  /**
   * Get default message
   */
  get parameters(): MessageParametersType | null {
    return this._parameters;
  }

  get isClientConstraint(): boolean {
    return this._isClientConstraint || false;
  }
}

export default ErrorModel;
