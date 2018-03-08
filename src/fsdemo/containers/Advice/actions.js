// @flow
import { MODULARUI } from "beinformed/redux/middleware/modularui";

import { updateFormAttribute as defaultUpdateFormAttribute } from "beinformed/containers/Form/actions";

import { updateModel } from "beinformed/modularui";

import { FormModel } from "beinformed/models";

import { storeAttributeInput } from "fsdemo/utils/AttributeInputCache";

const getEndResultAction = (form: FormModel) => {
  // make copy of old form
  const updatedForm: FormModel = form.clone();

  if (updatedForm.isChanged()) {
    storeAttributeInput(updatedForm);
  }

  return {
    [MODULARUI]: {
      href: form.selfhref,
      method: "post",
      data: form.formdata,
      targetModel: FormModel,
      successAction: receivedForm => {
        // handle errors
        if ("errors" in receivedForm.data) {
          updatedForm.handleErrors(receivedForm);
        }

        // handle missing attributes
        if (
          "missing" in receivedForm.data &&
          receivedForm.data.missing !== null
        ) {
          updatedForm.handleMissing(receivedForm);
        }

        updatedForm.allEndResultObjects = receivedForm.allEndResultObjects;

        storeAttributeInput(updatedForm);

        return updateModel(updatedForm);
      }
    }
  };
};

export const getEndResult = (form: FormModel): ThunkAction => dispatch =>
  dispatch(getEndResultAction(form));

export const updateFormAttribute = (
  form,
  formObject,
  attribute,
  inputvalue
): ThunkAction => dispatch => {
  const newForm = form.clone();

  // To provide one page with two questions:
  // When attribute is Mortgage choice and currently we are not on the question with this attribute, then first go back
  if (attribute.key === "MortgageProductPackage") {
    if (!newForm.missingObjects.has(formObject.key)) {
      newForm.setPreviousObject();
      if (!newForm.missingObjects.has(formObject.key)) {
        newForm.setPreviousObject();
      }

      newForm.missingObjects
        .get(formObject.key)
        .updateAttribute(attribute, inputvalue);

      return dispatch(getEndResultAction(newForm));
    }

    dispatch(
      defaultUpdateFormAttribute(form, formObject, attribute, inputvalue)
    );

    return dispatch(getEndResultAction(form));
  }

  return dispatch(
    defaultUpdateFormAttribute(newForm, formObject, attribute, inputvalue)
  );
};
