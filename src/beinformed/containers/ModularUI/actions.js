// @flow
import { MODULARUI } from "beinformed/redux/middleware/modularui";
import Href from "beinformed/models/href/Href";
import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";
import { handleError } from "beinformed/containers/Error/actions";

export type ModularUISuccessType = {
  type:
    | "MODULARUI/SET"
    | "MODULARUI/ADD"
    | "MODULARUI/REMOVE"
    | "MODULARUI/UPDATE",
  payload: {
    key: string,
    model?: any
  }
};

export const loadModel = (
  href: Href | string,
  targetModel?: any,
  successAction?: Function
) => {
  console.error(href);
  return {
    [MODULARUI]: {
      href: href instanceof Href ? href : new Href(href),
      targetModel,
      successAction: model =>
        successAction ? successAction(model) : setModel(model)
    }
  };
};

export const setModel = (model: any): ModularUISuccessType => ({
  type: "MODULARUI/SET",
  payload: model
});

export const updateModel = (model: any): ModularUISuccessType => ({
  type: "MODULARUI/UPDATE",
  payload: model
});

export const removeModel = (model: any): ModularUISuccessType => ({
  type: "MODULARUI/REMOVE",
  payload: model
});

export const resetModels = () => ({
  type: "MODULARUI/RESET"
});

export type updateStatusType = {
  type: "MODULARUI/STATUS",
  payload: {
    key: string,
    status: string
  }
};

export const updateStatus = (
  key: string,
  status: string
): updateStatusType => ({
  type: "MODULARUI/STATUS",
  payload: { key, status }
});

export const loadModularUI = (
  key: string,
  modularUIAction: Object
): ThunkAction => dispatch => {
  dispatch(updateStatus(key, "loading"));
  dispatch(startProgress());

  modularUIAction.key = key;

  return dispatch(modularUIAction)
    .then(() => {
      dispatch(finishProgress());
      return dispatch(updateStatus(key, "finished"));
    })
    .catch(err => dispatch(handleError(err)));
};

export const reloadModels = (): ThunkAction => (dispatch, getState) => {
  const models = getState().modularui.models;

  Object.keys(getState().modularui.models).forEach(modelHref => {
    const model = models[modelHref];

    if (model && model.selfhref && model.type !== "Form") {
      dispatch(loadModel(model.selfhref));
    } else if (model.type !== "Form") {
      dispatch(removeModel(model));
    }
  });
};
