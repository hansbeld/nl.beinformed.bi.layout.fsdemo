// @flow
import Href from "beinformed/models/href/Href";

import type FetchError from "beinformed/utils/fetch/FetchError";

/**
 * Error response model
 */
export default class ErrorResponse {
  _error: FetchError;

  /**
   * Construct ErrorResponse
   */
  constructor(data: FetchError) {
    this._error = data;
  }

  /**
   * Return error information
   */
  get error(): FetchError {
    return this._error;
  }

  /**
   * Get request status code
   */
  get status(): number {
    const NO_RESPONSE_CODE = 0;
    const DECIMAL_RADIX = 10;
    return this.error.status
      ? parseInt(this.error.status, DECIMAL_RADIX)
      : NO_RESPONSE_CODE;
  }

  /**
   * Return error type information
   */
  get id(): string {
    if (this.isResourceNotFound) {
      return "Error.ResourceNotFound";
    }

    return this._error.id || "Error.GeneralError";
  }

  get response(): Object {
    return this.error.response || {};
  }

  get properties(): Object {
    const properties = this.error.properties;
    if (properties !== null && typeof properties === "object") {
      return properties;
    }

    return {};
  }

  /**
   * Return error parameters
   */
  get parameters(): MessageParametersType | null {
    return this.error.parameters || null;
  }

  get isResourceNotFound(): boolean {
    const RESOURCE_NOT_FOUND_RESPONSE_CODE = 404;

    return this.status === RESOURCE_NOT_FOUND_RESPONSE_CODE;
  }

  /**
   * Check if the error message is an authorization error
   */
  get isUnauthorized(): boolean {
    const UNAUTHORIZED_RESPONSE_CODE = 401;

    const hasUnauthorizedStatus = this.status === UNAUTHORIZED_RESPONSE_CODE;
    const hasUnauthorizedErrorId =
      this.id === "Error.NotAuthorized" ||
      this.id === "Error.Authentication.Required" ||
      this.id === "Error.Authentication.InvalidCredentials";
    const hasLoginAction = this.error.action
      ? this.error.action.name === "login"
      : false;

    return hasUnauthorizedStatus || hasUnauthorizedErrorId || hasLoginAction;
  }

  get isChangePassword(): boolean {
    return this.id === "Error.ChangePasswordRequired";
  }

  get isBlocked(): boolean {
    return this.id === "Error.Authentication.BlockedUser";
  }

  /**
   * Get response url
   */
  get changePasswordHref(): Href | null {
    return this.properties.redirect ? new Href(this.properties.redirect) : null;
  }

  /**
   * When no action information is present in the unauthorized response, for now we assume it is Basic Authentication
   */
  get isBasicAuthentication(): boolean {
    const UNAUTHORIZED_RESPONSE_CODE = 401;
    return (
      this.isUnauthorized &&
      this.status === UNAUTHORIZED_RESPONSE_CODE &&
      this.response.error === "No responseText"
    );
  }

  /**
   * Retrieve a failed login attempt
   */
  get loginFailed(): boolean {
    return (
      this.id === "Error.Authentication.Required" ||
      this.id === "Error.Authentication.InvalidCredentials"
    );
  }
}
