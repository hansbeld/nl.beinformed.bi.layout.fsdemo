// @flow
import React from "react";
import classNames from "classnames";

import type { ContentConfigurationElements } from "beinformed/models";

import { HORIZONTAL_FORM_LABEL_CLASS } from "beinformed/constants/Constants";
import { HIDE_LABEL } from "beinformed/constants/LayoutHints";

import "./FormLabel.scss";

type FormLabelProps = {
  className?: string,
  htmlFor?: string,
  defaultLabel?: string,
  isMandatory?: boolean,
  contentConfiguration?: ContentConfigurationElements | null,
  attribute: AttributeType,
  formLayout?: "vertical" | "horizontal",
  children?: any
};

/**
 * Render label
 */
const FormLabel = ({
  className,
  htmlFor,
  defaultLabel,
  isMandatory,
  contentConfiguration,
  attribute,
  formLayout,
  children
}: FormLabelProps) =>
  attribute.layouthint.has(HIDE_LABEL) ? null : (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label
      className={classNames(
        "form-label",
        {
          [HORIZONTAL_FORM_LABEL_CLASS]: formLayout === "horizontal",
          "col-12": formLayout !== "horizontal"
        },
        className
      )}
      htmlFor={htmlFor}
      id={htmlFor ? `${htmlFor}-label` : null}
    >
      {(defaultLabel ||
        attribute.getContentConfiguredLabel(contentConfiguration)) +
        (isMandatory || attribute.mandatory ? " *" : "")}
      {children}
    </label>
  );

export default FormLabel;
