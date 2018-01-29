// @flow
import React from "react";

import { TimeUtil } from "beinformed/utils/datetime/DateTimeUtil";
import { withMessage } from "beinformed/containers/I18n/Message";
import Icon from "beinformed/components/Icon/Icon";

type DatepickerTimePartButtonType = {
  time: string,
  message: messageFunctionType,
  partName: "hours" | "minutes" | "seconds",
  onChange: (value: string) => void,
  onClick: (type: "hours" | "minutes" | "seconds") => void
};

/**
 * Renders a DatepickerTimePartButton
 */
const DatepickerTimePartButton = ({
  message,
  partName,
  time,
  onChange,
  onClick
}: DatepickerTimePartButtonType) => {
  const format = {
    hours: "HH",
    minutes: "mm",
    seconds: "ss"
  };

  return (
    <div className={`datepicker-${partName}`}>
      <div className="datepicker-up">
        <button
          className="btn btn-light"
          aria-label={message("DatePicker.up", "Up")}
          onClick={e => {
            e.preventDefault();

            if (partName === "hours") {
              return onChange(TimeUtil.addHours(time, 1));
            }

            if (partName === "minutes") {
              return onChange(TimeUtil.addMinutes(time, 1));
            }

            if (partName === "seconds") {
              return onChange(TimeUtil.addSeconds(time, 1));
            }

            return null;
          }}
        >
          <Icon name="arrow-up" />
        </button>
      </div>
      <div className="datepicker-content">
        <button
          className="btn btn-light"
          onClick={e => {
            e.preventDefault();
            onClick(partName);
          }}
        >
          {TimeUtil.toFormat(time, format[partName])}
        </button>
      </div>
      <div className="datepicker-down">
        <button
          className="btn btn-light"
          aria-label={message("DatePicker.down", "Down")}
          onClick={e => {
            e.preventDefault();

            if (partName === "hours") {
              return onChange(TimeUtil.subtractHours(time, 1));
            }

            if (partName === "minutes") {
              return onChange(TimeUtil.subtractMinutes(time, 1));
            }

            if (partName === "seconds") {
              return onChange(TimeUtil.subtractSeconds(time, 1));
            }

            return null;
          }}
        >
          <Icon name="arrow-down" />
        </button>
      </div>
    </div>
  );
};

export default withMessage(DatepickerTimePartButton);
