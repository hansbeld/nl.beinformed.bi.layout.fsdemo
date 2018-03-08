// @flow
import { isFunction } from "lodash";

import { MODULARUI } from "beinformed/redux/middleware/modularui";
import { Href } from "beinformed/models";
import {
  finishProgress,
  startProgress
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

export type ModularUIRemoveKeyType = {
  type: "MODULARUI/REMOVE_KEY",
  payload: string
};

export type updateStatusType = {
  type: "MODULARUI/STATUS",
  payload: {
    key: string,
    status: string
  }
};

export const loadModel = (
  key: string,
  href: string | Href,
  options?: Object = {}
) => ({
  [MODULARUI]: Object.assign(
    {
      href: href instanceof Href ? href : new Href(href),
      successAction: (model: any) => {
        if (options && options.updateModel) {
          if (isFunction(options.updateModel.update)) {
            const clonedModel = options.updateModel.clone();
            clonedModel.update(model);

            return updateModel(clonedModel);
          }

          throw new Error(
            `updateModel is set as option for ${key}, but the model is missing an update methode`
          );
        }
        return setModel(key, model);
      },
      errorAction: () => updateStatus(key, "error")
    },
    options
  )
});

export const setModel = (key: string, model: any): ModularUISuccessType => {
  // set key on model for later reference
  model.connectKey = key;
  return {
    type: "MODULARUI/SET",
    payload: {
      key,
      model
    }
  };
};

export const updateModel = (model: any): ModularUISuccessType => ({
  type: "MODULARUI/UPDATE",
  payload: model
});

export const removeModel = (model: any): ModularUISuccessType => ({
  type: "MODULARUI/REMOVE",
  payload: model
});

export const removeModelByKey = (key: string): ModularUIRemoveKeyType => ({
  type: "MODULARUI/REMOVE_KEY",
  payload: key
});

export const updateStatus = (
  key: string,
  status: string
): updateStatusType => ({
  type: "MODULARUI/STATUS",
  payload: { key, status }
});

export const loadModularUI = (
  key: string,
  href: string | Href,
  options: Object
): ThunkAction => dispatch => {
  dispatch(updateStatus(key, "loading"));
  dispatch(startProgress());

  return dispatch(loadModel(key, href, options))
    .then(response => {
      if (response) {
        dispatch(finishProgress());

        return dispatch(updateStatus(key, "finished"));
      }

      return dispatch(finishProgress());
    })
    .catch(err => dispatch(handleError(err)));
};
