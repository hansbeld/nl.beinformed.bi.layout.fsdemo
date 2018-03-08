// @flow
import React from "react";

import ButtonGroup from "beinformed/components/Button/ButtonGroup";
import Button from "beinformed/components/Button/Button";

import { Message } from "beinformed/i18n";

import { MULTI_ROW_TASK } from "beinformed/constants/LayoutHints";

import type { ActionCollection, ActionModel } from "beinformed/models";

export type MultiRowTaskProps = {
  actions: ActionCollection,
  selectedItemIds: number[],
  onClick: (action: ActionModel, selectedItemIds: number[]) => void
};

/**
 * Multi row tasks
 */
const MultiRowTask = ({
  selectedItemIds,
  actions,
  onClick
}: MultiRowTaskProps) => {
  const multiRowTaskActions = actions.getActionsByLayoutHint(MULTI_ROW_TASK);

  return multiRowTaskActions.hasItems ? (
    <ButtonGroup>
      {multiRowTaskActions.all.map(action => (
        <Button
          key={action.name}
          dataId={action.name}
          name={action.name}
          disabled={selectedItemIds.length === 0}
          onClick={() => onClick(action, selectedItemIds)}
        >
          <Message id={`Action.${action.name}`} defaultMessage={action.label} />
        </Button>
      ))}
    </ButtonGroup>
  ) : null;
};

export default MultiRowTask;
