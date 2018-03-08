// @flow
import React from "react";
import classNames from "classnames";

import "./MultiRowTaskCheckbox.scss";

export type MultiRowTaskCheckboxProps = {
  className?: string,
  id: string,
  isChecked: boolean,
  value: number | string,
  children?: any,
  onChange: (value: number | string) => void
};

/**
 * Checkbox used for a multi row task list item
 */
const MultiRowTaskCheckbox = ({
  className,
  id,
  value,
  isChecked,
  children,
  onChange
}: MultiRowTaskCheckboxProps) => (
  <div
    className={classNames(
      "multi-row-task-checkbox custom-control custom-checkbox",
      className
    )}
  >
    <input
      type="checkbox"
      className="custom-control-input"
      id={`multiselect-${id}`}
      onChange={() => onChange(value)}
      checked={isChecked}
      value={value}
    />
    <label
      className="custom-control-label"
      htmlFor={`multiselect-${id}`}
      id={`multiselect-${id}-label`}
    >
      {children}
    </label>
  </div>
);

export default MultiRowTaskCheckbox;
