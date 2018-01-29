// @flow
import type ErrorResponse from "beinformed/models/error/ErrorResponse";

export type NotificationState = {
  render: boolean,
  messageType: string | null,
  message: {
    id: string | null,
    defaultMessage?: string | null,
    parameters?: Object | null
  },
  error?: ErrorResponse | null
};

// REDUCER
const initialState = {
  render: false,
  messageType: null,
  message: {
    id: null,
    defaultMessage: null,
    parameters: null
  },
  error: null
};

/**
 * Form reducer
 */
export default function formReducer(
  state: NotificationState = initialState,
  action: Action
) {
  switch (action.type) {
    case "DISMISS_NOTIFICATION":
      return {
        ...state,
        render: false
      };

    case "SHOW_NOTIFICATION":
      return {
        ...state,
        render: true,
        messageType: action.payload.type,
        message: action.payload.message,
        error: action.payload.error
      };

    default:
      return state;
  }
}
