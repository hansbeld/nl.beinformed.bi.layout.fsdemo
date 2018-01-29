// @flow
import React, { Component } from "react";

import {
  TimeUtil,
  ISO_TIMESTAMP_FORMAT
} from "beinformed/utils/datetime/DateTimeUtil";
import DatepickerTimeHours from "beinformed/components/DatetimePicker/DatepickerTimeHours";
import DatepickerTimeMinutes from "beinformed/components/DatetimePicker/DatepickerTimeMinutes";
import DatepickerTimeSeconds from "beinformed/components/DatetimePicker/DatepickerTimeSeconds";
import DatepickerTimeSelect from "beinformed/components/DatetimePicker/DatepickerTimeSelect";

import "./DatepickerTime.scss";

type DatepickerTimeProps = {
  outputFormat: string,
  time: string,
  onConfirm: (date: string) => void
};

type DatepickerTimeState = {
  time: string,
  type: "select" | "hours" | "minutes" | "seconds"
};

/**
 * Renders a standard attribute name value pairs
 */
class DatepickerTime extends Component<
  DatepickerTimeProps,
  DatepickerTimeState
> {
  /**
   * Construct datepicker time
   */
  constructor(props: DatepickerTimeProps) {
    super(props);

    this.state = {
      time: TimeUtil.toISO(props.time, ISO_TIMESTAMP_FORMAT),
      type: "select"
    };
  }

  /**
   * method triggered when time is confirmed to be correct
   */
  handleConfirm = (e: SyntheticEvent<*>) => {
    e.preventDefault();

    this.props.onConfirm(
      TimeUtil.toFormat(this.state.time, this.props.outputFormat)
    );
  };

  /**
   * On click method triggered when a time part is picked
   */
  handleClick = (e: SyntheticEvent<*>) => {
    if (e.target instanceof HTMLElement && this.state.type !== "select") {
      const value = parseInt(e.target.dataset.value, 10);

      const timeByType = {
        hours: TimeUtil.setHour(this.state.time, value),
        minutes: TimeUtil.setMinute(this.state.time, value),
        seconds: TimeUtil.setSecond(this.state.time, value),
        select: this.state.time
      };

      this.setState({
        type: "select",
        time: timeByType[this.state.type]
      });
    }
  };

  /**
   * Changing from select to hour, minute or second part
   */
  handlePartChange = (type: "select" | "hours" | "minutes" | "seconds") => {
    this.setState({
      type
    });
  };

  /**
   * Triggered when the time changes
   */
  handleTimeChange = (time: string) => {
    this.setState({
      time
    });
  };

  renderPart() {
    switch (this.state.type) {
      case "select":
        return (
          <DatepickerTimeSelect
            type="select"
            time={this.state.time}
            onConfirm={this.handleConfirm}
            onClick={this.handlePartChange}
            onChange={this.handleTimeChange}
          />
        );

      case "hours":
        return <DatepickerTimeHours type="hours" onClick={this.handleClick} />;

      case "minutes":
        return (
          <DatepickerTimeMinutes type="minutes" onClick={this.handleClick} />
        );

      case "seconds":
        return (
          <DatepickerTimeSeconds
            type="seconds"
            time={this.state.time}
            onClick={this.handleClick}
          />
        );

      default:
        return null;
    }
  }

  /**
   * render
   */
  render() {
    return <div className="datepicker-time">{this.renderPart()}</div>;
  }
}

export default DatepickerTime;
