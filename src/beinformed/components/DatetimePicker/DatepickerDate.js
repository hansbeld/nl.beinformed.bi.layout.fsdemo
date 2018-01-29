// @flow
import React, { Component } from "react";

import {
  DateUtil,
  ISO_TIMESTAMP_FORMAT
} from "beinformed/utils/datetime/DateTimeUtil";
import DatepickerDateDays from "beinformed/components/DatetimePicker/DatepickerDateDays";
import DatepickerDateDecades from "beinformed/components/DatetimePicker/DatepickerDateDecades";
import DatepickerDateMonths from "beinformed/components/DatetimePicker/DatepickerDateMonths";
import DatepickerDateToolbar from "beinformed/components/DatetimePicker/DatepickerDateToolbar";
import DatepickerDateYears from "beinformed/components/DatetimePicker/DatepickerDateYears";

import "./DatepickerDate.scss";

type DatepickerDateProps = {
  date: string,
  maxdate?: ?string,
  mindate?: ?string,
  outputFormat: string,
  onClick: (date: string) => void
};

type DatepickerDateState = {
  type: string,
  date: string
};

/**
 * Render date field
 */
class DatepickerDate extends Component<
  DatepickerDateProps,
  DatepickerDateState
> {
  _table: ?HTMLTableElement;

  static defaultProps = {
    value: ""
  };

  constructor(props: DatepickerDateProps) {
    super(props);

    this.state = {
      type: "days",
      date: DateUtil.toISO(props.date, ISO_TIMESTAMP_FORMAT)
    };
  }

  /**
   * Receive date information
   */
  componentWillReceiveProps(nextProps: DatepickerDateProps) {
    this.setState({
      date: nextProps.date
    });
  }

  /**
   * Process picked value, depending on view type
   */
  handleDatepickerClick = (value: string) => {
    if (this.state.type === "days") {
      this.props.onClick(DateUtil.toFormat(value, this.props.outputFormat));
    } else if (this.state.type === "months") {
      this.setState({
        type: "days",
        date: value
      });
    } else if (this.state.type === "years") {
      this.setState({
        type: "months",
        date: value
      });
    } else if (this.state.type === "decades") {
      this.setState({
        type: "years",
        date: value
      });
    } else {
      this.props.onClick(DateUtil.toFormat(value, this.props.outputFormat));
    }

    if (this.state.type !== "days") {
      const FOCUSNEWTABLE_TIMEOUT = 100;

      setTimeout(() => {
        if (this._table) {
          this._table.focus();
        }
      }, FOCUSNEWTABLE_TIMEOUT);
    }
  };

  /**
   * Process a toolbar change (next / prev)
   */
  handleToolbarChange = (value: string) => {
    this.setState({
      date: value
    });
  };

  /**
   * Switched date view (days, months, years, etc)
   */
  handleToolbarSwitch = (value: "days" | "months" | "years" | "decades") => {
    this.setState({
      type: value
    });
  };

  /**
   * Set new date from keydown
   */
  handleCalKeyDown = (newDate: string) => {
    this.setState({
      date: newDate
    });
  };

  render() {
    const calendarMap = {
      days: DatepickerDateDays,
      months: DatepickerDateMonths,
      years: DatepickerDateYears,
      decades: DatepickerDateDecades
    };

    const DatepickerPeriod = calendarMap[this.state.type];

    return (
      <div className="datepicker-date">
        <DatepickerDateToolbar
          date={this.state.date}
          type={this.state.type}
          onChange={this.handleToolbarChange}
          onSwitch={this.handleToolbarSwitch}
        />
        <DatepickerPeriod
          ref={c => {
            this._table = c;
          }}
          type={this.state.type}
          date={this.state.date}
          mindate={this.props.mindate}
          maxdate={this.props.maxdate}
          onClick={this.handleDatepickerClick}
          onCalKeyDown={this.handleCalKeyDown}
        />
      </div>
    );
  }
}

export default DatepickerDate;
