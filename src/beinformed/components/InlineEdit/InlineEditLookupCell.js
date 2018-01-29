// @flow
import React from "react";
import classNames from "classnames";

import LookupInput from "beinformed/components/FormInput/LookupInput";

import CellAssistant from "beinformed/components/InlineEdit/CellAssistant";

import type LookupAttributeModel from "beinformed/models/attributes/LookupAttributeModel";

type InlineEditLookupCellProps = {
  attribute: LookupAttributeModel,
  className?: string,
  hasFocus?: boolean,
  id: string,
  name: string,
  onBlur: Function,
  onChange: Function,
  onFocus: Function
};

/**
 * Render lookup table cell
 */
const InlineEditLookupCell = ({
  className,
  attribute,
  name,
  id,
  hasFocus,
  onBlur,
  onChange,
  onFocus
}: InlineEditLookupCellProps) => {
  const widgetClass = classNames("form-group", "lookupwidget", className, {
    "has-danger": attribute.inError()
  });

  return (
    <div className={widgetClass} data-name={name}>
      <LookupInput
        name={name}
        id={id}
        options={attribute.options}
        ariaLabel={attribute.label}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        isMultiple={attribute.isMultiple}
        readOnly={attribute.readonly}
        lookupLink={attribute.lookupLink}
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

export default InlineEditLookupCell;
