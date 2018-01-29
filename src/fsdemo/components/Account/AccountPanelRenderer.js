// @flow
import React from "react";
import { Switch, Route } from "react-router-dom";

import ListDetail from "beinformed/containers/ListDetail/ListDetail";
import ListDetailView from "beinformed/components/ListDetail/ListDetail";
import ListMain from "beinformed/components/List/ListMain";
import PanelRenderer from "beinformed/components/Panel/PanelRenderer";

const AccountPanelRenderer = ({ panel }) => {
  if (!panel) {
    return null;
  }

  if (panel.type === "List") {
    if (panel.detail) {
      return <ListDetailView list={panel} />;
    }

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
