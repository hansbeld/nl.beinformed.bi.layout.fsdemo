// @flow
import React, { Component } from "react";
import classNames from "classnames";

import {
  TimestampUtil,
  ISO_DATE_FORMAT
} from "beinformed/utils/datetime/DateTimeUtil";
import DatepickerDate from "beinformed/components/DatetimePicker/DatepickerDate";
import DatepickerTime from "beinformed/components/DatetimePicker/DatepickerTime";
import DatepickerToolbar from "beinformed/components/DatetimePicker/DatepickerToolbar";

import "./DatetimePicker.scss";

type DatetimePickerProps = {
  date: string,
  format: string,
  maxdate?: ?string,
  mindate?: ?string,
  onClick: () => void,
  onSelect: (date: string) => void
};

type DatetimePickerState = {
  hasDate: boolean,
  hasTime: boolean,
  type: "date" | "time",
  position: "left" | "right"
};

/**
 * Render date field
 */
class DatetimePicker extends Component<
  DatetimePickerProps,
  DatetimePickerState
> {
  _datetimePicker: ?HTMLDivElement;

  props: DatetimePickerProps;

  static defaultProps = {
    type: "date",
    format: ISO_DATE_FORMAT,
    onSelect: () => void 0
  };

  constructor(props: DatetimePickerProps) {
    super(props);

    const hasDate = /[YMD]/g.test(props.format);
    const hasTime = /[Hms]/g.test(props.format);

    this.state = {
      hasDate,
      hasTime,
      type: hasDate ? "date" : "time",
      position: "left"
    };
  }

  componentDidMount() {
    if (this._datetimePicker) {
      const boundingClientRect = this._datetimePicker.getBoundingClientRect();

      if (boundingClientRect.left < 0) {
        this.setState({
          position: "right"
        });
      }
    }
  }

  /**
   * Method triggered when switching from date to time and v.v.
   */
  handleSwitch = (type: "date" | "time") => {
    this.setState({
      type
    });
  };

  /**
   * Set focus on datepicker container
   */
  focus() {
    if (this._datetimePicker) {
      this._datetimePicker.focus();
    }
  }

  /**
   * Convert string date to moment date
   */
  toIso(value: string) {
    if (TimestampUtil.isValid(value, this.props.format)) {
      return TimestampUtil.toISO(value, this.props.format);
    }

    return TimestampUtil.now();
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const date = this.toIso(this.props.date);

    const datetimePickerClass = classNames(
      "dropdown-menu datetimepicker",
      `datetimepicker-pos-${this.state.position}`
    );

    return (
      <div
        ref={c => {
          this._datetimePicker = c;
        }}
        className={datetimePickerClass}
        onClick={this.props.onClick}
        onKeyDown={this.props.onClick}
        tabIndex="0"
        role="dialog"
        aria-label="Pick a date"
      >
        {this.state.hasDate &&
          this.state.type === "date" && (
            <DatepickerDate
              date={date}
              mindate={this.props.mindate}
              maxdate={this.props.maxdate}
              outputFormat={this.props.format}
              onClick={this.props.onSelect}
            />
          )}

        {this.state.hasTime &&
          this.state.type === "time" && (
            <DatepickerTime
              time={date}
              outputFormat={this.props.format}
              onConfirm={this.props.onSelect}
            />
          )}
        {this.state.hasDate &&
          this.state.hasTime && (
            <DatepickerToolbar
              datetime={date}
              type={this.state.type}
              onSwitch={this.handleSwitch}
            />
          )}
      </div>
    );
  }
}

export default DatetimePicker;
