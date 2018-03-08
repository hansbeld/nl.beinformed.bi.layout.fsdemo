// @flow
import React from "react";

import DatepickerTable from "beinformed/components/DatetimePicker/DatepickerTable";

type DatepickerTimeHoursType = {
  onClick: (e: SyntheticEvent<*>) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<*>) => void
};

/**
 * Render date field
 */
const DatepickerTimeHours = ({
  onClick,
  onKeyDown
}: DatepickerTimeHoursType) => {
  const hours = [
    ["00", "01", "02", "03"],
    ["04", "05", "06", "07"],
    ["08", "09", "10", "11"],
    ["12", "13", "14", "15"],
    ["16", "17", "18", "19"],
    ["20", "21", "22", "23"]
  ];

  return (
    <DatepickerTable className="datepicker-time datepicker-hours">
      <tbody>
        {hours.map((hourRow, i) => (
          <tr key={i}>
            {hourRow.map(hour => (
              <td
                key={`hour-${hour}`}
                className="datepicker-hour"
                data-value={hour}
                role="gridcell"
                tabIndex="-1"
                onClick={onClick}
                onKeyDown={onKeyDown}
              >
                {hour}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </DatepickerTable>
  );
};

export default DatepickerTimeHours;
