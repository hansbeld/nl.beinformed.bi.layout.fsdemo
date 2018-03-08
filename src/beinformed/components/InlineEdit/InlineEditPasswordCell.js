// @flow
import React from "react";
import classNames from "classnames";

import PasswordInput from "beinformed/components/FormInput/PasswordInput";

import CellAssistant from "beinformed/components/InlineEdit/CellAssistant";

import type { PasswordAttributeModel } from "beinformed/models";

type InlineEditPasswordCellProps = {
  attribute: PasswordAttributeModel,
  className?: string,
  id: string,
  hasFocus?: boolean,
  name: string,
  onBlur: Function,
  onChange: Function,
  onFocus: Function
};

/**
 * Render password widget
 */
const InlineEditPasswordCell = ({
  className,
  attribute,
  name,
  id,
  hasFocus,
  onBlur,
  onChange,
  onFocus
}: InlineEditPasswordCellProps) => {
  const widgetClass = classNames("form-group", "passwordwidget", className, {
    "has-danger": attribute.inError()
  });

  return (
    <div className={widgetClass} data-name={name}>
      <PasswordInput
        ariaLabel={attribute.label}
        name={name}
        id={id}
        value={attribute.inputvalue}
        readOnly={attribute.readonly}
        append={attribute.postfix}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        inError={attribute.inError()}
      />
      {hasFocus && (
        <CellAssistant
          assistantMessage={attribute.assistantMessage}
          constraints={attribute.constraintCollection}
          errors={attribute.errorCollection}
          value={attribute.inputvalue}
        />
      )}
    </div>
  );
};

export default InlineEditPasswordCell;
