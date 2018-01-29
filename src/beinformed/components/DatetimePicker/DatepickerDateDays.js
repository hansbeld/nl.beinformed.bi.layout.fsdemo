// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";
import DatepickerTable from "beinformed/components/DatetimePicker/DatepickerTable";
import DatepickerTableCell from "beinformed/components/DatetimePicker/DatepickerTableCell";
import { KEYCODES } from "beinformed/constants/Constants";

type DatepickerDateDaysProps = {
  date: string,
  maxdate: string,
  mindate: string,
  onCalKeyDown: (value: string) => void,
  onClick: (value: string) => void
};

/**
 * Render date field
 */
class DatepickerDateDays extends Component<DatepickerDateDaysProps> {
  _table: ?DatepickerTable;

  /**
   * Method triggered when a date is picked
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
    const keyMap = {
      [KEYCODES.ARROW_LEFT]: DateUtil.subtractDays(this.props.date, 1),
      [KEYCODES.ARROW_RIGHT]: DateUtil.addDays(this.props.date, 1),
      [KEYCODES.ARROW_DOWN]: DateUtil.addWeeks(this.props.date, 1),
      [KEYCODES.ARROW_UP]: DateUtil.subtractWeeks(this.props.date, 1),
      [KEYCODES.PAGE_UP]: DateUtil.subtractMonths(this.props.date, 1),
      [KEYCODES.PAGE_DOWN]: DateUtil.addMonths(this.props.date, 1)
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
   * Create range of 6 weeks;
   * @return {number[]}
   */
  getWeeks() {
    const firstDayOfMonth = DateUtil.startOfMonth(this.props.date);
    const firstDayOfFirstWeek = DateUtil.startOfWeek(firstDayOfMonth);

    const WEEK_ROWS = 6;
    const DAYS_IN_WEEK = 7;
    const weeks = [];

    for (let i = 0; i < WEEK_ROWS; i++) {
      const week = DateUtil.addWeeks(firstDayOfFirstWeek, i);

      const days = [];
      for (let j = 0; j < DAYS_IN_WEEK; j++) {
        days.push(DateUtil.addDays(week, j));
      }

      weeks.push({
        number: DateUtil.getWeek(week),
        days
      });
    }

    return weeks;
  }

  /**
   * Set focus on table
   */
  focus() {
    if (this._table) {
      this._table.focus();
    }
  }

  getDayClass(date: string) {
    return classNames("datepicker-day btn-light", {
      "datepicker-today": date === DateUtil.now(),
      "datepicker-weekend": DateUtil.isWeekend(date),
      "datepicker-othermonth": DateUtil.isOther(
        date,
        this.props.date,
        "YYYY-MM-DD",
        "month"
      ),
      "datepicker-disabled":
        DateUtil.isBefore(date, this.props.mindate) ||
        DateUtil.isAfter(date, this.props.maxdate)
    });
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <DatepickerTable
        ref={c => {
          this._table = c;
        }}
        className="datepicker-calendar datepicker-days"
        onKeyDown={this.handleKeyDown}
      >
        <thead>
          <tr>
            <th className="datepicker-dayname">Mo</th>
            <th className="datepicker-dayname">Tu</th>
            <th className="datepicker-dayname">We</th>
            <th className="datepicker-dayname">Th</th>
            <th className="datepicker-dayname">Fr</th>
            <th className="datepicker-dayname datepicker-weekend">Sa</th>
            <th className="datepicker-dayname datepicker-weekend">Su</th>
          </tr>
        </thead>
        <tbody>
          {this.getWeeks().map(week => (
            <tr className="datepicker-week" key={week.number}>
              {week.days.map(day => (
                <DatepickerTableCell
                  key={`${week.number}-${day}`}
                  className={this.getDayClass(day)}
                  value={day}
                  hasFocus={day === this.props.date}
                  onClick={this.handleSelect}
                >
                  {DateUtil.toFormat(day, "D")}
                </DatepickerTableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </DatepickerTable>
    );
  }
}

export default DatepickerDateDays;
