// @flow
import React from "react";

import Action from "beinformed/components/Actions/Action";
import type { ActionModel } from "beinformed/models";

type ActionListType = {
  actions: ActionModel[]
};

/**
 * Render a list of actions
 */
const ActionList = ({ actions }: ActionListType) => (
  <ul className="list-unstyled">
    {actions.map(action => (
      <li key={action.key}>
        <Action action={action} isModal />
      </li>
    ))}
  </ul>
);

export default ActionList;
