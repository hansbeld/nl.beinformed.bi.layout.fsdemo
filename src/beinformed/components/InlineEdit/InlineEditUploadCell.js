// @flow
import React from "react";
import classNames from "classnames";

import UploadInput from "beinformed/components/FormInput/UploadInput";

import CellAssistant from "beinformed/components/InlineEdit/CellAssistant";

import type { UploadAttributeModel } from "beinformed/models";

type InlineEditUploadCellProps = {
  attribute: UploadAttributeModel,
  className?: string,
  hasFocus?: boolean,
  id: string,
  name: string,
  onBlur: Function,
  onChange: Function,
  onFocus: Function
};

/**
 * Render string widget
 */
const InlineEditUploadCell = ({
  className,
  attribute,
  name,
  id,
  hasFocus,
  onBlur,
  onChange,
  onFocus
}: InlineEditUploadCellProps) => {
  const widgetClass = classNames("form-group", "uploadwidget", className, {
    "has-danger": attribute.inError()
  });

  return (
    <div className={widgetClass} data-name={name}>
      <UploadInput
        name={name}
        ariaLabel={attribute.label}
        id={id}
        value={attribute.inputvalue}
        isMultiple={attribute.multiple}
        uploadConstraints={attribute.uploadConstraints}
        append={attribute.postfix}
        readOnly={attribute.readonly}
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

export default InlineEditUploadCell;
