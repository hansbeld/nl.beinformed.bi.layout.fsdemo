// @flow
import { push } from "react-router-redux";

import { MODULARUI } from "beinformed/redux/middleware/modularui";
import { HTTP_METHODS } from "beinformed/constants/Constants";

import { modelSelector } from "beinformed/containers/ModularUI/selectors";
import { loadModel, setModel } from "beinformed/containers/ModularUI/actions";

import FormModel from "beinformed/models/form/FormModel";
import ListModel from "beinformed/models/list/ListModel";
import CaseViewModel from "beinformed/models/caseview/CaseViewModel";

import Href from "beinformed/models/href/Href";

import { retrieveAttributeInput } from "fsdemo/utils/AttributeInputCache";

import type ActionModel from "beinformed/models/actions/ActionModel";

export const navigateApplyForMortgageAction = (
  action: ActionModel
): ThunkAction => dispatch => dispatch(startMortgageApplication(action, false));

const updateMortgageApplication = (
  currentCaseview: CaseViewModel,
  nextPanelHref: Href
) => ({
  [MODULARUI]: {
    href: currentCaseview.selflink.href,
    childmodels: false,
    targetModel: CaseViewModel,
    successAction: caseview => setModel(caseview),
    nextAction: push(nextPanelHref.toString())
  }
});

/**
 * Start an action
 */
const startMortgageApplication = (
  action: ActionModel,
  isCaseView: boolean
): ThunkAction => (dispatch, getState) => {
  const formHref = action.selfhref;
  formHref.setParameter("commit", "true");

  return dispatch({
    [MODULARUI]: {
      href: formHref,
      method: HTTP_METHODS.POST,
      targetModel: FormModel,
      successAction: model => {
        const form = model.clone();
        form.initAction = action;

        form.parameters = action.selfhref.parameters;

        if (form.isFinished) {
          if (isCaseView) {
            console.info("HIER?");
            return dispatch(
              loadModel(
                form.successRedirect.toString(),
                CaseViewModel,
                loadedModel => {
                  dispatch(setModel(loadedModel));
                  return push(form.successRedirect.toString());
                }
              )
            );
          }

          if (form.key === "SubmitApplication" && form.isFinished) {
            return push({
              pathname: "/application-submitted",
              state: {
                reload: true
              }
            });
          }

          return updateMortgageApplication(
            getState().caseview,
            form.successRedirect
          );
        }

        return setModel(form);
      }
    }
  });
};

const retrieveMortgageApplication = mortgageForm => ({
  [MODULARUI]: {
    href: new Href("/applications/applications"),
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

      return startMortgageApplication(createApplicationAction, true);
    }
  }
});

export const applyForMortgageAction = (mortgageForm): ThunkAction => dispatch =>
  dispatch(retrieveMortgageApplication(mortgageForm));

/**
 * Start application form / caseview
 * First retrieve applications list to get application form.
 * Then add earlier input from total cost form to request parameters of form and create application.
 * Form will redirect to application caseview.
 */
export const startApplication = (caseview): ThunkAction => (
  dispatch,
  getState
) => {
  if (caseview) {
    return dispatch(loadModel(caseview.selfhref, CaseViewModel));
  }

  return dispatch({
    [MODULARUI]: {
      href: new Href("/apply-for-a-mortgage/applications"),
      targetModel: ListModel,
      successAction: model => {
        const mortgageForm = modelSelector(
          getState,
          "/mortgage-calculators/calculators/calculate-total-cost-of-mortgage"
        );

        const createApplicationAction = model.actionCollection.first;
        if (mortgageForm) {
          createApplicationAction.fieldCollection.all.forEach(field => {
            const attribute = mortgageForm.findAttribute(
              findAttribute => findAttribute.key === field.key
            );
            const value = attribute
              ? attribute.value
              : retrieveAttributeInput(field.key) || "";
            field.update(value);
          });
        }
        return startMortgageApplication(createApplicationAction, true);
      }
    }
  });
};
