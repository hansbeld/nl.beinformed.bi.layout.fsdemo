// @flow
import ModularUIRequest from "beinformed/modularui/ModularUIRequest";
import { HTTP_METHODS } from "beinformed/constants/Constants";

import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";

import { handleError } from "beinformed/containers/Error/actions";

/**
 * Symbol key that carries API call info interpreted by this Redux middleware.
 */
export const MODULARUI = "@@MODULARUI";

const isModularUIAction = action => action && action.hasOwnProperty(MODULARUI);

const modularuiMiddleware = store => next => action => {
  if (!isModularUIAction(action)) {
    return next(action);
  }

  const dispatch = store.dispatch;
  const modularui = action[MODULARUI];

  dispatch(startProgress());

  const modularuiRequest = new ModularUIRequest(modularui.href, {
    method: modularui.method || HTTP_METHODS.GET,
    data: modularui.data || {},
    childmodels: modularui.hasOwnProperty("childmodels")
      ? modularui.childmodels
      : true
  });

  modularuiRequest.locale = store.getState().i18n.locale;
  modularuiRequest.targetModel = modularui.targetModel;

  const successAction = modularui.successAction;
  const errorAction = modularui.errorAction;

  return modularuiRequest
    .fetch()
    .then(model => {
      if (successAction) {
        const successResult = successAction(model);

        if (successResult instanceof Promise) {
          // eslint-disable-next-line promise/no-nesting
          successResult
            .then(result => dispatch(result))

            // eslint-disable-next-line promise/no-callback-in-promise
            .catch(err => next(handleError(err)));
        } else {
          try {
            dispatch(successResult);
          } catch (err) {
            throw new Error(
              `Result of successResult is not a valid redux action: ${err}`
            );
          }
        }
      }

      // eslint-disable-next-line promise/no-callback-in-promise
      return next(finishProgress(model));
    })
    .catch(err => {
      dispatch(finishProgress());

      if (errorAction) {
        const errorResult = errorAction(err);

        if (errorResult instanceof Promise) {
          // eslint-disable-next-line promise/no-nesting
          errorResult.then(result => dispatch(result));
        } else {
          dispatch(errorResult);
        }
      }

      // eslint-disable-next-line promise/no-callback-in-promise
      return next(handleError(err));
    });
};

export default modularuiMiddleware;
