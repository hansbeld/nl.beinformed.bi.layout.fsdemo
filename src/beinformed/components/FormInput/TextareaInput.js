// @flow
import React from "react";
import classNames from "classnames";

import InputGroup from "beinformed/components/FormInputGroup/InputGroup";

type TextareaInputProps = {
  ariaLabel?: string,
  ariaLabelledBy?: string,
  className?: string,
  disabled?: boolean,
  id: string,
  inError: boolean,
  name: string,
  placeholder?: string,
  readOnly?: boolean,
  rows?: number,
  value: string,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

const DEFAULT_TEXTAREA_ROWS = 5;

/**
 * Render default textarea
 */
const TextareaInput = ({
  ariaLabel,
  ariaLabelledBy,
  className,
  disabled,
  id,
  inError,
  name,
  placeholder,
  readOnly,
  rows = DEFAULT_TEXTAREA_ROWS,
  value = "",
  onBlur,
  onChange,
  onFocus
}: TextareaInputProps) => {
  const inputClass = classNames("form-control", className, {
    "is-invalid": inError
  });

  const groupClass = className
    ? classNames({ [`${className}-group`]: className })
    : "";

  let arLabelledBy = null;

  if (!ariaLabel) {
    arLabelledBy = ariaLabelledBy || `${id || name}-label`;
  }

  return (
    <InputGroup readonly={readOnly} className={groupClass}>
      <textarea
        className={inputClass}
        id={id || name}
        name={name}
        rows={rows}
        aria-label={ariaLabel}
        aria-labelledby={arLabelledBy}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
      />
    </InputGroup>
  );
};

export default TextareaInput;
