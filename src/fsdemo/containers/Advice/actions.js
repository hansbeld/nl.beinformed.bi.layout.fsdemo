// @flow
import { MODULARUI } from "beinformed/redux/middleware/modularui";
import { HTTP_METHODS } from "beinformed/constants/Constants";

import {
  handleFormFinish,
  submitForm,
  updateFormAttribute as defaultUpdateFormAttribute
} from "beinformed/containers/Form/actions";

import { setModel, updateModel } from "beinformed/containers/ModularUI/actions";

import FormModel from "beinformed/models/form/FormModel";

import { storeAttributeInput } from "fsdemo/utils/AttributeInputCache";

const MORTGAGE_OBJECT_KEY = "Mortgage";
const MORTGAGE_PRODUCT_PACKAGE_KEY = "MortgageProductPackage";

export const startInstrument = (href: Href) => ({
  [MODULARUI]: {
    href,
    method: HTTP_METHODS.POST,
    targetModel: FormModel,
    successAction: model => {
      const form = model.clone();

      form.parameters = href.parameters;

      // Submit first question when it is Mortgage and has an non empty attribute MortgageProductPackage
      if (form.missingObjects.has(MORTGAGE_OBJECT_KEY)) {
        const mortgageObject = form.missingObjects.get(MORTGAGE_OBJECT_KEY);

        if (
          mortgageObject.attributeCollection.hasAttributeByKey(
            MORTGAGE_PRODUCT_PACKAGE_KEY
          ) &&
          mortgageObject.attributeCollection.getAttributeByKey(
            MORTGAGE_PRODUCT_PACKAGE_KEY
          ).value !== null
        ) {
          return submitForm(form);
        }
      }

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
