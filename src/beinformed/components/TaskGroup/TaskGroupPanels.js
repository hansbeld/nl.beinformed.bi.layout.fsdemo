// @flow
import React, { Component } from "react";
import classNames from "classnames";

import PlayCircleOutlineIcon from "mdi-react/PlayCircleOutlineIcon";

import ActionList from "beinformed/components/Actions/ActionList";
import DAPPerformedActivities from "beinformed/components/TaskGroup/DAPPerformedActivities";

import type TaskGroupCollection from "beinformed/models/taskgroup/TaskGroupCollection";
import type ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";
import type ActionCollection from "beinformed/models/actions/ActionCollection";

import "./TaskGroupPanels.scss";

type TaskGroupPanelsProps = {
  className?: string,
  executableActivities?: ChoiceAttributeModel | null,
  performedActivities?: ChoiceAttributeModel | null,
  taskGroupPanels: TaskGroupCollection
};

/**
 * Render a task menu in the tab bar
 */
class TaskGroupPanels extends Component<TaskGroupPanelsProps> {
  /**
   * Add icons to DAP activities
   */
  getActivities(
    actionCollection: ActionCollection,
    executableActivities?: ChoiceAttributeModel | null
  ) {
    return actionCollection.all.map(action => {
      const newAction = action;
      const key = action.key.toLowerCase();

      if (
        executableActivities &&
        executableActivities.selected
          .map(act => act.toLowerCase())
          .includes(key)
      ) {
        newAction.icon = <PlayCircleOutlineIcon className="textAfter" />;
      }

      return newAction;
    });
  }

  render() {
    const {
      className,
      taskGroupPanels,
      executableActivities,
      performedActivities
    } = this.props;

    const taskgroupPanelsClass = classNames("taskgroup-panels", className);
    const panels = taskGroupPanels.collection.filter(
      panel => panel.actionCollection.length > 0
    );

    return (
      <div className={taskgroupPanelsClass}>
        {panels.map(panel => (
          <div key={panel.key} className="taskgroup" data-id={panel.key}>
            <h6>{panel.label}</h6>
            <ActionList
              actions={this.getActivities(
                panel.actionCollection,
                executableActivities
              )}
            />
          </div>
        ))}
        {performedActivities &&
          performedActivities.selected.length > 0 && (
            <DAPPerformedActivities activities={performedActivities} />
          )}
      </div>
    );
  }
}

export default TaskGroupPanels;
