// @flow
import { loadModularUI } from "beinformed/containers/ModularUI/actions";

import { updateModel } from "beinformed/containers/ModularUI/actions";
import FormModel from "beinformed/models/form/FormModel";

import type FormObjectModel from "beinformed/models/form/FormObjectModel";
import { HTTP_METHODS } from "beinformed/constants/Constants";

/**
 * Update an attribute on a form
 */
export const updateFormAttribute = (
  form: FormModel,
  formObject: FormObjectModel,
  attribute: AttributeType,
  inputvalue: string
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

  if (newForm.isValid) {
    return loadModularUI(newForm.connectKey, newForm.selfhref, {
      propName: "form",
      method: HTTP_METHODS.POST,
      data: newForm.formdata,
      updateModel: newForm
    });
  }

  return updateModel(newForm);
};
