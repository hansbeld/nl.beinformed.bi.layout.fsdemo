// @flow
import React from "react";
import classNames from "classnames";

import TextInput from "beinformed/components/FormInput/TextInput";

import CellAssistant from "beinformed/components/InlineEdit/CellAssistant";

import type { StringAttributeModel } from "beinformed/models";

type InlineEditStringCellProps = {
  attribute: StringAttributeModel | NumberAttributeModel,
  className?: string,
  id: string,
  hasFocus?: boolean,
  name: string,
  onBlur: Function,
  onChange: Function,
  onFocus: Function
};

/**
 * Render string widget
 */
const InlineEditStringCell = ({
  className,
  attribute,
  name,
  id,
  hasFocus,
  onBlur,
  onChange,
  onFocus
}: InlineEditStringCellProps) => {
  const widgetClass = classNames("form-group", className, {
    "has-danger": attribute.inError(),
    stringwidget: !className || !className.includes("widget")
  });

  return (
    <div className={widgetClass} data-name={name}>
      <TextInput
        name={name}
        id={id}
        value={attribute.inputvalue}
        prepend={attribute.prefix}
        append={attribute.postfix}
        readOnly={attribute.readonly}
        inError={attribute.inError()}
        ariaLabel={attribute.label}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
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

export default InlineEditStringCell;
