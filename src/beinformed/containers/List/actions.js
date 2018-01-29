// @flow
import { push, replace } from "react-router-redux";

import { MODULARUI } from "beinformed/redux/middleware/modularui";

import Href from "beinformed/models/href/Href";

import ListModel from "beinformed/models/list/ListModel";
import ListDetailModel from "beinformed/models/list/ListDetailModel";

import { updateModel } from "beinformed/containers/ModularUI/actions";

/**
 * Receive a list
 */
export const receiveList = (list: ListModel) => updateModel(list);

/**
 * Request a list
 */
export const requestList = (href: Href): ThunkAction => (
  dispatch,
  getState
) => {
  dispatch(
    replace({
      ...getState().router.location,
      state: null
    })
  );

  return dispatch(push(href.toString(), { reload: true }));
};

/**
 * Goto a list item
 */
const gotoListItemAction = (list, detailHref) => ({
  [MODULARUI]: {
    href: detailHref,
    targetModel: ListDetailModel,
    successAction: listDetail => {
      const listWithDetail = list.clone();
      listWithDetail.detail = listDetail;
      return updateModel(listWithDetail);
    }
  }
});

export const loadListItem = (
  list: ListModel,
  href: Href
): ThunkAction => dispatch => dispatch(gotoListItemAction(list, href));

/**
 * Change page number
 */
export const updatePaging = (href: Href) => requestList(href);

/**
 * Change page size
 */
export const updatePageSize = (href: Href) => requestList(href);

/**
 * Handle sort change
 */
export const updateSorting = (href: Href) => requestList(href);
