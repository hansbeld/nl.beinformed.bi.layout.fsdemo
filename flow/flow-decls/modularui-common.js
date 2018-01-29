declare type LinkJSON = {
  href: string,
  group?: string,
  name?: string
};
declare type LinkContributionsJSON = {
  name?: string,
  group?: string,
  label: string,
  layouthint?: Array<string>,
  resourcetype?: string,
  href?: string
};

declare type ActionJSON = {
  name: string,
  method?: "GET" | "POST",
  href: string,
  fields?: Array<ActionFieldsJSON>
};
declare type ActionFieldsJSON = {
  name: string,
  type: string,
  value?: string | number | null
};
declare type ActionContributionsJSON = {
  name: string,
  label: string,
  type: "form" | "contextaware",
  fields?: Array<{ [FieldName: string]: AttributeContributionsJSON }>
};

declare type ApplicationJSONResponse = {
  webapplication: ApplicationJSON
};
declare type ApplicationJSON = {
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON,
    modelcatalog: Array<LinkJSON>,
    tab: Array<LinkJSON>,
    login: LinkJSON,
    user_services: LinkJSON
  }
};
declare type ApplicationContributionsJSONResponse = {
  webapplication: ApplicationContributionsJSON
};
declare type ApplicationContributionsJSON = {
  label: string,
  resourcetype: "Application",
  _links: {
    tab: Array<LinkContributionsJSON>,
    authentication: Array<LinkContributionsJSON>
  },
  layouthint?: Array<string>
};

declare type TabJSONResponse = {
  tab: TabJSON
};
declare type TabJSON = {
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON,
    component: Array<LinkJSON>,
    taskgroup: Array<LinkJSON>,
    search: Array<LinkJSON>
  },
  taskgroups?: Array<{
    name: string,
    actions: Array<ActionJSON>
  }>
};
declare type TabContributionsJSONResponse = {
  tab: TabContributionsJSON
};
declare type TabContributionsJSON = {
  label: string,
  resourcetype: "CaseTab" | "GeneralTab",
  _links: {
    component: Array<LinkContributionsJSON>,
    taskgroup: Array<LinkContributionsJSON>,
    search: Array<LinkContributionsJSON>
  },
  taskgroups?: Array<{
    name: string,
    actions: Array<ActionContributionsJSON>
  }>
};
