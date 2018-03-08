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
  filter: ConceptSearchFilterJSON,
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
  filter: Array<{
    [FilterKey: string]: FilterContributionsJSON
  }>,
  results: Array<{
    concept: ListItemContributionsJSON
  }>
};

declare type ConceptItemJSON = {
  _id: string,
  label: string | null,
  conceptLabel: string,
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
  conceptLabel: string,
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

declare type RelatedConceptsJSONResponse = {
  relatedConcepts: RelatedConceptsJSON
};
declare type RelatedConceptsJSON = {
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON,
    concept: LinkJSON
  },
  filter: {
    datefilter: EntryDateFilterJSON
  }
};

declare type RelatedConceptsContributionsJSONResponse = {
  relatedConcepts: RelatedConceptsContributionsJSON
};
declare type RelatedConceptsContributionsJSON = {
  label: string,
  resourcetype: "relatedConcepts"
};

declare type ConceptTypeJSONResponse = {
  concepttype: ConceptTypeJSON
};
declare type ConceptTypeJSON = {
  _id: string,
  label?: string | null,
  icon?: string | null,
  textColor?: string | null,
  lineColor?: string | null,
  backgroundColor?: string | null,
  coreTaxonomy?: string | null,
  textFragmentTypes?: Array<textFragmentType>,
  sectionReferenceTypes?: Array<sectionReferenceType>,
  propertyTypes?: Array<propertyType>,
  labelTypes: Array<labelType>,
  _links: {
    self: LinkJSON,
    api_doc: LinkJSON,
    contributions: LinkJSON
  }
};
declare type textFragmentType = {
  _id: string,
  label: string,
  maximumAmountOfCharacters: string
};
declare type sectionReferenceType = {
  _id: string,
  label: string
};
declare type propertyType = {
  _id: string,
  label: string
};
declare type labelType = {
  _id: string,
  label: string
};

declare type ConceptTypeContributionsJSONResponse = {
  concepttype: ConceptTypeJSON
};
declare type ConceptTypeContributionsJSON = {
  label: string,
  resourcetype: "ConceptTypeDetail",
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
