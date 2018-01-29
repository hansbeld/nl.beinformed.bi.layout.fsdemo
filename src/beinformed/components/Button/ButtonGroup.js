// @flow
import React from "react";
import classNames from "classnames";

/**
 * Render a close button
 */
const ButtonGroup = ({
  children,
  className
}: {
  children?: any,
  className?: string
}) => {
  const buttonGroupClass = classNames("btn-group", className);

  return (
    <div className={buttonGroupClass} role="group">
      {children}
    </div>
  );
};

export default ButtonGroup;
