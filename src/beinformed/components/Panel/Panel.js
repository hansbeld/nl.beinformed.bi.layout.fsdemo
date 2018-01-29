// @flow
import React from "react";
import classNames from "classnames";

import PanelBody from "beinformed/components/Panel/PanelBody";

import "./Panel.scss";

type PanelProps = {
  children?: any,
  className?: string,
  dataId?: string
};

/**
 * render Panel
 */
const Panel = ({ className, children, dataId }: PanelProps) => {
  const hasPanelBodyChild =
    children && !Array.isArray(children) && children.type !== PanelBody;

  const panelClass = classNames("panel", className, {
    "panel-body": hasPanelBodyChild
  });

  return (
    <div data-id={dataId} className={panelClass}>
      {children}
    </div>
  );
};

export default Panel;
