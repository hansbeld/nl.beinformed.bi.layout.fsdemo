// @flow
/* global process */
import React from "react";

/**
 * Render a generic error page
 */
const ErrorPage = ({
  errorMessage,
  errorResource,
  errorLine,
  errorStack
}: {
  errorMessage: string,
  errorResource?: string,
  errorLine?: number,
  errorStack?: string
}) => (
  <div className="application">
    <div className="errorpage jumbotron">
      <p className="lead">
        Sorry, but the page you are looking for was either not found or does not
        exist.<br />
        Try refreshing the page or click on the button below to go back to the
        Homepage.
      </p>
      <p>
        <em>{errorMessage}</em>
      </p>
      {process.env.NODE_ENV !== "production" &&
        errorStack && <pre className="debug font-italic">{errorStack}</pre>}
      {process.env.NODE_ENV !== "production" &&
        errorResource && (
          <div className="font-weight-bold">
            {errorResource}, {errorLine}
          </div>
        )}
      <a href="/" className="btn btn-primary btn-lg mt-4">
        Homepage
      </a>
    </div>
  </div>
);

export default ErrorPage;
