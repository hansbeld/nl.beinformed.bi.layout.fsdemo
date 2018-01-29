// @flow
import { push } from "react-router-redux";

import {
  HIDE_NOTIFICATION_TIMEOUT,
  NOTIFICATION_TYPES
} from "beinformed/constants/Constants";
import { showNotification } from "beinformed/containers/Notification/actions";

/**
 * Go to component
 */
export const reloadAccount = (): ThunkAction => dispatch => {
  dispatch(
    showNotification(
      NOTIFICATION_TYPES.SUCCESS,
      {
        id: "TransferSuccessful",
        defaultMessage: "Transfer finished"
      },
      null,
      HIDE_NOTIFICATION_TIMEOUT
    )
  );

  return dispatch(push("/accounts/customer"));
};
