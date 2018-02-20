// @flow
import { loadModularUI } from "beinformed/containers/ModularUI/actions";
import { keyByHref } from "beinformed/containers/ModularUI/selectors";

export const reloadApplication = (): ThunkAction => (dispatch, getState) => {
  const modelKey = keyByHref(getState(), "/");

  if (modelKey) {
    return dispatch(loadModularUI(modelKey, "/", {}));
  }

  return false;
};
