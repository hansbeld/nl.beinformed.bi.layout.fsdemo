// @flow
import { get } from "lodash";
import { push } from "react-router-redux";

import {
  LOGIN_PATH,
  LOGOUT_PATH,
  CHANGEPASSWORD_PATH,
  IS_SERVER
} from "beinformed/constants/Constants";

import ErrorResponse from "beinformed/models/error/ErrorResponse";

import { logoutSuccess } from "beinformed/containers/SignOut/actions";
import { showXHRErrorNotification } from "beinformed/containers/Notification/actions";
import { resetProgress } from "beinformed/containers/ProgressIndicator/actions";

import Cache from "beinformed/utils/browser/Cache";

import type FetchError from "beinformed/utils/fetch/FetchError";

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

  if (errorResponse.isUnauthorized) {
    dispatch(logoutSuccess());

    Cache.removeItem("auth");

    return dispatch(
      push({
        pathname: LOGIN_PATH,
        state: {
          from: getState().router.location,
          modal: isModal
        }
      })
    );
  }

  if (errorResponse.isBlocked) {
    push(LOGOUT_PATH);
  }

  if (errorResponse.isChangePassword) {
    return dispatch(
      push({
        pathname: CHANGEPASSWORD_PATH,
        state: {
          from: getState().router.location,
          modal: isModal
        }
      })
    );
  }

  if (IS_SERVER) {
    // eslint-disable-next-line no-console
    console.error(JSON.stringify(error));
  } else {
    // eslint-disable-next-line no-console
    setTimeout(() => {
      throw error;
    });
  }

  return dispatch(showXHRErrorNotification(errorResponse));
};
