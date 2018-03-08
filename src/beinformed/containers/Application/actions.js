// @flow
import { loadModularUI, keyByHref } from "beinformed/modularui";

export const reloadApplication = (): ThunkAction => (dispatch, getState) => {
  const modelKey = keyByHref(getState(), "/");

  if (modelKey) {
    return dispatch(loadModularUI(modelKey, "/", {}));
  }

  return false;
};
