// @flow

export type MultiRowTaskState = number[];

/**
 * Select an item in a list with multiple list tasks
 */
const selectListItem = (state, action) => {
  if (state.includes(action.payload)) {
    const itemIndex = state.indexOf(action.payload);

    return [...state.slice(0, itemIndex), ...state.slice(itemIndex + 1)];
  }

  return [...state, action.payload];
};

// REDUCER
const initialState = [];

/**
 * Form reducer
 */
export default function MultiRowTaskReducer(
  state: MultiRowTaskState = initialState,
  action: Action
) {
  switch (action.type) {
    case "SELECT_LIST_ITEM":
      return selectListItem(state, action);
    case "SELECT_ALL_LIST_ITEMS":
      return action.payload;
    case "FORM_FINISHED":
      return [];

    default:
      return state;
  }
}
