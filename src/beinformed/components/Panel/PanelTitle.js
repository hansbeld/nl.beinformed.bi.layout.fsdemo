// @flow
import React from "react";
import classNames from "classnames";

type PanelTitleProps = {
  children?: any,
  className?: string,
  priority?: "default" | "primary"
};

/**
 * Render panel body
 */
const PanelTitle = ({ children, className, priority }: PanelTitleProps) => {
  const panelClass = classNames("panel-title card-title", className);

  if (priority === "primary") {
    return <h1 className={panelClass}>{children}</h1>;
  }

  return <h3 className={panelClass}>{children}</h3>;
};

export default PanelTitle;
