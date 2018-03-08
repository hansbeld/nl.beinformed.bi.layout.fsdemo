// @flow
import { removeModel, removeModelByKey } from "beinformed/modularui";

import {
  HIDE_NOTIFICATION_TIMEOUT,
  NOTIFICATION_TYPES
} from "beinformed/constants/Constants";
import { showNotification } from "beinformed/containers/Notification/actions";

/**
 * Go to component
 */
export const reloadAccount = (form): ThunkAction => dispatch => {
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

  dispatch(removeModelByKey("PanelRenderer(/accounts/account/1/summary)"));
  return dispatch(removeModel(form));
};
