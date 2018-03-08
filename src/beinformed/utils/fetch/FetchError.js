// @flow
import { get } from "lodash";

const CLIENT_ERROR_CODE = 400;

/**
 * Request Exception information
 */
class FetchError extends Error {
  request: XMLHttpRequest | dataFetcher | null;
  status: number;
  response: ErrorResponseJSON;
  id: string;
  parameters: any;
  properties: Object;
  action: any;

  constructor(
    errorResponse: ErrorResponseJSON,
    failedRequest?: XMLHttpRequest | dataFetcher | null = null
  ) {
    let errorMessage = "FetchError";

    if (
      errorResponse.error &&
      errorResponse.error.properties &&
      errorResponse.error.properties.message
    ) {
      errorMessage = errorResponse.error.properties.message;
    } else if (errorResponse.error && errorResponse.error.id) {
      errorMessage = errorResponse.error.id;
    }

    super(errorMessage);

    this.name = "FetchError";
    this.request = failedRequest;

    this.status =
      failedRequest && failedRequest.status
        ? failedRequest.status
        : CLIENT_ERROR_CODE;
    this.response = errorResponse;
    this.properties = errorResponse.error
      ? get(errorResponse.error, "properties", {})
      : {};

    this.id = errorResponse.error ? errorResponse.error.id : "FetchError";

    this.parameters =
      errorResponse.error && errorResponse.error.parameters
        ? errorResponse.error.parameters
        : null;
    this.action =
      errorResponse.error && errorResponse.error.action
        ? errorResponse.error.action
        : null;
  }
}

export default FetchError;
