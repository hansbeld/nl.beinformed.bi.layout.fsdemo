// @flow
import React from "react";
import classNames from "classnames";

import List from "beinformed/components/List/List";
import PanelBody from "beinformed/components/Panel/PanelBody";

import Panel from "beinformed/components/Panel/Panel";

import type { ListModel } from "beinformed/models";

type ListPanelProps = {
  isTab?: boolean,
  isActive?: boolean,
  className?: string,
  keepPanelsInView?: boolean,
  list: ListModel
};

/**
 * Render ListPanel
 */
const ListPanel = ({
  className,
  isTab,
  isActive,
  list,
  keepPanelsInView
}: ListPanelProps) => {
  const panelClass = classNames("listpanel", className, {
    "tab-pane": isTab,
    active: isActive
  });

  return (
    <Panel dataId={list.key} className={panelClass}>
      <PanelBody>
        <List
          className={className}
          keepPanelsInView={keepPanelsInView}
          list={list}
        />
      </PanelBody>
    </Panel>
  );
};

export default ListPanel;
