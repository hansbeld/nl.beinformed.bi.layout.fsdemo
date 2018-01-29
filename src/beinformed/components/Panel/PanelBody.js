// @flow
import React from "react";
import classNames from "classnames";

/**
 * render Panel body
 */
const PanelBody = ({
  children,
  className
}: {
  children?: any,
  className?: string
}) => {
  const panelClass = classNames("panel-body", className);

  return <div className={panelClass}>{children}</div>;
};

export default PanelBody;
