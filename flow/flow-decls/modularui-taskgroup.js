declare type TaskGroupJSONResponse = {
  taskgroup: TaskgroupJSON
};
declare type TaskgroupJSON = {
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON
  },
  actions: Array<ActionJSON>
};

declare type TaskgroupContributionsJSONResponse = {
  taskgroup: TaskgroupContributionsJSON
};
declare type TaskgroupContributionsJSON = {
  label: string,
  resourcetype: "TaskGroup",
  actions?: Array<ActionContributionsJSON>
};
