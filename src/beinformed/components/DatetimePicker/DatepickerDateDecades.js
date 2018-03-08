// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";
import DatepickerTable from "beinformed/components/DatetimePicker/DatepickerTable";
import DatepickerTableCell from "beinformed/components/DatetimePicker/DatepickerTableCell";
import { KEYCODES } from "beinformed/constants/Constants";

type DatepickerDateDecadesProps = {
  date: string,
  maxdate: string,
  mindate: string,
  onCalKeyDown: (value: string) => void,
  onClick: (value: string) => void
};

/**
 * Render date field
 */
class DatepickerDateDecades extends Component<DatepickerDateDecadesProps> {
  _table: ?DatepickerTable;

  /**
   * Triggered when a year is picked
   */
  handleSelect = (e: SyntheticEvent<*>) => {
    const element = e.target;
    if (element instanceof HTMLDivElement) {
      this.props.onClick(element.dataset.value);
    }
  };

  /**
   * Handles keydown on calendar
   */
  handleKeyDown = (e: SyntheticKeyboardEvent<*>) => {
    const YEARS_IN_CENTURY = 100;
    const YEARS_IN_DECADE = 10;
    const YEARS_AROUND_CENTURY = 30;

    const keyMap = {
      [KEYCODES.ARROW_LEFT]: DateUtil.subtractYears(
        this.props.date,
        YEARS_IN_DECADE
      ),
      [KEYCODES.ARROW_RIGHT]: DateUtil.addYears(
        this.props.date,
        YEARS_IN_DECADE
      ),
      [KEYCODES.ARROW_DOWN]: DateUtil.addYears(
        this.props.date,
        YEARS_AROUND_CENTURY
      ),
      [KEYCODES.ARROW_UP]: DateUtil.subtractYears(
        this.props.date,
        YEARS_AROUND_CENTURY
      ),
      [KEYCODES.PAGE_UP]: DateUtil.subtractYears(
        this.props.date,
        YEARS_IN_CENTURY
      ),
      [KEYCODES.PAGE_DOWN]: DateUtil.addYears(this.props.date, YEARS_IN_CENTURY)
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
  getDecades() {
    const YEARS_IN_CENTURY = 100;
    const YEARS_IN_DECADE = 10;
    const YEARS_IN_TABLE = 120;
    const YEARS_AROUND_CENTURY = 30;

    const decades = [];
    const year = parseInt(DateUtil.toFormat(this.props.date, "YYYY"), 10);
    const startDecade = year - year % YEARS_IN_CENTURY - YEARS_IN_DECADE;

    for (
      let i = startDecade;
      i < startDecade + YEARS_IN_TABLE;
      i += YEARS_AROUND_CENTURY
    ) {
      const decadeGroup = [];

      for (
        let j = i;
        j < parseInt(i, 10) + YEARS_AROUND_CENTURY;
        j += YEARS_IN_DECADE
      ) {
        decadeGroup.push(j);
      }
      decades.push(decadeGroup);
    }

    return decades;
  }

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
    const decades = this.getDecades();

    const NEXT_CENTURY_ROW = 3;
    const NEXT_CENTURY_COL = 2;

    const PREV_CENTURY = decades[0][0];
    const NEXT_CENTURY = decades[NEXT_CENTURY_ROW][NEXT_CENTURY_COL];

    return (
      <DatepickerTable
        ref={c => {
          this._table = c;
        }}
        className="datepicker-calendar datepicker-decades"
        onKeyDown={this.handleKeyDown}
      >
        <tbody>
          {decades.map((decadeGroup, idx) => (
            <tr key={idx}>
              {decadeGroup.map(d => {
                const decade = DateUtil.setYear(this.props.date, d);
                const isOtherCentury = [PREV_CENTURY, NEXT_CENTURY].includes(
                  decade
                );

                const YEARS_IN_DECADE = 10;
                const decadeClass = classNames("datepicker-year", {
                  "datepicker-otherdecade": isOtherCentury,
                  "datepicker-disabled":
                    DateUtil.isBefore(decade, this.props.mindate) ||
                    DateUtil.isAfter(decade, this.props.maxdate)
                });
                const startDecade = decade;
                const endDecade = DateUtil.addYears(decade, YEARS_IN_DECADE);
                const hasFocus =
                  DateUtil.isSameOrAfter(
                    this.props.date,
                    startDecade,
                    "YYYY-MM-DD",
                    "year"
                  ) &&
                  DateUtil.isSameOrBefore(
                    this.props.date,
                    endDecade,
                    "YYYY-MM-DD",
                    "year"
                  );

                return (
                  <DatepickerTableCell
                    key={decade}
                    className={decadeClass}
                    value={DateUtil.toFormat(decade, "YYYY")}
                    hasFocus={hasFocus}
                    onClick={this.handleSelect}
                  >
                    {`${DateUtil.toFormat(
                      startDecade,
                      "YYYY"
                    )} - ${DateUtil.toFormat(endDecade, "YYYY")}`}
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

export default DatepickerDateDecades;
