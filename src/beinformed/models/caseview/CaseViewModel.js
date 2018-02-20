// @flow
import ModularUIResponse from "beinformed/utils/modularui/ModularUIResponse";

import type LinkModel from "beinformed/models/links/LinkModel";

import DetailModel from "beinformed/models/detail/DetailModel";
import Href from "beinformed/models/href/Href";
import TaskGroupCollection from "beinformed/models/taskgroup/TaskGroupCollection";
import TaskGroupModel from "beinformed/models/taskgroup/TaskGroupModel";
import LinkCollection from "beinformed/models/links/LinkCollection";

import { CASE_STATE, CASE_TITLE } from "beinformed/constants/LayoutHints";

/**
 * Model containing the details of one case.
 */
export default class CaseViewModel extends DetailModel {
  _taskGroupCollection: TaskGroupCollection;

  /**
   * Constructs case view model
   */
  constructor(caseviewData: ModularUIResponse) {
    super(caseviewData);

    this.createTaskGroupCollection();
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "CaseView";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "CaseView"
    );
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): Array<LinkModel> {
    return this.links.getLinksByGroup("taskgroup").all;
  }

  /**
   * Getting panel links
   */
  get panelLinks(): LinkCollection {
    return this.links.getLinksByGroup("panel");
  }

  /**
   * @override
   */
  setChildModels(models: Array<ResolvableModels>) {
    super.setChildModels(models);

    this.taskGroupCollection = this.childModels.filter(
      model => model.type === "TaskGroup"
    );
  }

  /**
   * Getting the case name
   */
  get casename(): AttributeType | null {
    return this.attributeCollection.getAttributeByLayoutHint(CASE_TITLE);
  }

  get label(): string {
    return this.casename ? this.casename.value : "";
  }

  /**
   * Getting the owner of the case
   */
  get owner(): AttributeType | null {
    return this.attributeCollection.getAttributeByLayoutHint("owner");
  }

  /**
   * Getting the state of the case
   */
  get status(): AttributeType | null {
    return this.attributeCollection.getAttributeByLayoutHint(CASE_STATE);
  }

  /**
   * Getting the type of the case detail
   */
  get casetype(): AttributeType | null {
    return this.attributeCollection.getAttributeByLayoutHint("type");
  }

  /**
   * Check if an introtext exists for this caseview
   * @return {boolean}
   */
  hasIntroText() {
    return this.introtext !== "";
  }

  /**
   * Getting the introduction text configured on the case view
   */
  get introtext(): string {
    if (this.contributions.texts) {
      const text = this.contributions.texts.find(
        item => item.type === "master"
      );

      if (text) {
        return text.text;
      }
    }

    return "";
  }

  /**
   * Getting the self href
   * @return {Href}
   */
  get selfhref(): Href {
    const selfLink = this.links.getLinkByKey("self");

    if (selfLink === null) {
      throw new Error("No self href available");
    }

    return new Href(selfLink.href);
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
   * Setting the taskgroup panel collection
   */
  set taskGroupCollection(taskgroups: TaskGroupModel[]) {
    this._taskGroupCollection = new TaskGroupCollection(taskgroups);
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
}
