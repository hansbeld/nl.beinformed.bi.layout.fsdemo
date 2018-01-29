// @flow
import React from "react";
import classNames from "classnames";

/**
 * Render a button group
 */
const ButtonToolbar = ({
  ariaLabel,
  children,
  className
}: {
  ariaLabel?: string,
  children?: any,
  className?: string
}) => {
  const toolbarClass = classNames("btn-toolbar", className);

  return (
    <div className={toolbarClass} role="toolbar" aria-label={ariaLabel}>
      {children}
    </div>
  );
};

export default ButtonToolbar;
