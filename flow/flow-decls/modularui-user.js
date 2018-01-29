declare type UserServicesJSONResponse = {
  userservices: UserServicesJSON
};
declare type UserServicesJSON = {
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON,
    component?: Array<LinkJSON>
  }
};

declare type UserServicesContributionsJSONResponse = {
  userservices: UserServicesContributionsJSON
};
declare type UserServicesContributionsJSON = {
  label: string,
  resourcetype: "login",
  _links: {}
};

declare type UserJSONResponse = {
  userdata: UserJSON
};
declare type UserJSON = {
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON
  },
  _id: string,
  userid?: string | null,
  organisation?: {
    id: string,
    name: string
  },
  userrole?: Array<{
    type: string
  }>,
  fullname: string,
  address1?: string | null,
  address2?: string | null,
  address3?: string | null,
  address4?: string | null,
  telephone?: string | null,
  fax?: string | null,
  sex?: "M" | "F" | null,
  email?: string | null,
  dynamicschema?: Object
};

declare type UserContributionsJSONResponse = {
  userdata: UserContributionsJSON
};
declare type UserContributionsJSON = {
  label: string,
  resourcetype: "userdata",
  _links: {},
  attributes: Array<{
    [CustomAttributeName: string]: AttributeContributionsJSON
  }>,
  layouthint?: Array<string>
};
