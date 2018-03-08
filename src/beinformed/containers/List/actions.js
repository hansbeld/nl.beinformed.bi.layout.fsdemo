// @flow
import { push, replace } from "react-router-redux";

import { MODULARUI } from "beinformed/redux/middleware/modularui";

import { ListDetailModel, Href } from "beinformed/models";

import { updateModel } from "beinformed/modularui";

import type { ListModel, ListHref } from "beinformed/models";

/**
 * Receive a list
 */
export const receiveList = (list: ListModel) => updateModel(list);

/**
 * Request a list
 */
export const requestList = (href: ListHref): ThunkAction => (
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
