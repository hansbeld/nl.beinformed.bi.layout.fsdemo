// @flow
import Href from "beinformed/models/href/Href";

type ModularUIState = {
  status: {},
  models: Object
};

const updateStatus = (
  state,
  { key, status }: { key: string, status: string }
) => ({
  ...state,
  status: {
    ...state.status,
    [key]: status
  }
});

const setModel = (state, model) => {
  if (model && model.selfhref instanceof Href) {
    return {
      ...state,
      models: {
        ...state.models,
        [model.selfhref.path]: model
      }
    };
  }

  throw new Error("No model for setModel or no selfhref available on model");
};

const removeModel = (state, model) => {
  if (!state.models[model.selfhref.path]) {
    return state;
  }

  return {
    ...state,
    models: Object.keys(state.models).reduce(
      (accumulator, href) =>
        href === model.selfhref.path
          ? accumulator
          : {
              ...accumulator,
              [href]: state.models[href]
            },
      {}
    )
  };
};

const initialState = {
  status: {},
  models: {}
};

/**
 * Modular UI Reducer
 */
export default function modularuiReducer(
  state: ModularUIState = initialState,
  action: Action
) {
  switch (action.type) {
    case "MODULARUI/STATUS":
      return updateStatus(state, action.payload);

    case "MODULARUI/SET":
    case "MODULARUI/UPDATE":
      return setModel(state, action.payload);

    case "MODULARUI/REMOVE":
      return removeModel(state, action.payload);

    case "MODULARUI/RESET":
      return initialState;

    default:
      return state;
  }
}
