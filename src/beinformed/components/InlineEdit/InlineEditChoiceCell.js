// @flow
import React from "react";
import classNames from "classnames";

import ChoiceInput from "beinformed/components/FormInput/ChoiceInput";
import CellAssistant from "beinformed/components/InlineEdit/CellAssistant";
import type ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";

type InlineEditChoiceCellProps = {
  attribute: ChoiceAttributeModel,
  className?: string,
  hasFocus?: boolean,
  id: string,
  name: string,
  stacked?: boolean,
  onBlur: Function,
  onChange: Function,
  onFocus: Function
};

/**
 * Render choice widget
 */
const InlineEditChoiceCell = ({
  className,
  attribute,
  stacked,
  name,
  id,
  hasFocus,
  onBlur,
  onChange,
  onFocus
}: InlineEditChoiceCellProps) => {
  const widgetClass = classNames(className, "choicewidget", {
    "form-group":
      ["checkbox", "radiobutton"].indexOf(attribute.choicetype) === -1,
    "has-danger": attribute.inError()
  });

  return (
    <div className={widgetClass} data-name={name}>
      <ChoiceInput
        stacked={stacked}
        name={name}
        id={id}
        label={attribute.label}
        type={attribute.choicetype}
        options={attribute.options.all}
        isTree={attribute.isTree}
        readOnly={attribute.readonly}
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

export default InlineEditChoiceCell;
