// @flow
// import { fetchAction } from "beinformed/containers/Form/FormActions";
import { push } from "react-router-redux";
import type ActionModel from "beinformed/models/actions/ActionModel";

export type selectAllListItemsType = {
  type: "SELECT_ALL_LIST_ITEMS",
  payload: number[]
};
export type selectListItemType = {
  type: "SELECT_LIST_ITEM",
  payload: number
};

/**
 * Select all items in a list
 */
const selectAllListItems = (ids: number[]): ThunkAction => dispatch =>
  dispatch({
    type: "SELECT_ALL_LIST_ITEMS",
    payload: ids
  });

/**
 * Select a list item, when it is a multi row task list
 */
const selectListItem = (id: number): ThunkAction => dispatch =>
  dispatch({
    type: "SELECT_LIST_ITEM",
    payload: id
  });

/**
 * Start an action that has the MULTI_ROW_TASK layout hint
 */
const startMultiAction = (
  action: ActionModel,
  selectedItems: string[]
): ThunkAction => dispatch => {
  if (!action.fieldCollection.first) {
    throw new Error("Field collection is empty, cannot start multiple action");
  }

  const parameterName = action.fieldCollection.first.name;
  action.selfhref = action.selfhref.addParameter(
    parameterName,
    selectedItems.join(",")
  );

  return dispatch(
    push(action.selfhref.toString(), { modal: true, href: action.selfhref })
  );
};

export { selectListItem, selectAllListItems, startMultiAction };
