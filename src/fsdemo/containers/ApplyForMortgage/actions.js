// @flow
import { push } from "react-router-redux";

import { MODULARUI } from "beinformed/redux/middleware/modularui";

import { Href, ListModel } from "beinformed/models";

import { retrieveAttributeInput } from "fsdemo/utils/AttributeInputCache";

const retrieveMortgageApplication = mortgageForm => ({
  [MODULARUI]: {
    href: new Href("/apply-for-a-mortgage/applications"),
    targetModel: ListModel,
    successAction: model => {
      const createApplicationAction = model.actionCollection.first;
      createApplicationAction.fieldCollection.all.forEach(field => {
        const attribute = mortgageForm.findAttribute(
          findAttribute => findAttribute.key === field.key
        );
        const value = attribute
          ? attribute.value
          : retrieveAttributeInput(field.key) || "";
        field.update(value);
      });

      return push(createApplicationAction.selfhref.toString());
    }
  }
});

export const applyForMortgageAction = (mortgageForm): ThunkAction => dispatch =>
  dispatch(retrieveMortgageApplication(mortgageForm));
