// @flow
import React from "react";

import ActionChooser from "beinformed/components/Actions/ActionChooser";

import CaseViewButton from "beinformed/components/CaseView/CaseViewButton";
import PanelFooter from "beinformed/components/Panel/PanelFooter";

import type ListItemModel from "beinformed/models/list/ListItemModel";
import type DetailModel from "beinformed/models/detail/DetailModel";

/**
 * Render detail footer with actions and to caseview action
 */
const ListDetailFooter = ({
  listitem,
  detail
}: {
  listitem: ListItemModel,
  detail: DetailModel
}) => (
  <PanelFooter className="card-footer">
    {listitem.actionCollection.hasItems && (
      <ActionChooser actions={listitem.actionCollection.all} direction="up" />
    )}

    {detail.isCase() && <CaseViewButton caseview={detail} />}
  </PanelFooter>
);

export default ListDetailFooter;
