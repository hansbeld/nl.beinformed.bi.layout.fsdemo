// @flow
import React, { Component } from "react";

import ArrowLeftIcon from "mdi-react/ArrowLeftIcon";
import ArrowRightIcon from "mdi-react/ArrowRightIcon";

import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";
import { withMessage } from "beinformed/containers/I18n/Message";
import { KEYCODES } from "beinformed/constants/Constants";

import "./DatepickerDateToolbar.scss";

type DatepickerDateToolbarProps = {
  date: string,
  message: messageFunctionType,
  type: "days" | "months" | "years" | "decades",
  onChange: (value: string) => void,
  onSwitch: (value: "days" | "months" | "years" | "decades") => void
};

/**
 * Render date field
 */
class DatepickerDateToolbar extends Component<DatepickerDateToolbarProps> {
  static defaultProps = {
    type: "days"
  };

  /**
   * Method triggered when next button is clicked
   */
  handleNext = () => {
    this.calcNewPeriod("next");
  };

  /**
   * Handle Keydown on next button
   */
  handleNextKeydown = (e: KeyboardEvent) => {
    if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
      e.preventDefault();
      this.calcNewPeriod("next");
    }
  };

  /**
   * Method triggered when prev buttons is clicked
   */
  handlePrevious = () => {
    this.calcNewPeriod("prev");
  };

  /**
   * Handle Keydown on previous button
   * @param  {SytheticEvent} e - event data
   */

  handlePreviousKeydown = (e: KeyboardEvent) => {
    if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
      e.preventDefault();
      this.calcNewPeriod("prev");
    }
  };

  /**
   * Method triggered when switch button is clicked
   */
  handleSwitch = () => {
    const typeMap = {
      days: "months",
      months: "years",
      years: "decades",
      decades: "days"
    };

    this.props.onSwitch(typeMap[this.props.type]);
  };

  /**
   * Handle Keydown on switch button
   * @param  {SytheticEvent} e - event data
   */

  handleSwitchKeydown = e => {
    if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
      e.preventDefault();
      this.handleSwitch();
    }
  };

  /**
   * Calulates a new period based on the direction, next or previous (period)
   */
  calcNewPeriod(direction: "next" | "prev") {
    const DECADE_YEARS = 120;
    const YEARS = 12;
    const YEAR = 1;
    const MONTH = 1;

    const calcMethods = {
      next: {
        decades: DateUtil.addYears(this.props.date, DECADE_YEARS),
        years: DateUtil.addYears(this.props.date, YEARS),
        months: DateUtil.addYears(this.props.date, YEAR),
        days: DateUtil.addMonths(this.props.date, MONTH)
      },
      prev: {
        decades: DateUtil.subtractYears(this.props.date, DECADE_YEARS),
        years: DateUtil.subtractYears(this.props.date, YEARS),
        months: DateUtil.subtractYears(this.props.date, YEAR),
        days: DateUtil.subtractMonths(this.props.date, MONTH)
      }
    };

    this.props.onChange(calcMethods[direction][this.props.type]);
  }

  /**
   * Label to render on the switch button
   * @return {string}
   */
  _switchLabel() {
    const CENTURY_YEARS = 100;
    const DECADE_YEARS = 10;

    const year = parseInt(DateUtil.toFormat(this.props.date, "YYYY"), 10);

    switch (this.props.type) {
      case "decades": {
        const startCentury = year - year % CENTURY_YEARS;
        const endCentury = startCentury + CENTURY_YEARS;

        return `${startCentury} - ${endCentury}`;
      }
      case "years": {
        const startDecade = year - year % DECADE_YEARS;
        const endDecade = startDecade + DECADE_YEARS;

        return `${startDecade} - ${endDecade}`;
      }
      case "months":
        return year;
      default:
        return DateUtil.toFormat(this.props.date, "MMMM YYYY");
    }
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className="datepicker-toolbar">
        <div className="datepicker-btn-prev">
          <button
            type="button"
            className="btn btn-light"
            aria-label={this.props.message("DatePicker.previous", "Previous")}
            onClick={this.handlePrevious}
            onKeyDown={this.handlePreviousKeydown}
          >
            <ArrowLeftIcon />
          </button>
        </div>
        <div className="datepicker-btn-switch">
          <button
            type="button"
            className="btn btn-light"
            onClick={this.handleSwitch}
            onKeyDown={this.handleSwitchKeydown}
          >
            {this._switchLabel()}
          </button>
        </div>
        <div className="datepicker-btn-next">
          <button
            type="button"
            className="btn btn-light"
            aria-label={this.props.message("DatePicker.next", "Next")}
            onClick={this.handleNext}
            onKeyDown={this.handleNextKeydown}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    );
  }
}

export default withMessage(DatepickerDateToolbar);
