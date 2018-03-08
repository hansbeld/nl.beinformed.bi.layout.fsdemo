// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";
import DatepickerTable from "beinformed/components/DatetimePicker/DatepickerTable";
import DatepickerTableCell from "beinformed/components/DatetimePicker/DatepickerTableCell";
import { KEYCODES } from "beinformed/constants/Constants";

type DatepickerDateMonthsProps = {
  date: string,
  maxdate: string,
  mindate: string,
  onCalKeyDown: (value: string) => void,
  onClick: (value: string) => void
};

/**
 * Render date field
 */
class DatepickerDateMonths extends Component<DatepickerDateMonthsProps> {
  _table: ?DatepickerTable;

  /**
   * Method triggered when a month is picked
   */
  handleSelect = (e: SyntheticEvent<*>) => {
    if (e.target instanceof HTMLElement) {
      this.props.onClick(e.target.dataset.value);
    }
  };

  /**
   * Handles keydown on calendar
   */
  handleKeyDown = (e: SyntheticKeyboardEvent<*>) => {
    const MONTHS_PER_ROW = 3;

    const keyMap = {
      [KEYCODES.ARROW_LEFT]: DateUtil.subtractMonths(this.props.date, 1),
      [KEYCODES.ARROW_RIGHT]: DateUtil.addMonths(this.props.date, 1),
      [KEYCODES.ARROW_DOWN]: DateUtil.addMonths(
        this.props.date,
        MONTHS_PER_ROW
      ),
      [KEYCODES.ARROW_UP]: DateUtil.subtractMonths(
        this.props.date,
        MONTHS_PER_ROW
      ),
      [KEYCODES.PAGE_UP]: DateUtil.subtractYears(this.props.date, 1),
      [KEYCODES.PAGE_DOWN]: DateUtil.addYears(this.props.date, 1)
    };

    if (e.keyCode === KEYCODES.SPACE || e.keyCode === KEYCODES.ENTER) {
      e.preventDefault();
      this.props.onClick(keyMap[e.keyCode]);
    } else if (keyMap[e.keyCode]) {
      e.preventDefault();
      this.props.onCalKeyDown(keyMap[e.keyCode]);
    }
  };

  /**
   * Set focus on table
   */
  focus() {
    if (this._table) {
      this._table.focus();
    }
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const months = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]]; // eslint-disable-line no-magic-numbers

    return (
      <DatepickerTable
        ref={c => {
          this._table = c;
        }}
        className="datepicker-calendar datepicker-months"
        onKeyDown={this.handleKeyDown}
      >
        <tbody>
          {months.map((monthGroup, idx) => (
            <tr key={idx}>
              {monthGroup.map(m => {
                const month = DateUtil.setMonth(this.props.date, m);
                const monthClass = classNames("datepicker-month", {
                  "datepicker-disabled":
                    DateUtil.isBefore(month, this.props.mindate) ||
                    DateUtil.isAfter(month, this.props.maxdate)
                });

                return (
                  <DatepickerTableCell
                    key={DateUtil.toFormat(month, "YYYY-MM")}
                    className={monthClass}
                    value={DateUtil.toFormat(month, "YYYY-MM")}
                    hasFocus={DateUtil.isSame(
                      month,
                      this.props.date,
                      "YYYY-MM-DD",
                      "month"
                    )}
                    onClick={this.handleSelect}
                  >
                    {DateUtil.toFormat(month, "MMM")}
                  </DatepickerTableCell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </DatepickerTable>
    );
  }
}

export default DatepickerDateMonths;
