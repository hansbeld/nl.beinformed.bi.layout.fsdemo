// @flow
import React from "react";
import classNames from "classnames";

import DateAttributeModel from "beinformed/models/attributes/DateAttributeModel";
import TimeAttributeModel from "beinformed/models/attributes/TimeAttributeModel";
import TimestampAttributeModel from "beinformed/models/attributes/TimestampAttributeModel";

import CellAssistant from "beinformed/components/InlineEdit/CellAssistant";

import DatetimeInput from "beinformed/components/FormInput/DatetimeInput";

type InlineEditDatetimeCellProps = {
  attribute: DateAttributeModel | TimeAttributeModel | TimestampAttributeModel,
  className?: string,
  hasFocus?: boolean,
  id: string,
  name: string,
  onBlur: Function,
  onChange: Function,
  onFocus: Function
};

/**
 * Render date, time or datetime widget
 */
const InlineEditDatetimeCell = ({
  className,
  attribute,
  name,
  id,
  hasFocus,
  onBlur,
  onChange,
  onFocus
}: InlineEditDatetimeCellProps) => {
  const widgetClass = classNames("form-group", className, {
    "has-danger": attribute.inError(),
    datewidget: attribute instanceof DateAttributeModel,
    timewidget: attribute instanceof TimeAttributeModel,
    timestampwidget: attribute instanceof TimestampAttributeModel
  });

  const mindate =
    attribute instanceof DateAttributeModel ? attribute.mindate : null;
  const maxdate =
    attribute instanceof DateAttributeModel ? attribute.maxdate : null;

  return (
    <div className={widgetClass} data-name={name}>
      <DatetimeInput
        name={name}
        id={id}
        value={attribute.inputvalue}
        mindate={mindate}
        maxdate={maxdate}
        format={attribute.format}
        placeholder={attribute.format}
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

export default InlineEditDatetimeCell;
