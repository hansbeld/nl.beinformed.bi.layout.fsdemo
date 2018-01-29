// @flow
import { push, goBack } from "react-router-redux";

import { MODULARUI } from "beinformed/redux/middleware/modularui";
import { HTTP_METHODS } from "beinformed/constants/Constants";

import FormModel from "beinformed/models/form/FormModel";

import { showFormNotification } from "beinformed/containers/Notification/actions";
import {
  setModel,
  updateModel,
  removeModel
} from "beinformed/containers/ModularUI/actions";

import {
  NOTIFY,
  FORM_FINISH_RETURN_RELOAD_LIST
} from "beinformed/constants/LayoutHints";

import type FormObjectModel from "beinformed/models/form/FormObjectModel";
import type Href from "beinformed/models/href/Href";
import type { Location } from "react-router-redux";

export type previousFormType = {
  type: "RECEIVE_PREVIOUS_FORM",
  payload: FormModel
};
export type updateAttributeType = {
  type: "UPDATE_FORM_ATTRIBUTE",
  payload: FormModel
};

/**
 * Cancel a form
 */
export const cancelForm = (form: FormModel) => removeModel(form);

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
 * Updates an old form model with a new form model
 */
const updateForm = (oldform: FormModel, newform: FormModel) => {
  // make copy of old form
  const updatedForm: FormModel = oldform.clone();

  /*
   * update new self link with old self link including action fields to keep the request parameters.
   * We'll need to decide how to get these request params from the services
   */
  updatedForm.update(newform);
  updatedForm.links.update(oldform.selflink);

  return setModel(updatedForm);
};

export const submitFormAction = (submitForm: FormModel) => {
  /*
   * when rendering an end result without other questions,
   * then this form submit must be commited
   */
  if (submitForm.isResultOnly) {
    submitForm.commit = true;
  }

  return {
    [MODULARUI]: {
      href: submitForm.selfhref,
      method: HTTP_METHODS.POST,
      data: submitForm.formdata,
      targetModel: FormModel,
      successAction: receivedForm => {
        receivedForm.successAction = submitForm.successAction;
        receivedForm.redirectLocation = submitForm.redirectLocation;

        if (receivedForm.isResultOnly && !submitForm.commit) {
          return updateForm(submitForm, receivedForm);
        }

        return receivedForm.isFinished
          ? handleFormFinish(receivedForm)
          : updateForm(submitForm, receivedForm);
      }
    }
  };
};

export const submitForm = (form: FormModel): ThunkAction => dispatch =>
  dispatch(submitFormAction(form));

/**
 * Update an attribute on a form
 */
export const updateFormAttribute = (
  form: FormModel,
  formObject: FormObjectModel,
  attribute: AttributeType,
  inputvalue: string,
  submitAfterUpdate: boolean = false
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

  if (
    submitAfterUpdate &&
    newForm.missingObjects.all.filter(missingObject => {
      const hasEmptyAttribute =
        missingObject.attributeCollection.all.filter(
          missingAttribute => missingAttribute.value === null
        ).length > 0;

      return hasEmptyAttribute;
    }).length === 0
  ) {
    return submitFormAction(newForm);
  }
  return setModel(newForm);
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
 * Start an action
 */
export const fetchForm = (href: Href, successRedirect?: Location) => ({
  [MODULARUI]: {
    href,
    method: HTTP_METHODS.POST,
    targetModel: FormModel,
    successAction: model => {
      const form = model.clone();

      if (successRedirect) {
        form.redirectLocation = successRedirect;
      }

      form.parameters = href.parameters;

      if (form.isComplete && !form.hasResultConfiguration) {
        return submitForm(form);
      }

      if (form.isFinished) {
        return handleFormFinish(form);
      }

      return setModel(form);
    }
  }
});
