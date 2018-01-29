// @flow
import React from "react";
import classNames from "classnames";

type ToggleItemProps = {
  ariaLabel?: string,
  children?: any,
  className?: string,
  isActive?: boolean,
  name: string,
  value: string,
  onChange: (value: string) => void
};

/**
 * Render a toggle item
 */
const ToggleItem = ({
  ariaLabel,
  children,
  className,
  isActive,
  name,
  value,
  onChange
}: ToggleItemProps) => {
  const toggleClass = classNames(
    "toggle-item",
    "btn",
    "btn-light",
    "btn-sm",
    "mb-0",
    className,
    {
      active: isActive
    }
  );

  const htmlFor = `${name}-${value}-toggle`;

  return (
    <label className={toggleClass} data-value={value} htmlFor={htmlFor}>
      <input
        type="radio"
        id={htmlFor}
        name={name}
        value={value}
        autoComplete="off"
        checked={isActive}
        onChange={() => onChange(value)}
        aria-label={ariaLabel}
      />
      {children}
    </label>
  );
};

export default ToggleItem;
