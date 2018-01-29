// @flow
import React from "react";

import ActionChooser from "beinformed/components/Actions/ActionChooser";

import CaseViewButton from "beinformed/components/CaseView/CaseViewButton";
import PanelFooter from "beinformed/components/Panel/PanelFooter";

import type DetailModel from "beinformed/models/detail/DetailModel";

/**
 * Render detail footer with actions and to caseview action
 */
const ListDetailFooter = ({ detail }: { detail: DetailModel }) => (
  <PanelFooter>
    {detail.actionCollection.size > 0 && (
      <ActionChooser actions={detail.actionCollection.all} direction="up" />
    )}

    {detail.isCase() && <CaseViewButton caseview={detail} />}
  </PanelFooter>
);

export default ListDetailFooter;
