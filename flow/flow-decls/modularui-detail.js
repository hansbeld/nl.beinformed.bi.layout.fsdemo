declare type DetailJSONResponse = {
  [DetailKey: string]: DetailJSON
};
declare type DetailJSON = {
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON
  },
  [CustomAttributeName: string]: string | number | null
};

declare type DetailContributionsJSONResponse = {
  [DetailKey: string]: DetailContributionsJSON
};
declare type DetailContributionsJSON = {
  label: string,
  resourcetype: string,
  metadata?: {
    _id: {
      type: "number"
    }
  },
  attributes: Array<{
    [CustomAttributeName: string]: AttributeContributionsJSON
  }>
};
