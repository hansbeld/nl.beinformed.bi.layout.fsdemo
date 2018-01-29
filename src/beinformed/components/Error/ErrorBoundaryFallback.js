/** @flow */
import React from "react";

type Props = {
  componentStack: string,
  error: Error
};

const ErrorBoundaryFallbackComponent = ({ componentStack, error }: Props) => (
  <div className="jumbotron error-boundary">
    <h1>Error in UI</h1>
    <h2>{error.toString()}</h2>
    <pre className="debug font-italic">{componentStack}</pre>
  </div>
);

export default ErrorBoundaryFallbackComponent;
