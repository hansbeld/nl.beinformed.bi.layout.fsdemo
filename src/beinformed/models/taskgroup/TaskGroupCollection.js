// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";
import type TaskGroupModel from "beinformed/models/taskgroup/TaskGroupModel";

/**
 * Collection of taskgroup models
 */
export default class TaskGroupCollection extends BaseCollection<
  TaskGroupModel
> {
  /**
   * Indicates if the taskgroup collection has has tasks
   */
  hasTasks() {
    return (
      this.hasItems &&
      typeof this.collection.find(
        taskgroup => taskgroup.actionCollection.length > 0
      ) !== "undefined"
    );
  }
}
