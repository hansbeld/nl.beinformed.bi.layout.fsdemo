// @flow
import React from "react";

import ActionChooser from "beinformed/components/Actions/ActionChooser";
import PanelFooter from "beinformed/components/Panel/PanelFooter";

import type DetailModel from "beinformed/models/detail/DetailModel";

/**
 * Render detail footer with actions
 */
const DetailPanelFooter = ({ detail }: { detail: DetailModel }) => (
  <PanelFooter>
    {detail.actionCollection.hasItems && (
      <ActionChooser actions={detail.actionCollection.all} direction="up" />
    )}
  </PanelFooter>
);

export default DetailPanelFooter;
