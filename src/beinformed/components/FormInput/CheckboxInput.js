// @flow
import React from "react";
import classNames from "classnames";

type CheckboxInputProps = {
  children?: any,
  className?: string,
  count?: number | null,
  disabled?: boolean,
  id: string,
  isChecked: boolean,
  stacked?: boolean,
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
 * Render a {@see https://facebook.github.io/react/docs/forms.html#uncontrolled-components|controlled} checkbox input with label
 * behind the checkbox
 */
const CheckboxInput = ({
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
}: CheckboxInputProps) => {
  const controlClass = classNames(
    "custom-control",
    "custom-checkbox",
    className,
    { "custom-control-inline": !stacked }
  );
  const inputClass = classNames("custom-control-input", {
    "is-invalid": inError
  });
  const htmlFor = `${id || name}-${value}`;

  return (
    <div className={controlClass} data-value={value}>
      <input
        className={inputClass}
        type="checkbox"
        id={htmlFor}
        name={name}
        value={value}
        disabled={disabled || readOnly}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        checked={isChecked}
        data-count={count}
      />
      <label
        className="custom-control-label"
        htmlFor={htmlFor}
        data-value={value}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default CheckboxInput;
