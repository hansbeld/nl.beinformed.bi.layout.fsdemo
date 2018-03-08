// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";
import DatepickerTable from "beinformed/components/DatetimePicker/DatepickerTable";
import DatepickerTableCell from "beinformed/components/DatetimePicker/DatepickerTableCell";
import { KEYCODES } from "beinformed/constants/Constants";

type DatepickerDateYearsProps = {
  date: string,
  maxdate: string,
  mindate: string,
  onCalKeyDown: (value: string) => void,
  onClick: (value: string) => void
};

/**
 * Render date field
 */
class DatepickerDateYears extends Component<DatepickerDateYearsProps> {
  _table: ?DatepickerTable;

  /**
   * Triggered when a year is picked
   */
  handleSelect = (e: SyntheticEvent<*>) => {
    if (e.target instanceof HTMLElement) {
      const year = e.target.dataset.value;
      this.props.onClick(DateUtil.toFormat(year, "YYYY"));
    }
  };

  /**
   * Handles keydown on calendar
   */
  handleKeyDown = (e: SyntheticKeyboardEvent<*>) => {
    const YEARS_IN_DECADE = 10;
    const YEARS_PER_ROW = 3;

    const keyMap = {
      [KEYCODES.ARROW_LEFT]: DateUtil.subtractYears(this.props.date, 1),
      [KEYCODES.ARROW_RIGHT]: DateUtil.addYears(this.props.date, 1),
      [KEYCODES.ARROW_DOWN]: DateUtil.addYears(this.props.date, YEARS_PER_ROW),
      [KEYCODES.ARROW_UP]: DateUtil.subtractYears(
        this.props.date,
        YEARS_PER_ROW
      ),
      [KEYCODES.PAGE_UP]: DateUtil.subtractYears(
        this.props.date,
        YEARS_IN_DECADE
      ),
      [KEYCODES.PAGE_DOWN]: DateUtil.addYears(this.props.date, YEARS_IN_DECADE)
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
   * Retrieve array of arrays with years to render
   * @return {Array}
   */
  getYears() {
    const DECADE_YEARS = 10;
    const MONTHS_IN_YEAR = 12;
    const CELLS_AROUND_YEARS = 3;

    const years = [];
    const year = parseInt(DateUtil.toFormat(this.props.date, "YYYY"), 10);
    const startYear = year - year % DECADE_YEARS - 1;

    for (
      let i = startYear;
      i < startYear + MONTHS_IN_YEAR;
      i += CELLS_AROUND_YEARS
    ) {
      const yearGroup = [];

      for (let j = i; j < parseInt(i, 10) + CELLS_AROUND_YEARS; j++) {
        yearGroup.push(j);
      }
      years.push(yearGroup);
    }

    return years;
  }

  /**
   * Set focus on table
   */
  focus() {
    if (this._table) {
      this._table.focus();
    }
  }

  getYearClass(date: string, PREV_DECADE: number, NEXT_DECADE: number) {
    return classNames("datepicker-year", {
      "datepicker-otherdecade": [PREV_DECADE, NEXT_DECADE].includes(date),
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
    const years = this.getYears();

    const NEXT_DECADE_ROW = 3;
    const NEXT_DECADE_COL = 2;

    const PREV_DECADE = years[0][0];
    const NEXT_DECADE = years[NEXT_DECADE_ROW][NEXT_DECADE_COL];

    // render as text field, as the input[type=date] of bootstrap is a bit big on webkit
    return (
      <DatepickerTable
        ref={c => {
          this._table = c;
        }}
        className="datepicker-calendar datepicker-years"
        onKeyDown={this.handleKeyDown}
      >
        <tbody>
          {years.map((yearGroup, idx) => (
            <tr key={idx}>
              {yearGroup.map(y => {
                const year = DateUtil.setYear(this.props.date, y);

                return (
                  <DatepickerTableCell
                    key={year}
                    className={this.getYearClass(
                      year,
                      PREV_DECADE,
                      NEXT_DECADE
                    )}
                    value={DateUtil.toFormat(year, "YYYY")}
                    hasFocus={DateUtil.isSame(
                      year,
                      this.props.date,
                      "YYYY-MM-DD",
                      "year"
                    )}
                    onClick={this.handleSelect}
                  >
                    {DateUtil.toFormat(year, "YYYY")}
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

export default DatepickerDateYears;
