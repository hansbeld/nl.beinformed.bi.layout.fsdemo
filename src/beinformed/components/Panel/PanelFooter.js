// @flow
import React from "react";
import classNames from "classnames";

/**
 * render panel footer
 */
const PanelFooter = ({
  children,
  className
}: {
  children?: any,
  className?: string
}) => {
  const panelClass = classNames("panel-footer card-footer clearfix", className);

  return <div className={panelClass}>{children}</div>;
};

export default PanelFooter;
