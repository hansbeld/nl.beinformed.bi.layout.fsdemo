// @flow
import type Href from "beinformed/models/href/Href";
import type LinkModel from "beinformed/models/links/LinkModel";
import type ModularUIResponse from "beinformed/utils/modularui/ModularUIResponse";

import PanelCollection from "beinformed/models/panels/PanelCollection";
import ResourceModel from "beinformed/models/base/ResourceModel";
import TaskGroupCollection from "beinformed/models/taskgroup/TaskGroupCollection";
import LinkCollection from "beinformed/models/links/LinkCollection";

/**
 * Panel that groups other panels
 */
export default class GroupingPanelModel extends ResourceModel {
  _panelCollection: PanelCollection;
  _taskGroupCollection: TaskGroupCollection;

  /**
   * Constructs GroupingPanel
   */
  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this._panelCollection = new PanelCollection();
    this._taskGroupCollection = new TaskGroupCollection();
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "GroupingPanel";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "GroupingPanel"
    );
  }

  /**
   * Getting the label of the panel
   */
  get label(): string {
    return this.contributions.label;
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    return this.links.getLinksByGroup("taskgroup").all;
  }

  get panelLinks(): LinkCollection {
    return this.links.getLinksByGroup("panel");
  }

  /**
   * @override
   */
  setChildModels() {
    const lists = this.childModels.filter(model => model.type === "List");
    if (lists.length > 0) {
      this.panelCollection = new PanelCollection(lists);
    }

    const taskGroups = this.childModels.filter(
      model => model.type === "TaskGroup"
    );
    if (taskGroups.length > 0) {
      this.taskGroupCollection = new TaskGroupCollection(taskGroups);
    }
  }

  /**
   * Check if an introtext exists for this caseview
   * @return {boolean}
   */
  hasIntroText() {
    return (
      this.contributions.texts &&
      this.contributions.texts.find(item => item.type === "master")
    );
  }

  /**
   * Getting the introduction text configured on the grouping panel
   */
  get introtext(): string {
    if (this.contributions.texts) {
      const text = this.contributions.texts.find(
        item => item.type === "master"
      );

      return text ? text.text : "";
    }

    return "";
  }

  /**
   * Getting the panel collection
   */
  get panelCollection(): PanelCollection {
    return this._panelCollection;
  }

  /**
   * Setting the panel collection
   */
  set panelCollection(panelCollection: PanelCollection) {
    this._panelCollection = panelCollection;
  }

  /**
   * Setting the taskgroup panel collection
   */
  set taskGroupCollection(taskgroups: TaskGroupCollection) {
    this._taskGroupCollection = taskgroups;
  }

  /**
   * Getting the taskgrouppanels on the tab
   */
  get taskGroupCollection(): TaskGroupCollection {
    return this._taskGroupCollection;
  }

  /**
   * Has taskgroups
   */
  hasTaskGroups() {
    return this.taskGroupCollection && this.taskGroupCollection.hasItems;
  }

  /**
   * Has tasks
   */
  hasTasks() {
    return this.taskGroupCollection.hasTasks();
  }

  /**
   * Replace a panel in the panel collection of the grouping panel
   */
  replacePanel(replacePanelHref: Href, newPanel: PanelType) {
    const clonedGroupingPanel = this.clone();

    clonedGroupingPanel.panelCollection.replace(replacePanelHref, newPanel);

    return clonedGroupingPanel;
  }
}
