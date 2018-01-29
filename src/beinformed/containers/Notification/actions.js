// @flow
import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";

import {
  HIDE_NOTIFICATION_TIMEOUT,
  NOTIFICATION_MSG_MAP,
  NOTIFICATION_TYPES
} from "beinformed/constants/Constants";
import { NOTIFY } from "beinformed/constants/LayoutHints";
import type FormModel from "beinformed/models/form/FormModel";
import type ErrorResponse from "beinformed/models/error/ErrorResponse";

export type dismissNotificationType = {
  type: "DISMISS_NOTIFICATION"
};
export type showNotificationActionType = {
  type: "SHOW_NOTIFICATION",
  payload: {
    type: NotificationTypes,
    message: {
      id: string | null,
      defaultMessage?: string | null,
      parameters?: Object | null
    },
    error?: ErrorResponse
  }
};

/**
 * Dismiss notification message
 */
export const dismissNotification = (): dismissNotificationType => ({
  type: "DISMISS_NOTIFICATION"
});

// eslint-disable-next-line max-params
export const showNotification = (
  type: NotificationTypes,
  message: {
    id: string | null,
    defaultMessage?: string | null,
    parameters?: Object | null
  },
  error?: ErrorResponse | null,
  timeout?: number
): ThunkAction => dispatch => {
  dispatch({
    type: "SHOW_NOTIFICATION",
    payload: {
      type,
      message,
      error
    }
  });

  if (timeout) {
    setTimeout(() => {
      dispatch(dismissNotification());
    }, timeout);
  }
};

/**
 * Show form notification
 */
export const showFormNotification = (
  form: FormModel
): ThunkAction => dispatch => {
  dispatch(startProgress());

  if (form.layouthint.has(NOTIFY)) {
    // TODO SBO: Add correct notification type
    dispatch(
      showNotification(NOTIFICATION_TYPES.SUCCESS, {
        id: NOTIFICATION_MSG_MAP.generic
      })
    );
  }

  setTimeout(() => {
    dispatch(dismissNotification());
  }, HIDE_NOTIFICATION_TIMEOUT);

  return dispatch(finishProgress());
};

/**
 * Show error notification
 */
export const showXHRErrorNotification = (
  error: ErrorResponse
): ThunkAction => dispatch =>
  dispatch(
    showNotification(
      NOTIFICATION_TYPES.ERROR,
      {
        id: error.id,
        parameters: error.parameters
      },
      error
    )
  );
