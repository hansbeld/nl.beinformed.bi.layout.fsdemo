// @flow
import { get } from "lodash";
import { push } from "react-router-redux";

import {
  LOGIN_PATH,
  LOGOUT_PATH,
  CHANGEPASSWORD_PATH,
  IS_SERVER
} from "beinformed/constants/Constants";

import { ErrorResponse } from "beinformed/models";

import { logoutSuccess } from "beinformed/containers/SignOut/actions";
import { showXHRErrorNotification } from "beinformed/containers/Notification/actions";
import { resetProgress } from "beinformed/containers/ProgressIndicator/actions";

import Cache from "beinformed/utils/browser/Cache";

import type FetchError from "beinformed/utils/fetch/FetchError";
import { changePassword } from "beinformed/containers/SignIn/actions";

export type saveErrorType = {
  type: "SAVE_ERROR",
  payload: Error | FetchError
};

const saveError = (error: Error | FetchError): saveErrorType => ({
  type: "SAVE_ERROR",
  payload: error
});

/**
 * Handle errors by sending an error notification message
 */
export const handleError = (error: Error | FetchError): ThunkAction => (
  dispatch,
  getState
) => {
  dispatch(resetProgress());

  const errorResponse = new ErrorResponse(error);

  const isModal = get(getState().router.location, "state.modal");
  const locationFrom = get(getState().router.location, "state.from");

  if (errorResponse.isUnauthorized) {
    dispatch(logoutSuccess());

    Cache.removeItem("auth");

    return dispatch(
      push({
        pathname: LOGIN_PATH,
        state: {
          from: locationFrom ? locationFrom : getState().router.location,
          modal: isModal
        }
      })
    );
  }

  if (errorResponse.isBlocked || errorResponse.isConcurrentUser) {
    dispatch(push(LOGOUT_PATH));
  }

  if (errorResponse.isChangePassword) {
    dispatch(changePassword());

    return dispatch(
      push({
        pathname: CHANGEPASSWORD_PATH,
        state: {
          from: locationFrom ? locationFrom : getState().router.location,
          modal: isModal
        }
      })
    );
  }

  if (IS_SERVER) {
    // eslint-disable-next-line no-console
    console.error(error);
    return dispatch(saveError(error));
  }

  setTimeout(() => {
    throw error;
  });

  return dispatch(showXHRErrorNotification(errorResponse));
};
