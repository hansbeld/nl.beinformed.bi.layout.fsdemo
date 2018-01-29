// @flow
import React from "react";
import classNames from "classnames";

import XMLAttributeModel from "beinformed/models/attributes/XMLAttributeModel";

import TextareaInput from "beinformed/components/FormInput/TextareaInput";
import WysiwygInput from "beinformed/components/FormInput/WysiwygInput";

import CellAssistant from "beinformed/components/InlineEdit/CellAssistant";

type InlineEditXMLCellProps = {
  attribute: XMLAttributeModel,
  className?: string,
  hasFocus?: boolean,
  id: string,
  name: string,
  onBlur: Function,
  onChange: Function,
  onFocus: Function
};

/**
 * Render inline memo cell
 */
const InlineEditXMLCell = ({
  className,
  attribute,
  name,
  id,
  hasFocus,
  onBlur,
  onChange,
  onFocus
}: InlineEditXMLCellProps) => {
  const widgetClass = classNames("form-group", className, {
    "has-danger": attribute.inError(),
    xmlwidget: attribute instanceof XMLAttributeModel
  });

  const MemoInput = attribute.formatted ? WysiwygInput : TextareaInput;

  return (
    <div className={widgetClass} data-name={name}>
      <MemoInput
        name={name}
        id={id}
        value={attribute.inputvalue}
        ariaLabel={attribute.label}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        inError={attribute.inError()}
        readOnly={attribute.readonly}
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

export default InlineEditXMLCell;
