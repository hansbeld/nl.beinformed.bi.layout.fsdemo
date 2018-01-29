// @flow
import React from "react";

import { Message } from "beinformed/containers/I18n/Message";
import type ErrorCollection from "beinformed/models/error/ErrorCollection";

/**
 * Render a list of (error) messages
 */
const FormErrorList = ({
  errorCollection
}: {
  errorCollection: ErrorCollection
}) => (
  <ul className="form-errorlist list-unstyled ml-2">
    {errorCollection
      .filter(
        error =>
          error.id === "Constraint.Mandatory" ||
          !errorCollection.hasMandatoryError()
      )
      .map((error, i) => (
        <li key={i} data-type={error.id}>
          <Message
            id={error.id}
            defaultMessage={error.id}
            data={error.parameters}
          />
        </li>
      ))}
  </ul>
);

export default FormErrorList;
