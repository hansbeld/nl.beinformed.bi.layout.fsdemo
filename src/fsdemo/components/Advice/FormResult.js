// @flow
import React from "react";
import classNames from "classnames";

import FormResultAttribute from "fsdemo/components/Advice/FormResultAttribute";

import { ContentConfigurationResults } from "beinformed/models";

import "./FormResult.scss";

type FormResultProps = {
  className?: string,
  attributes: Array<AttributeType>,
  contentConfiguration?: ?ContentConfigurationResults
};

/**
 * Render form result objects of a form
 */
const FormResult = ({
  className,
  attributes,
  contentConfiguration,
  id
}: FormResultProps) => (
  <div className={classNames("form-result", className)}>
    {attributes &&
      attributes.map((attribute, i) => (
        <FormResultAttribute
          key={`${id}-${attribute.name}-${i}`}
          id={`${id}-${attribute.name}`}
          attribute={attribute}
          contentConfiguration={contentConfiguration}
        />
      ))}
  </div>
);

export default FormResult;
