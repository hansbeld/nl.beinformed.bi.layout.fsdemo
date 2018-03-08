// @flow
import type ErrorResponse from "beinformed/models/error/ErrorResponse";

export type ErrorState = null | ErrorResponse;

// REDUCER
const initialState = null;

/**
 * Auth reducer
 */
export default function errorReducer(
  state: ErrorState = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "SAVE_ERROR":
      return action.payload;

    default:
      return state;
  }
}
