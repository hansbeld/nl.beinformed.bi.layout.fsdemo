// @flow
import React from "react";
import classNames from "classnames";

import { KEYCODES } from "beinformed/constants/Constants";

type DropdownToggleProps = {
  children?: any,
  className?: string,
  id?: string,
  isExpanded?: boolean,
  renderToggleIcon?: boolean,
  size?: "small" | "large" | "default",
  onClick?: (e: SyntheticEvent<*>) => void
};

/**
 * Render dropdown toggle
 */
const DropdownToggle = ({
  children,
  className,
  id,
  isExpanded,
  renderToggleIcon = true,
  size,
  onClick
}: DropdownToggleProps) => {
  const buttonClass = classNames("btn", className, {
    "dropdown-toggle": renderToggleIcon,
    "btn-sm": size === "small",
    "btn-lg": size === "large"
  });

  return (
    <div
      id={id}
      className={buttonClass}
      aria-haspopup="true"
      aria-expanded={isExpanded}
      data-toggle="dropdown"
      tabIndex="0"
      role="button"
      onClick={onClick}
      onKeyDown={e => {
        if (onClick && [KEYCODES.SPACE, KEYCODES.ENTER].includes(e.keyCode)) {
          e.preventDefault();

          return onClick(e);
        }

        return true;
      }}
    >
      {children}
    </div>
  );
};

export default DropdownToggle;
