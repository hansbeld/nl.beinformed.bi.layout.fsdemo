// @flow
import React from "react";
import { Switch, Route } from "react-router-dom";

import ListDetail from "beinformed/containers/ListDetail/ListDetail";
import DetailPanel from "beinformed/components/DetailPanel/DetailPanel";
import ListMain from "beinformed/components/List/ListMain";
import PanelRenderer from "beinformed/components/Panel/PanelRenderer";

const AccountPanelRenderer = ({ panel }) => {
  console.info('panel', panel)
  if (!panel) {
    return null;
  }
  console.info('panel', panel.type, panel)
  if (panel.type === "List") {
    if (panel.detail) {
      console.info('has detail', panel.detail)
      return <DetailPanel detail={panel.detail} />;
    }

    console.info('continue');
    return (
      <Switch>
        <Route
          path={`${panel.selfhref.path}/:id`}
          render={({ match }) => {
            if (match.params.id) {
              const listitem = panel.getListItemById(match.params.id);
              if (listitem) {
                return <ListDetail list={panel} listitem={listitem} />;
              }
            }
            return null;
          }}
        />
        <Route>
          <ListMain list={panel} viewType="TableView" />
        </Route>
      </Switch>
    );
  }

  return <PanelRenderer panel={panel} />;
};

export default AccountPanelRenderer;
