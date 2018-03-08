/**
 * CASEVIEW
 */
declare type CaseViewJSONResponse = {
  [CaseViewKey: string]: CaseViewJSON
};
declare type CaseViewJSON = {
  _id: number | string,
  casename: string,
  type: string,
  owner?: string | null,
  state?: string | null,
  [CustomAttributeName: string]: string | number | null,
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON,
    [PanelLinkKey: string]: LinkJSON,
    taskgroup?: Array<LinkJSON>
  },
  taskgroups?: Array<{
    name: string,
    actions?: Array<ActionJSON>
  }>
};

declare type CaseViewContributionsJSONResponse = {
  [CaseViewKey: string]: CaseViewContributionsJSON
};
declare type CaseViewContributionsJSON = {
  label: string,
  resourcetype: "CaseView",
  texts?: [
    {
      type: "master",
      text: string
    }
  ],
  _links?: {
    panel: Array<LinkContributionsJSON>,
    taskgroup?: Array<LinkContributionsJSON>
  },
  metadata: {
    _id: {
      type: "number"
    }
  },
  attributes: Array<{
    [CustomAttributeName: string]: AttributeContributionsJSON
  }>,
  taskgroups?: Array<{
    name: string,
    actions: Array<ActionContributionsJSON>
  }>,
  layouthint?: Array<string>
};

/**
 * GROUPING PANEL
 */
declare type GroupingPanelJSONResponse = {
  [GroupingPanelKey: string]: GroupingPanelJSON
};
declare type GroupingPanelJSON = {
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON,
    [PanelLinkKey: string]: LinkJSON,
    taskgroup: Array<LinkJSON>
  }
};
declare type GropuingPanelContributionsJSONResponse = {
  [GroupingPanelKey: string]: GroupingPanelContributionsJSON
};
declare type GroupingPanelContributionsJSON = {
  label: string,
  resourcetype: "GroupingPanel",
  _links?: {
    panel: Array<LinkContributionsJSON>,
    taskgroup?: Array<LinkContributionsJSON>
  }
};
