// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";

import TextInput from "beinformed/components/FormInput/TextInput";

import Dropdown from "beinformed/components/Dropdown/Dropdown";
import DropdownToggle from "beinformed/components/Dropdown/DropdownToggle";
import DropdownItem from "beinformed/components/Dropdown/DropdownItem";
import DropdownChildren from "beinformed/components/Dropdown/DropdownChildren";

import { Message, withMessage } from "beinformed/i18n";

import "./YearAmountInput.scss";

type YearAmountInputProps = {
  ariaLabel?: string,
  ariaLabelledBy?: string,
  autoComplete?: "on" | "off" | "new-password",
  children?: any,
  className?: string,
  disabled?: boolean,
  id?: string,
  inError?: boolean,
  name: string,
  placeholder?: string,
  postfix?: string,
  prefix?: string,
  readOnly?: boolean,
  type: string,
  value: string,
  autoFocus?: boolean,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<*>) => void,
  onKeyUp?: (e: SyntheticKeyboardEvent<*>) => void,
  message: any
};

type YearAmountInputState = {
  dropDownValue: string
};

const yearly = "yearly";
const monthly = "monthly";
const MONTHS_IN_YEAR = 12;

/**
 * Render default text input
 */
class YearAmountInput extends PureComponent<
  YearAmountInputProps,
  YearAmountInputState
> {
  _input: ?HTMLInputElement;

  constructor(props: YearAmountInputProps) {
    super(props);

    this.state = {
      dropDownValue: yearly
    };
  }

  static defaultProps = {
    type: "text",
    value: "",
    readOnly: false,
    disabled: false
  };

  /**
   * Set focus on input
   */
  focus() {
    setTimeout(() => {
      if (this._input) {
        this._input.focus();
      }
    }, 1);
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  isNumber(value: string) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  handlePeriodChange(period: string) {
    this.setState({ dropDownValue: period });

    if (this.isNumber(this.props.value) && period === monthly) {
      return this.props.onChange(
        (parseInt(this.props.value, 10) * MONTHS_IN_YEAR).toString()
      );
    }

    if (this.isNumber(this.props.value) && period === yearly) {
      return this.props.onChange(
        (parseInt(this.props.value, 10) / MONTHS_IN_YEAR).toString()
      );
    }

    return false;
  }

  dropdownToggle() {
    if (this.state.dropDownValue === yearly) {
      return this.props.message("YearAmountInput.Yearly", "Yearly");
    }
    return this.props.message("YearAmountInput.Monthly", "Monthly");
  }

  handleInputChange(value: string) {
    if (this.isNumber(value) && this.state.dropDownValue === monthly) {
      return this.props.onChange(
        (parseInt(value, 10) * MONTHS_IN_YEAR).toString()
      );
    }

    return this.props.onChange(value);
  }

  getValue(value: string) {
    if (this.isNumber(value) && this.state.dropDownValue === monthly) {
      const monthValue = parseInt(value, 10) / MONTHS_IN_YEAR;
      return monthValue.toString();
    }

    return value;
  }

  render() {
    const selectClass = classNames("select-field", {
      disabled: this.props.disabled,
      readonly: this.props.readOnly
    });

    return [
      <TextInput
        key="textinput"
        {...this.props}
        value={this.getValue(this.props.value)}
        onChange={newValue => this.handleInputChange(newValue)}
      />,
      <Dropdown
        key="dropdown"
        activeValue={this.state.dropDownValue}
        className={selectClass}
      >
        <DropdownToggle className="year-amount-toggle form-control">
          {this.state.dropDownValue === yearly ? (
            <Message id="YearAmountInput.Yearly" defaultMessage="Yearly" />
          ) : (
            <Message id="YearAmountInput.Monthly" defaultMessage="Monthly" />
          )}
        </DropdownToggle>
        <DropdownChildren>
          <DropdownItem
            id="yearlyItem"
            value={yearly}
            selected={this.state.dropDownValue === yearly}
            onClick={() => this.handlePeriodChange(yearly)}
          >
            <Message id="YearAmountInput.Yearly" defaultMessage="Yearly" />
          </DropdownItem>
          <DropdownItem
            id="monthlyItem"
            value={monthly}
            selected={this.state.dropDownValue === monthly}
            onClick={() => this.handlePeriodChange(monthly)}
          >
            <Message id="YearAmountInput.Monthly" defaultMessage="Monthly" />
          </DropdownItem>
        </DropdownChildren>
      </Dropdown>
    ];
  }
}

export default withMessage(YearAmountInput);
