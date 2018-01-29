// @flow
import { push } from "react-router-redux";

import { loadModel } from "beinformed/containers/ModularUI/actions";

import CaseSearchModel from "beinformed/models/search/CaseSearchModel";

import type FilterModel from "beinformed/models/filters/FilterModel";

/**
 * Create href for search
 */
const createSearchHref = (searchModel, filter, value) => {
  const newSearch = searchModel.clone();

  newSearch.filterCollection.reset();
  newSearch.filterCollection.update(filter.attribute, value);
  if (!newSearch.filterCollection.isValid) {
    return false;
  }

  const searchHref = newSearch.selfhref;

  searchHref.page = 1;
  searchHref.filterCollection = newSearch.filterCollection;

  return searchHref;
};

/**
 * Do search
 */
export const search = (
  searchModel: CaseSearchModel,
  filter: FilterModel,
  value: string
): ThunkAction => dispatch => {
  const searchHref = createSearchHref(searchModel, filter, value);

  return searchHref ? dispatch(push(searchHref.toString())) : false;
};

/**
 * Do quick search
 */
export const quicksearch = (
  searchModel: CaseSearchModel,
  filter: FilterModel,
  value: string
): ThunkAction => dispatch => {
  const searchHref = createSearchHref(searchModel, filter, value);

  if (searchHref) {
    return dispatch(loadModel(searchHref, CaseSearchModel));
  }

  return false;
};
