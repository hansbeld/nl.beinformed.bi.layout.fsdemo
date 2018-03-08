declare type ContentSearchJSONResponse = {
  content: ContentSearchJSON
};

declare type ContentSearchJSON = {
  dynamicschema?: Object,
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON
  },
  paging?: PagingJSON,
  sorting?: string,
  filter: ContentSearchFilterJSON,
  _embedded: {
    results: Array<{
      content: ContentItemJSON
    }>
  }
};

declare type ContentSearchContributionsJSONResponse = {
  content: ContentSearchContributionsJSON
};

declare type ContentSearchContributionsJSON = {
  label: string,
  resourcetype: "ContentSearch",
  filter: Array<{
    [FilterKey: string]: FilterContributionsJSON
  }>,
  results: Array<{
    content: ListItemContributionsJSON
  }>
};

declare type ContentItemJSON = {
  _id: string,
  label: string | null,
  _links: {
    self: LinkJSON,
    contenttype: LinkJSON
  }
};

declare type ContentTOCJSONRespnose = {
  content: ContentTOCJSON
};
declare type ContentTOCJSON = {
  _id: string | null,
  label?: string | null,
  filter: ContentTOCFilter,
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON,
    contenttype: LinkJSON
  },
  items?: ContentItems,
  categories?: Array<CategoryLinkJSON>
};
declare type CategoryLinkJSON = {
  _id: string,
  label: string,
  _links: {
    self: LinkJSON
  }
};

declare type ContentTOCFilter = {
  datefilter: EntryDateFilterJSON,
  stringfilter: SearchTermFilterJSON
};

declare type ContentItems = Array<ContentItem>;
declare type ContentItem = {
  _id: string,
  label: string | null,
  _links: {
    self: LinkJSON
  },
  items?: ContentItems
};

declare type ContentTOCContributionsJSONResponse = {
  content: ContentTOCContributionsJSON
};
declare type ContentTOCContributionsJSON = {
  label: string,
  resourcetype: "ContentTOC",
  filter: Array<{
    [FilterKey: string]: FilterContributionsJSON
  }>,
  metadata: {
    _id: {
      type: "string",
      label: "Id"
    }
  },
  attributes: Array<{
    [CustomAttributeName: string]: AttributeContributionsJSON
  }>
};

declare type ContentDetailJSONRespnose = {
  section: ContentDetailJSON
};
declare type ContentDetailJSON = {
  _id: string | null,
  label: string | null,
  body: string,
  filter: ContentDetailFilter,
  childSections?: Array<ChildSectionLinkJSON>,
  relatedConcepts?: Array<{
    label: string,
    conceptIdentifier: string,
    conceptType: string,
    _links: {
      self: LinkJSON,
      api_doc: LinkJSON,
      contributions: LinkJSON,
      relatedConcepts: LinkJSON,
      concepttype: LinkJSON
    }
  }>,
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON,
    content: LinkJSON,
    relatedConcepts: LinkJSON
  }
};

declare type ChildSectionLinkJSON = {
  label: string,
  _id: string,
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON,
    content: LinkJSON,
    relatedConcepts: LinkJSON
  }
};

declare type ContentDetailFilter = {
  datefilter: EntryDateFilterJSON
};

declare type ContentDetailContributionsJSONResponse = {
  section: ContentDetailContributionsJSON
};
declare type ContentDetailContributionsJSON = {
  label: string,
  resourcetype: "ContentDetail",
  _links: {},
  filter: Array<{
    [FilterKey: string]: FilterContributionsJSON
  }>,
  metadata: {
    _id: {
      type: "string",
      label: "Id"
    }
  },
  attributes: Array<{
    [CustomAttributeName: string]: AttributeContributionsJSON
  }>
};

declare type ContentTypeJSONResponse = {
  contenttype: ContentTypeJSON
};
declare type ContentTypeJSON = {
  _id: string,
  label: string | null,
  iconLarge: string,
  iconMedium: string,
  iconSmall: string,
  description: string,
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON
  }
};

declare type ContentTypeContributionsJSONResponse = {
  contenttype: ContentTypeContributionsJSON
};
declare type ContentTypeContributionsJSON = {
  label: string,
  resourcetype: "ContentTypeDetail",
  metadata: {
    _id: {
      type: "string",
      label: "Id"
    }
  },
  attributes: Array<{
    [CustomAttributeName: string]: AttributeContributionsJSON
  }>
};
