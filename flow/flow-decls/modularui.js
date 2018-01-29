declare type ResourceModelInputType = {
  request?: Object,
  key?: string,
  data?: ModularuiDataJSON,
  contributions?: ModularuiContributionsJSON
};

declare type ModularuiDataJSON =
  | ApplicationJSON
  | TabJSON
  | UserJSON
  | FormJSON
  | CaseViewJSON
  | ListJSON
  | GroupingPanelJSON
  | ListDetailJSON
  | ListItemJSON
  | TaskgroupJSON
  | ModelCatalogJSON
  | ConceptSearchJSON
  | ConceptDetailJSON;

declare type ModularuiContributionsJSON =
  | ApplicationContributionsJSON
  | TabContributionsJSON
  | UserContributionsJSON
  | FormContributionsJSON
  | CaseViewContributionsJSON
  | ListContributionsJSON
  | GroupingPanelContributionsJSON
  | ListDetailContributionsJSON
  | ListItemContributionsJSON
  | TaskgroupContributionsJSON
  | ModelCatalogContributionsJSON
  | ConceptSearchContributionsJSON
  | ConceptDetailContributionsJSON;
