// @flow
import React, { Component } from "react";

import Icon from "beinformed/components/Icon/Icon";
import TaskGroupPanels from "beinformed/components/TaskGroup/TaskGroupPanels";
import ActionPanels from "beinformed/components/TaskGroup/ActionPanels";

import "./FoldoutTaskMenu.scss";

import type TaskGroupCollection from "beinformed/models/taskgroup/TaskGroupCollection";
import ActionCollection from "../../models/actions/ActionCollection";

type FoldoutTaskMenuProps = {
  taskgroups: TaskGroupCollection,
  actions: ActionCollection,
  label?: string
};

/**
 * Render a task menu in the tab bar
 *
 * This is a Component because we use references inside jsx
 */
class FoldoutTaskMenu extends Component<FoldoutTaskMenuProps> {
  _toggleLabel: ?HTMLLabelElement;

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className="foldouttaskmenu">
        <input
          type="checkbox"
          id="taskmenu-toggle"
          className="taskmenu-toggle-checkbox"
          aria-hidden="true"
          tabIndex="-1"
          onChange={e => {
            if (this._toggleLabel) {
              this._toggleLabel.setAttribute("aria-expanded", e.target.checked);
            }
          }}
        />
        <label
          ref={c => {
            this._toggleLabel = c;
          }}
          id="taskmenu-toggle-label"
          className="taskmenu-toggle"
          htmlFor="taskmenu-toggle"
          aria-controls="taskgroupView"
          aria-expanded="false"
        >
          <Icon name="angle-double-left" className="taskmenu-open" />
          <Icon name="times" className="taskmenu-close" />
        </label>
        {this.props.taskgroups.hasItems && (
          <div
            className="taskgroup-view"
            id="taskgroupView"
            role="button"
            tabIndex="0"
            onClick={() => {
              if (this._toggleLabel) {
                this._toggleLabel.click();
              }
            }}
            onKeyDown={() => {
              if (this._toggleLabel) {
                this._toggleLabel.click();
              }
            }}
          >
            <TaskGroupPanels taskGroupPanels={this.props.taskgroups} />
          </div>
        )}

        {this.props.actions.hasItems && (
          <div
            className="taskgroup-view"
            id="actionView"
            role="button"
            tabIndex="-1"
            onClick={() => {
              if (this._toggleLabel) {
                this._toggleLabel.click();
              }
            }}
            onKeyDown={() => {
              if (this._toggleLabel) {
                this._toggleLabel.click();
              }
            }}
          >
            <ActionPanels
              actionCollection={this.props.actions}
              label={this.props.label}
            />
          </div>
        )}
      </div>
    );
  }
}

export default FoldoutTaskMenu;
