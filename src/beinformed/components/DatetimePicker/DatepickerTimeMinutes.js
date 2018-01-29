// @flow
import React from "react";

import DatepickerTable from "beinformed/components/DatetimePicker/DatepickerTable";

type DatepickerTimeMinutesType = {
  onClick: (e: SyntheticEvent<*>) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<*>) => void
};

/**
 * Render date field
 */
const DatepickerTimeMinutes = ({
  onClick,
  onKeyDown
}: DatepickerTimeMinutesType) => {
  const minutes = [
    ["00", "05", "10"],
    ["15", "20", "25"],
    ["30", "35", "40"],
    ["45", "50", "55"]
  ];

  return (
    <DatepickerTable className="datepicker-time datepicker-minutes">
      <tbody>
        {minutes.map((minuteRow, i) => (
          <tr key={`minuterow-${i}`}>
            {minuteRow.map(minute => (
              <td
                key={`minute-${minute}`}
                className="datepicker-minute btn-light"
                data-value={minute}
                role="gridcell"
                tabIndex="-1"
                onClick={onClick}
                onKeyDown={onKeyDown}
              >
                {minute}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </DatepickerTable>
  );
};

export default DatepickerTimeMinutes;
