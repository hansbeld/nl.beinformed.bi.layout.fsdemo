// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";

import MinusIcon from "mdi-react/MinusIcon";
import PlusIcon from "mdi-react/PlusIcon";

import "./UpDownNumberInput.scss";

type UpDownNumberInputProps = {
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
  minValue?: number,
  maxValue?: number,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<*>) => void,
  onKeyUp?: (e: SyntheticKeyboardEvent<*>) => void
};

/**
 * Render default text input
 */
class UpDownNumberInput extends PureComponent<UpDownNumberInputProps> {
  _input: ?HTMLInputElement;

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

  handleUpDown(up: boolean, minValue: number, maxValue: number) {
    if (isNaN(this.props.value) || this.props.value === "") {
      return this.props.onChange(minValue);
    }

    let newValue = up
      ? parseInt(this.props.value, 10) + 1
      : parseInt(this.props.value, 10) - 1;

    if (newValue > parseInt(maxValue, 10)) {
      newValue = minValue;
    } else if (newValue < parseInt(minValue, 10)) {
      newValue = maxValue;
    }

    return this.props.onChange(newValue.toString());
  }

  render() {
    const {
      className,
      inError,
      ariaLabel,
      ariaLabelledBy,
      minValue,
      maxValue,
      onChange,
      ...inputProps
    } = this.props;
    const inputClass = classNames("form-control", className, {
      "form-control-danger": inError
    });

    let ariaLabelledByProp = void 0;

    if (!ariaLabel) {
      ariaLabelledByProp =
        ariaLabelledBy || `${this.props.id || this.props.name}-label`;
    }
    // let ariaLabelledByProp = void 0;
    const id = this.props.id || this.props.name;

    return (
      <div className="UpDownNumberInput">
        <button
          className="btn btn-minus"
          type="button"
          onClick={() => this.handleUpDown(false, minValue, maxValue)}
        >
          <MinusIcon />
        </button>

        <input
          id={id}
          type="text"
          className={inputClass}
          placeholder="Term in years"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledByProp}
          onChange={e => onChange(e.target.value)}
          {...inputProps}
        />
        <button
          className="btn btn-plus"
          type="button"
          onClick={() => this.handleUpDown(true, minValue, maxValue)}
        >
          <PlusIcon />
        </button>
      </div>
    );
  }
}
export default UpDownNumberInput;
