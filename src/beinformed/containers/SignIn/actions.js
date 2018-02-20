// @flow
import Cache from "beinformed/utils/browser/Cache";
import Authenticate from "beinformed/utils/modularui/Authenticate";

import { reloadApplication } from "beinformed/containers/Application/actions";

import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";

export type loginFailedType = {
  type: "AUTHENTICATION_ERROR",
  payload: string
};

export type loginSuccessType = {
  type: "AUTHENTICATION_SUCCESS"
};

export type changePasswordType = {
  type: "CHANGE_PASSWORD"
};

/**
 * Send login failed action
 */
export const loginFailed = (errorMessage: string): loginFailedType => ({
  type: "AUTHENTICATION_ERROR",
  payload: errorMessage
});

/**
 * Send login success action
 */
export const loginSuccess = (): loginSuccessType => ({
  type: "AUTHENTICATION_SUCCESS"
});

/**
 * Send change password action
 */
export const changePassword = (): changePasswordType => ({
  type: "CHANGE_PASSWORD"
});

export const login = (
  username: string,
  password: string
): ThunkAction => dispatch => {
  dispatch(startProgress());

  return new Authenticate()
    .login(username, password)
    .then(() => {
      Cache.addItem("auth", true);
      dispatch(loginSuccess());

      return dispatch(finishProgress());
    })
    .catch(err => {
      if (err.id === "Error.ChangePasswordRequired") {
        // eslint-disable-next-line promise/no-nesting
        return dispatch(reloadApplication())
          .then(() => {
            Cache.addItem("auth", true);
            return dispatch(changePassword());
          })
          .then(() => dispatch(finishProgress()));
      }

      dispatch(loginFailed(err.id));
      return dispatch(finishProgress());
    });
};
