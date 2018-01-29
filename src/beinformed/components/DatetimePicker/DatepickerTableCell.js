// @flow
import React from "react";
import classNames from "classnames";

type DatepickerTableCellType = {
  children?: any,
  className?: string,
  hasFocus: boolean,
  value: string,
  onClick: (e: SyntheticEvent<*>) => void,
  onKeyDown?: (value: SyntheticKeyboardEvent<*>) => void
};

/**
 * Renders table cell in datepicker table
 */
const DatepickerTableCell = ({
  children,
  className,
  hasFocus,
  value,
  onClick,
  onKeyDown
}: DatepickerTableCellType) => {
  const cellClass = classNames(className, {
    focus: hasFocus
  });

  return (
    <td
      className={cellClass}
      onClick={onClick}
      onKeyDown={onKeyDown}
      data-value={value}
      role="gridcell"
      tabIndex="-1"
    >
      {children}
    </td>
  );
};

export default DatepickerTableCell;
