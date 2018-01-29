// @flow
import ActionCollection from "beinformed/models/actions/ActionCollection";
import ResourceModel from "beinformed/models/base/ResourceModel";

import ModularUIResponse from "beinformed/utils/modularui/ModularUIResponse";

/**
 * TaskGroupModel
 */
export default class TaskGroupModel extends ResourceModel {
  _actionCollection: ActionCollection;
  _label: string;
  _key: string;

  /**
   * Constructs the TaskGroup
   */
  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this._actionCollection = new ActionCollection(
      this.data.actions,
      this.contributions.actions
    );
    this._label = this.contributions.label;

    const selfHref = this.selflink ? this.selflink.href.href : "";

    this._key = selfHref.substring(selfHref.lastIndexOf("/") + 1);
  }

  static create(
    key: string,
    data: TaskgroupJSON,
    contributions: TaskgroupContributionsJSON
  ) {
    const taskgroup = new ModularUIResponse();
    taskgroup.key = key;
    taskgroup.data = data;
    taskgroup.contributions = contributions;
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "TaskGroup";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "TaskGroup"
    );
  }

  /**
   * Get the key of the TaskGroup
   */
  get key(): string {
    return this._key;
  }

  /**
   * Get the label of the TaskGroup
   */
  get label(): string {
    return this._label;
  }

  /**
   * Retrieve actions of taskgroup
   */
  get actionCollection(): ActionCollection {
    return this._actionCollection;
  }
}
