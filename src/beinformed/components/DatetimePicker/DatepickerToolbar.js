// @flow
import React from "react";

import CalendarIcon from "mdi-react/CalendarIcon";
import ClockIcon from "mdi-react/ClockIcon";

import { TimestampUtil } from "beinformed/utils/datetime/DateTimeUtil";
import { KEYCODES } from "beinformed/constants/Constants";

import "./DatepickerToolbar.scss";

type DatepickerToolbarType = {
  datetime: string,
  type: string,
  onSwitch: (type: "time" | "date") => void
};

/**
 * Render date field
 */
const DatepickerToolbar = ({
  datetime,
  type,
  onSwitch
}: DatepickerToolbarType) => {
  const format = type === "date" ? "HH:mm:ss" : "DD-MM-YYYY";
  const switchType = type === "date" ? "time" : "date";

  return (
    <div className="datetimepicker-toolbar">
      <button
        type="button"
        className="btn btn-light"
        onClick={e => {
          e.preventDefault();
          onSwitch(switchType);
        }}
        onKeyDown={e => {
          if (KEYCODES.ENTER || KEYCODES.SPACE) {
            e.preventDefault();
            onSwitch(switchType);
          }
        }}
      >
        {type === "date" ? <CalendarIcon /> : <ClockIcon />}{" "}
        {TimestampUtil.toFormat(datetime, format)}
      </button>
    </div>
  );
};

export default DatepickerToolbar;
