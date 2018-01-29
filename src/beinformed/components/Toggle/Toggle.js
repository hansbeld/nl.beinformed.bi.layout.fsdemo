// @flow
import React from "react";
import classNames from "classnames";

/**
 * Render a toggle root element
 */
const Toggle = ({
  ariaLabel,
  children,
  className
}: {
  ariaLabel: string,
  children?: any,
  className?: string
}) => {
  const toggleClass = classNames(
    "toggle",
    "btn-group btn-group-toggle",
    className
  );

  return (
    <div
      className={toggleClass}
      data-toggle="buttons"
      role="group"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};

export default Toggle;
