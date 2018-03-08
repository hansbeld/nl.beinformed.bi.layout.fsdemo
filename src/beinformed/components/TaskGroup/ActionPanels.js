// @flow
import React, { Component } from "react";

import type { ActionCollection } from "beinformed/models";

import ActionList from "beinformed/components/Actions/ActionList";

import "./TaskGroupPanels.scss";

type ActionPanelsProps = {
  label?: string,
  actionCollection: ActionCollection
};

class ActionPanels extends Component<ActionPanelsProps> {
  render() {
    const { label, actionCollection } = this.props;

    const visibleActions = actionCollection.filter(
      visibleAction =>
        visibleAction.layouthint.getByLayoutHint("HIDE_FROM_MENU") === null
    );

    return (
      <div className="taskgroup-panels">
        <div key={label} className="taskgroup" data-id="instruments">
          <h6>{label}</h6>
          <ActionList actions={visibleActions} />
        </div>
      </div>
    );
  }
}

export default ActionPanels;
