// @flow
import React from "react";
import classNames from "classnames";

type DropdownButtonProps = {
  children?: any,
  className?: string,
  id?: string,
  isExpanded?: boolean,
  renderToggleIcon?: boolean,
  size?: "small" | "large" | "default",
  onClick?: Function
};

/**
 * Render dropdown button
 */
const DropdownButton = ({
  children,
  className,
  id,
  isExpanded,
  renderToggleIcon = true,
  size,
  onClick
}: DropdownButtonProps) => {
  const buttonClass = classNames("btn", className, {
    "dropdown-toggle": renderToggleIcon,
    "btn-sm": size === "small",
    "btn-lg": size === "large"
  });

  return (
    <button
      id={id}
      className={buttonClass}
      type="button"
      aria-haspopup="true"
      aria-expanded={isExpanded}
      data-toggle="dropdown"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DropdownButton;
