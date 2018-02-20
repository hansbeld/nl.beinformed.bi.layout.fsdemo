// @flow
import React from "react";
import CheckIcon from "mdi-react/CheckIcon";

import { withMessage } from "beinformed/containers/I18n/Message";
import DatepickerTimePartButton from "beinformed/components/DatetimePicker/DatepickerTimePartButton";

type DatepickerTimeSelectType = {
  time: string,
  message: messageFunctionType,
  onChange: (value: string) => void,
  onClick: (value: string) => void,
  onConfirm: (e: SyntheticEvent<*>) => void
};

/**
 * render
 */
const DatepickerTimeSelect = ({
  message,
  time,
  onChange,
  onClick,
  onConfirm
}: DatepickerTimeSelectType) => (
  <div className="datepicker-time-select">
    <DatepickerTimePartButton
      time={time}
      partName="hours"
      onChange={onChange}
      onClick={onClick}
    />
    <DatepickerTimePartButton
      time={time}
      partName="minutes"
      onChange={onChange}
      onClick={onClick}
    />
    <DatepickerTimePartButton
      time={time}
      partName="seconds"
      onChange={onChange}
      onClick={onClick}
    />
    <div className="datepicker-confirm">
      <div className="datepicker-content">
        <button
          className="btn btn-light"
          onClick={onConfirm}
          aria-label={message("DatetimePicker.useTime", "Use time")}
        >
          <CheckIcon />
        </button>
      </div>
    </div>
  </div>
);

export default withMessage(DatepickerTimeSelect);
