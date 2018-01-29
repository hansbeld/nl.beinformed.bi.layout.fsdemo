// @flow
import React, { Component } from "react";
import classNames from "classnames";

import InputPrepend from "beinformed/components/FormInputGroup/InputPrepend";
import InputAppend from "beinformed/components/FormInputGroup/InputAppend";
import InputGroup from "beinformed/components/FormInputGroup/InputGroup";

type TextInputProps = {
  ariaLabel?: string,
  ariaLabelledBy?: string,
  autoComplete?: "on" | "off" | "new-password",
  className?: string,
  disabled?: boolean,
  id?: string,
  inError?: boolean,
  name: string,
  placeholder?: string,
  append?: any,
  prepend?: any,
  readOnly?: boolean,
  type: string,
  value: string,
  autoFocus?: boolean,
  children?: any,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<*>) => void,
  onKeyUp?: (e: SyntheticKeyboardEvent<*>) => void
};

/**
 * Render default text input
 */
class TextInput extends Component<TextInputProps> {
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

  renderPreOrAppendItems(preOrAppendItems: any) {
    if (Array.isArray(preOrAppendItems)) {
      return preOrAppendItems.map(
        item =>
          typeof item === "string" ? (
            <span className="input-group-text">{item}</span>
          ) : (
            item
          )
      );
    }

    return typeof preOrAppendItems === "string" ? (
      <span className="input-group-text">{preOrAppendItems}</span>
    ) : (
      preOrAppendItems
    );
  }

  render() {
    const {
      className,
      inError,
      ariaLabel,
      ariaLabelledBy,

      prepend,
      append,

      readOnly,

      autoComplete,
      disabled,
      name,
      placeholder,
      type,
      value,
      autoFocus,

      children,

      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onKeyUp
    } = this.props;

    const inputClass = classNames("form-control", className, {
      "is-invalid": inError
    });

    const groupClass = className
      ? classNames({ [`${className}-group`]: className })
      : "";

    const id = this.props.id || name;

    return (
      <InputGroup readonly={readOnly} className={groupClass}>
        {prepend && (
          <InputPrepend>{this.renderPreOrAppendItems(prepend)}</InputPrepend>
        )}
        <input
          ref={c => {
            this._input = c;
          }}
          className={inputClass}
          id={id}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabel ? null : ariaLabelledBy || `${id}-label`}
          readOnly={readOnly}
          autoComplete={autoComplete}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          autoFocus={autoFocus}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onChange={e => onChange(e.target.value)}
        />
        {append && (
          <InputAppend>{this.renderPreOrAppendItems(append)}</InputAppend>
        )}
        {children}
      </InputGroup>
    );
  }
}

export default TextInput;
