// @flow
import React from "react";

import DatepickerTable from "beinformed/components/DatetimePicker/DatepickerTable";

type DatepickerTimeSecondsType = {
  onClick: (e: SyntheticEvent<*>) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<*>) => void
};

/**
 * Render date field
 */
const DatepickerTimeSeconds = ({
  onClick,
  onKeyDown
}: DatepickerTimeSecondsType) => {
  const seconds = [
    ["00", "05", "10"],
    ["15", "20", "25"],
    ["30", "35", "40"],
    ["45", "50", "55"]
  ];

  return (
    <DatepickerTable className="datepicker-time datepicker-seconds">
      <tbody>
        {seconds.map((secondRow, i) => (
          <tr key={i}>
            {secondRow.map(second => (
              <td
                key={`second-${i}-${second}`}
                className="datepicker-second btn-light"
                data-value={second}
                role="gridcell"
                tabIndex="-1"
                onClick={onClick}
                onKeyDown={onKeyDown}
              >
                {second}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </DatepickerTable>
  );
};

export default DatepickerTimeSeconds;
