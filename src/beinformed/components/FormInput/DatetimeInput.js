// @flow
import React, { Component } from "react";

import Button from "beinformed/components/Button/Button";
import DatetimePicker from "beinformed/components/DatetimePicker/DatetimePicker";
import TextInput from "beinformed/components/FormInput/TextInput";
import Icon from "beinformed/components/Icon/Icon";
import { ISO_DATE_FORMAT } from "beinformed/constants/Constants";
import { Message } from "beinformed/containers/I18n/Message";

import "./DatetimeInput.scss";

type DatetimeInputProps = {
  ariaLabel?: string,
  ariaLabelledBy?: string,
  children?: any,
  className?: string,
  disabled?: boolean,
  format: string,
  id?: string,
  inError?: boolean,
  maxdate?: string | null,
  mindate?: string | null,
  name: string,
  placeholder?: string,
  readOnly?: boolean,
  value: string,
  prepend?: any,
  append?: any,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

type DatetimeInputState = {
  showDateTimePicker: boolean
};

/**
 * Render date time input
 */
class DatetimeInput extends Component<DatetimeInputProps, DatetimeInputState> {
  _clickOnPicker: boolean;
  _datetimePicker: ?DatetimePicker;
  _input: ?TextInput;

  static defaultProps = {
    value: "",
    format: ISO_DATE_FORMAT
  };

  /**
   * Construct
   */
  constructor(props: DatetimeInputProps) {
    super(props);

    this.state = {
      showDateTimePicker: false
    };

    this._clickOnPicker = false;
  }

  /**
   * componentWillUnmount, removes document wide click event observer
   */
  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
  }

  handleDocumentClick = () => {
    if (this._clickOnPicker) {
      this._clickOnPicker = false;

      return;
    }

    this.setState({
      showDateTimePicker: false
    });

    document.removeEventListener("click", this.handleDocumentClick);
  };

  /**
   * Display the datetimepicker
   */
  handleDatePickerButtonClick = (e: SyntheticEvent<*>) => {
    e.preventDefault();

    this.setState({
      showDateTimePicker: !this.state.showDateTimePicker
    });

    document.addEventListener("click", this.handleDocumentClick, false);
  };

  /**
   * Process a date change and hide datetimepicker
   */
  handleDateSelect = (date: string) => {
    this.props.onChange(date);

    this.setState({
      showDateTimePicker: false
    });
    document.removeEventListener("click", this.handleDocumentClick);

    if (this._input) {
      this._input.focus();
    }
  };

  get hasDate(): boolean {
    return /[YMD]/g.test(this.props.format);
  }

  get hasTime(): boolean {
    return /[Hms]/g.test(this.props.format);
  }

  /**
   * Process a date change through the input element
   */
  handleChange = (inputvalue: string) => {
    this.handleDateSelect(inputvalue);
  };

  datetimeButton(hasDatetimePicker: boolean) {
    if (hasDatetimePicker) {
      return (
        <Button
          name="datetimePickerButton"
          className="date-button"
          type="button"
          onClick={this.handleDatePickerButtonClick}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        >
          <Icon name={this.hasDate ? "calendar" : "clock-o"} />
          <Message
            id="DateTimeInput.ButtonLabel"
            defaultLabel="Pick a date"
            screenreaderOnly
          />
        </Button>
      );
    }

    return null;
  }

  renderAppendItems(hasDatetimePicker: boolean) {
    const { append } = this.props;
    const dtButton = this.datetimeButton(hasDatetimePicker);

    if (append && Array.isArray(append)) {
      return [...append, dtButton];
    } else if (append) {
      return [append, dtButton];
    }
    return dtButton;
  }

  render() {
    const { mindate, maxdate, ...props } = this.props;

    const hasDatetimePicker =
      !this.props.readOnly && (this.hasDate || this.hasTime);

    return (
      <TextInput
        ref={c => {
          this._input = c;
        }}
        {...props}
        append={this.renderAppendItems(hasDatetimePicker)}
        onChange={this.handleChange}
      >
        {hasDatetimePicker &&
          this.state.showDateTimePicker && (
            <DatetimePicker
              ref={c => {
                this._datetimePicker = c;
              }}
              date={this.props.value}
              mindate={mindate}
              maxdate={maxdate}
              format={this.props.format}
              onClick={() => {
                this._clickOnPicker = true;
              }}
              onSelect={inputvalue => this.handleDateSelect(inputvalue || "")}
            />
          )}

        {this.props.children}
      </TextInput>
    );
  }
}

export default DatetimeInput;
