// PAGING

declare type PagingJSON = {
  totalresults: number,
  page: number,
  maxpages: number,
  pagesize: number
};
declare type PagingContributionsJSON = {
  pagesize: {
    options: Array<number>
  }
};

// SORTING
declare type SortingContributionsJSON = {
  attributes: Array<string>
};

// GROUPING
declare type GroupJSON = {
  _id?: string | null,
  type: string,
  reference?: Array<number>,
  grouping?: GroupingJSON,
  [AttributeName: string]: string | number | null
};
declare type GroupingJSON = {
  _id: string,
  prefix?: string,
  group?: Array<GroupJSON>
};

// CONTEXT
declare type ContextContributionsJSON = {
  id?: string,
  prefix?: string,
  label?: string,
  metadata?: {
    _id: {
      type: "number"
    },
    type: {
      type: "string"
    }
  },
  attributes?: Array<{ [AttributeName: string]: AttributeContributionsJSON }>
};

// LIST ITEM

declare type ListItemJSON = {
  _id: number | string,
  dynamicschema?: Object,
  _links?: {
    _self: LinkJSON,
    [PanelLinkKey: string]: LinkJSON
  },
  actions?: Array<ActionJSON>,
  [CustomAttributeName: string]: string | number | null
};
declare type ListItemContributionsJSON = {
  _links?: {
    panel: Array<LinkContributionsJSON>
  },
  metadata: {
    _id: {
      type: "number"
    }
  },
  attributes: Array<{
    [CustomAttributeName: string]: AttributeContributionsJSON
  }>,
  actions?: Array<ActionContributionsJSON>
};

// LIST
declare type ListJSONResponse = {
  [listKey: string]: ListJSON
};
declare type ListJSON = {
  dynamicschema: Object,
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON
  },
  actions: Array<ActionJSON>,
  paging: PagingJSON,
  grouping?: GroupingJSON,
  sorting: string,
  filter: {
    [FilterKey: string]: FilterJSON
  },
  _embedded: {
    results: Array<{
      [ListItemKey: string]: ListItemJSON
    }>
  }
};

declare type ListContributionsJSONResponse = {
  [listKey: string]: ListContributionsJSON
};

declare type ListContributionsJSON = {
  label: string,
  resourcetype: "CaseList",
  texts?: {
    type: "master",
    text: string
  },
  actions?: Array<ActionContributionsJSON>,
  filter: Array<{
    [FilterKey: string]: FilterContributionsJSON
  }>,
  paging: PagingContributionsJSON,
  sorting: SortingContributionsJSON,
  contexts: Array<ContextContributionsJSON>,
  results: Array<{
    [ListItemKey: string]: ListItemContributionsJSON
  }>,
  layouthint?: Array<string>
};

/**
 * LIST DETAIL
 */
declare type ListDetailJSONResponse = {
  [ListDetailKey: string]: ListDetailJSON
};
declare type ListDetailJSON = {
  _id: number,
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON
  },
  [CustomAttributeName: string]: string
};

declare type ListDetailContributionsJSONResponse = {
  [ListDetailKey: string]: ListDetailContributionsJSON
};
declare type ListDetailContributionsJSON = {
  label: string,
  resourcetype: "RecordListPanelDetail",
  _links: {},
  attributes: Array<{
    [CustomAttributeName: string]: AttributeContributionsJSON
  }>,
  layouthint?: Array<string>
};
