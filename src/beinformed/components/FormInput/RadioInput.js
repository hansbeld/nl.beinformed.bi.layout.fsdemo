// @flow
import React from "react";
import classNames from "classnames";

type RadioInputProps = {
  children?: any,
  className?: string,
  count?: number | null,
  disabled?: boolean,
  id: string,
  isChecked: boolean,
  stacked: boolean,
  label: string,
  name: string,
  readOnly?: boolean,
  value: string,
  inError?: boolean,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onChange: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render radio input
 */
const RadioInput = ({
  children,
  className,
  count,
  disabled,
  id,
  isChecked,
  stacked,
  label,
  name,
  readOnly,
  value = "",
  inError,
  onBlur,
  onChange,
  onFocus
}: RadioInputProps) => {
  const controlClass = classNames("custom-control", "custom-radio", className, {
    "custom-control-inline": !stacked
  });
  const inputClass = classNames("custom-control-input", {
    "is-invalid": inError
  });
  const htmlFor = `${id || name}-${value}`;

  return (
    <div className={controlClass} data-value={value}>
      <input
        className={inputClass}
        id={htmlFor}
        type="radio"
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        // onClick={e => (onClick ? onClick(e.target.value) : void 0)}
        onBlur={onBlur}
        onFocus={onFocus}
        checked={isChecked}
        data-count={count}
        disabled={disabled || readOnly}
        aria-labelledby={`${htmlFor}-label`}
      />
      <label
        className="custom-control-label"
        htmlFor={htmlFor}
        id={`${htmlFor}-label`}
        data-value={value}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default RadioInput;
