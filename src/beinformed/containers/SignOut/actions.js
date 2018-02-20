// @flow
import Cache from "beinformed/utils/browser/Cache";
import Authenticate from "beinformed/utils/modularui/Authenticate";

import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";

export type logoutSuccessType = {
  type: "AUTHENTICATION_LOGOUT"
};

/**
 * Send logout success action
 */
export const logoutSuccess = (): logoutSuccessType => ({
  type: "AUTHENTICATION_LOGOUT"
});

export const logout = (): ThunkAction => dispatch => {
  dispatch(startProgress());

  return new Authenticate().logout().then(() => {
    Cache.removeItem("auth");

    dispatch(logoutSuccess());

    return dispatch(finishProgress());
  });
};
