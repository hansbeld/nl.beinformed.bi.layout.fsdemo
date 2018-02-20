// @flow
import React from "react";
import { Redirect } from "react-router-dom";

import GroupingPanelModel from "beinformed/models/panels/GroupingPanelModel";

import GroupingPanel from "beinformed/components/GroupingPanel/GroupingPanel";
import ListPanel from "beinformed/components/ListPanel/ListPanel";
import DetailPanel from "beinformed/components/DetailPanel/DetailPanel";

import { GOTO_CASEVIEW } from "beinformed/constants/LayoutHints";

import type ListModel from "beinformed/models/list/ListModel";
import type DetailModel from "beinformed/models/detail/DetailModel";

type PanelRendererProps = {
  isTab?: boolean,
  panel: ListModel | GroupingPanelModel | DetailModel
};

/**
 * Render correct panel based on instance of model
 */
const PanelRenderer = ({ isTab, panel }: PanelRendererProps) => {
  if (panel instanceof GroupingPanelModel) {
    return <GroupingPanel isTab={isTab} panel={panel} />;
  }

  if (panel && (panel.type === "List" || panel.type === "CaseSearch")) {
    if (panel.layouthint.has(GOTO_CASEVIEW)) {
      const firstListItem = panel.listItemCollection.first;
      if (firstListItem) {
        return <Redirect to={firstListItem.selfhref.toString()} />;
      }
    }

    return <ListPanel isTab={isTab} list={panel} />;
  }

  if (panel && panel.type === "Detail") {
    return <DetailPanel detail={panel} isTab={isTab} />;
  }

  return null;
};

export default PanelRenderer;
