// @flow
import { push, goBack } from "react-router-redux";

import { MODULARUI } from "beinformed/redux/middleware/modularui";

import FormModel from "beinformed/models/form/FormModel";

import { showFormNotification } from "beinformed/containers/Notification/actions";
import {
  updateModel,
  removeModel,
  loadModularUI
} from "beinformed/containers/ModularUI/actions";

import {
  NOTIFY,
  FORM_FINISH_RETURN_RELOAD_LIST
} from "beinformed/constants/LayoutHints";

import type FormObjectModel from "beinformed/models/form/FormObjectModel";
import { HTTP_METHODS } from "beinformed/constants/Constants";

export type previousFormType = {
  type: "RECEIVE_PREVIOUS_FORM",
  payload: FormModel
};
export type updateAttributeType = {
  type: "UPDATE_FORM_ATTRIBUTE",
  payload: FormModel
};

/**
 * Handles actions that need to be performed when a form successfully finishes,
 * like update of models, notification messages, etc.
 */
export const handleFormFinish = (form: FormModel): ThunkAction => dispatch => {
  if (form.layouthint.has(NOTIFY)) {
    dispatch(showFormNotification(form));
  }

  dispatch(removeModel(form));

  if (form.successAction) {
    return dispatch({
      [MODULARUI]: form.successAction
    });
  }

  if (form.redirectLocation) {
    return dispatch(push(form.redirectLocation));
  }

  const successRedirect = form.successRedirect;

  if (successRedirect && !form.layouthint.has(FORM_FINISH_RETURN_RELOAD_LIST)) {
    return dispatch(
      push({
        pathname: successRedirect.toString(),
        state: {
          reload: true
        }
      })
    );
  }

  return dispatch(goBack());
};

/**
 * Go back to previous object (back button on form)
 */
export const previousObject = (form: FormModel): ThunkAction => dispatch => {
  const newForm = form.clone();

  newForm.setPreviousObject();

  return dispatch(updateModel(newForm));
};

/**
 * Update an attribute on a form
 */
export const updateFormAttribute = (
  form: FormModel,
  formObject: FormObjectModel,
  attribute: AttributeType,
  inputvalue: string,
  autosubmit: boolean = false
) => {
  const newForm = form.clone();

  if (newForm.missingObjects.has(formObject.key)) {
    newForm.missingObjects
      .get(formObject.key)
      .updateAttribute(attribute, inputvalue);
  } else {
    newForm.completeObjects.forEach(completeObject => {
      if (completeObject.has(formObject.key)) {
        completeObject
          .get(formObject.key)
          .updateAttribute(attribute, inputvalue);
      }
    });
  }

  if (autosubmit && newForm.isValid) {
    return loadModularUI(newForm.connectKey, newForm.selfhref, {
      propName: "form",
      method: HTTP_METHODS.POST,
      data: newForm.formdata,
      updateModel: newForm
    });
  }

  return updateModel(newForm);
};
