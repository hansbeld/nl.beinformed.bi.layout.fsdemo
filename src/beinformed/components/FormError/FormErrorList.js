// @flow
import React from "react";

import { Message } from "beinformed/i18n";
import type { ErrorCollection } from "beinformed/models";

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
