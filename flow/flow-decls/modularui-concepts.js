declare type ModelCatatalogJSONResponse = {
  modelcatalog: ModelCatalogJSON
};
declare type ModelCatalogJSON = {
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON,
    concepts: LinkJSON,
    content: LinkJSON
  }
};

declare type ModelCatatalogContributionsJSONResponse = {
  modelcatalog: ModelCatalogContributionsJSON
};
declare type ModelCatalogContributionsJSON = {
  label: string,
  resourcetype: "ModelCatalog",
  _links: {}
};

declare type ConceptSearchJSONResponse = {
  concepts: ConceptSearchJSON
};
declare type ConceptSearchJSON = {
  dynamicschema?: Object,
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON
  },
  paging?: PagingJSON,
  sorting?: string,
  filter?: {
    index?: ConceptSearchIndexAndTypeFilterJSON,
    label?: ConceptSearchLabelFilterJSON,
    type?: ConceptSearchIndexAndTypeFilterJSON,
    entryDate?: EntryDateFilterJSON
  },
  _embedded: {
    results: Array<{
      concept: ConceptItemJSON
    }>
  }
};
declare type ConceptSearchContributionsJSONResponse = {
  concepts: ConceptSearchContributionsJSON
};
declare type ConceptSearchContributionsJSON = {
  label: string,
  resourcetype: "ConceptSearch",
  filter: [
    { index: ChoiceFilterContributionsJSON },
    { label: StringFilterContributionsJSON },
    { type: ChoiceFilterContributionsJSON },
    { entryDate: DateFilterContributionsJSON }
  ],
  results: Array<{
    concept: ListItemContributionsJSON
  }>
};

declare type ConceptSearchIndexAndTypeFilterJSON = {
  param: "index" | "type",
  name?: string,
  value?: string | null,
  options?: Array<{
    key: string | null,
    selected: boolean | null,
    count: number | null
  }>,
  _links?: {
    lookupservice: {
      href: string
    }
  }
};

declare type ConceptSearchLabelFilterJSON = {
  param: "label",
  name?: string,
  value?: string | null
};
declare type EntryDateFilterJSON = {
  param: "entryDate",
  name?: string,
  value?: string | null
};

declare type ConceptItemJSON = {
  _id: string,
  label?: string | null,
  _links: {
    self: LinkJSON,
    concepttype: LinkJSON
  },
  dynamicschema?: Object
};

declare type ConceptDetailJSONRespnose = {
  concept: ConceptDetailJSON
};
declare type ConceptDetailJSON = {
  _id: string | null,
  formula?: string | null,
  taxonomyType?: string | null,
  label?: string | null,
  filter: {
    entryDate: EntryDateFilterJSON
  },
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON,
    concepttype: LinkJSON
  },
  labels: Array<{
    type: string,
    value: string
  }>,
  properties: Array<{
    type: string,
    value: string
  }>,
  textFragments: Array<TextFragmentJSON>,
  relations: Array<RelationJSON>,
  sourceReferences: Array<SourceReferenceJSON>
};

declare type ConceptDetailContributionsJSONResponse = {
  concept: ConceptDetailContributionsJSON
};
declare type ConceptDetailContributionsJSON = {
  label: string,
  resourcetype: "ConceptDetail",
  _links: {},
  filter: {
    entryDate: DateFilterContributionsJSON
  },
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

declare type RelationJSON = {
  relationLabel: string,
  relationType: string,
  relationCondition: string | null,
  relationDirection: string,
  concept: ConceptItemJSON,
  properties: Array<{
    type: string,
    value: string
  }>,
  textFragments: Array<TextFragmentJSON>
};
declare type SourceReferenceJSON = {
  type: string,
  label: string,
  sourceLabel: string,
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON,
    contenttype: LinkJSON,
    content: LinkJSON,
    relatedConcepts: LinkJSON
  }
};
declare type TextFragmentJSON = {
  type: string,
  text: string
};
