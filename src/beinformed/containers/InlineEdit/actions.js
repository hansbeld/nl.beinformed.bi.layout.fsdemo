// @flow
import { MODULARUI } from "beinformed/redux/middleware/modularui";
import { HTTP_METHODS } from "beinformed/constants/Constants";

import {
  loadModel,
  updateModel
} from "beinformed/containers/ModularUI/actions";

import { handleFormFinish } from "beinformed/containers/Form/actions";

import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";

import type EditableListModel from "beinformed/models/list/EditableListModel";
import type EditableListItemModel from "beinformed/models/list/EditableListItemModel";

// ACTIONS

/**
 * Update attribute on a list
 */
export const updateEditableListAttribute = (
  list: EditableListModel,
  listitem: EditableListItemModel,
  attribute: AttributeType,
  inputvalue: string
): ThunkAction => dispatch => {
  dispatch(startProgress());
  const newList = list.clone();

  // update attribute
  const newListItem = listitem.clone();

  newListItem.errormessages = [];
  newListItem.updateEditableAttribute(attribute, inputvalue);

  newList.replaceListItem(listitem, newListItem);

  dispatch(updateModel(newList));

  return dispatch(finishProgress());
};

const createUpdateActionHref = (updateAction, listitem) => {
  updateAction.fields.forEach(field => {
    const listitemAttribute = listitem.getAttributeByKey(field.key);

    if (listitemAttribute) {
      updateAction.fieldCollection.replace(field, listitemAttribute);
    }
  });

  return updateAction.selfhref;
};

const getFormData = (form, listitem) => {
  form.missingObjects.all.forEach(formObject => {
    formObject.attributeCollection.all.forEach(attribute => {
      const listitemAttribute = listitem.getAttributeByKey(attribute.key);

      if (
        listitemAttribute &&
        attribute.inputvalue !== listitemAttribute.inputvalue
      ) {
        formObject.updateAttribute(
          listitemAttribute,
          listitemAttribute.inputvalue
        );
      }
    });
  });

  return form.formdata;
};

/**
 * Save editable list items by updating the inline edit action being used
 */
export const saveEditableListItem = (
  list: EditableListModel,
  listitem: EditableListItemModel
): ThunkAction => dispatch => {
  const updateAction = listitem.saveAction;

  if (!updateAction) {
    throw new Error("No update action available to save editable list item");
  }

  const updateActionHref = createUpdateActionHref(updateAction, listitem);

  const updateActionHrefWithCommit = updateAction.selfhref;
  updateActionHrefWithCommit.setParameter("commit", "true");

  return dispatch({
    [MODULARUI]: {
      href: updateActionHref,
      method: HTTP_METHODS.POST,
      data: {},
      successAction: form => ({
        [MODULARUI]: {
          href: updateActionHrefWithCommit,
          method: HTTP_METHODS.POST,
          data: getFormData(form, listitem),
          successAction: receivedForm => {
            dispatch(loadModel(list.selfhref));

            return handleFormFinish(receivedForm);
          }
        }
      })
    }
  });
};

/**
 * Cancel the editing of a list item
 */
export const cancelEditableListItem = (
  list: EditableListModel
): ThunkAction => dispatch => dispatch(loadModel(list.selfhref));
