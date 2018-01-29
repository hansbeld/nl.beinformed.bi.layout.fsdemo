// @flow
import ModularUIRequest from "beinformed/utils/modularui/ModularUIRequest";
import { HTTP_METHODS } from "beinformed/constants/Constants";

import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";

import { handleError } from "beinformed/containers/Error/actions";

// import { locationChange } from "beinformed/modules/Router/redux/RouterActions";

/**
 * Symbol key that carries API call info interpreted by this Redux middleware.
 */
const MODULARUI = Symbol("Fetch ModularUI");
export { MODULARUI };

const isModularUIAction = action => action && action.hasOwnProperty(MODULARUI);

const modularuiMiddleware = store => next => action => {
  if (!isModularUIAction(action)) {
    return next(action);
  }

  const dispatch = store.dispatch;
  const modularui = action[MODULARUI];

  dispatch(startProgress("MODULARUI"));

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
  const nextAction = modularui.nextAction;

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
              `Result of successResult is not a valid redux action:\n\n${successResult} `,
              err
            );
          }
        }
      }

      if (nextAction) {
        const nextResult = nextAction(model, dispatch);

        if (nextResult !== null) {
          if (nextResult instanceof Promise) {
            // eslint-disable-next-line promise/no-nesting
            nextResult.then(result => dispatch(result)).catch(err => {
              dispatch(finishProgress());

              // eslint-disable-next-line promise/no-callback-in-promise
              return next(handleError(err, modularui));
            });
          } else {
            try {
              dispatch(nextResult);
            } catch (err) {
              throw new Error(
                `Result of nextAction is not a valid redux action:\n\n${nextResult}`,
                err
              );
            }
          }
        }
      }

      // eslint-disable-next-line promise/no-callback-in-promise
      return next(finishProgress());
    })
    .catch(err => {
      dispatch(finishProgress());

      // eslint-disable-next-line promise/no-callback-in-promise
      return next(handleError(err, modularui));
    });
};

export default modularuiMiddleware;
