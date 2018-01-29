// @flow
import type LinkCollection from "beinformed/models/links/LinkCollection";
import type LinkModel from "beinformed/models/links/LinkModel";

import CaseSearchModel from "beinformed/models/search/CaseSearchModel";
import TaskGroupCollection from "beinformed/models/taskgroup/TaskGroupCollection";
import ResourceModel from "beinformed/models/base/ResourceModel";
import TaskGroupModel from "beinformed/models/taskgroup/TaskGroupModel";
import ActionCollection from "beinformed/models/actions/ActionCollection";

import type ModularUIResponse from "beinformed/utils/modularui/ModularUIResponse";

/**
 * Describes a TabModel
 */
export default class TabModel extends ResourceModel {
  _search: CaseSearchModel | null;
  _taskGroupCollection: TaskGroupCollection;
  _actionCollection: ActionCollection;

  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this.createTaskGroupCollection();

    this._actionCollection = new ActionCollection(
      this.data.actions,
      this.contributions.actions
    );
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "Tab";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      (data.contributions.resourcetype.endsWith("Tab") ||
        data.contributions.resourcetype.endsWith("KnowledgeBank"))
    );
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    return this.links.getLinksByGroup("taskgroup", "actions").all;
  }

  /**
   * @override
   */
  setChildModels() {
    this.taskGroupCollection.add(
      this.childModels.filter(model => model.type === "TaskGroup")
    );
  }

  get searchLink(): LinkModel | null {
    return this.links.getLinksByGroup("search").first;
  }

  createTaskGroupCollection() {
    this.taskGroupCollection = this.data.taskgroups
      ? this.data.taskgroups
          .map(taskgroup => {
            const taskgroupContributions = this.contributions.taskgroups.find(
              taskgroupContribution =>
                taskgroupContribution.name === taskgroup.name
            );

            if (taskgroupContributions) {
              return TaskGroupModel.create(
                taskgroup.name,
                taskgroup,
                taskgroupContributions
              );
            }

            return null;
          })
          .filter(taskgroup => taskgroup !== null)
      : [];
  }

  /**
   * Getting the taskgrouppanels on the tab
   */
  get taskGroupCollection(): TaskGroupCollection {
    return this._taskGroupCollection;
  }

  /**
   * Setting the taskgroup panel collection
   */
  set taskGroupCollection(taskgroups: TaskGroupModel[]) {
    this._taskGroupCollection = new TaskGroupCollection(taskgroups);
  }

  /**
   * Getting the label of the tab
   */
  get label(): string {
    return this.contributions.label || "";
  }

  /**
   * Getting the component links on the tab
   */
  get components(): LinkCollection {
    return this.links.getLinksByGroup("component", "search");
  }

  get actionCollection(): ActionCollection {
    return this._actionCollection;
  }

  /**
   * Has component links
   */
  hasComponents() {
    return this.components.size > 0;
  }

  /**
   * Has taskgroups
   */
  hasTaskGroups() {
    return this.taskGroupCollection && this.taskGroupCollection.hasItems;
  }

  hasActions() {
    return this.actionCollection && this.actionCollection.hasItems;
  }
}
