// @flow

/**
 * Server rendering depends on the availability of the status property on each model
 * to determine if alle models on initial request are loaded, see /server/render.js
 */

export type ModularUIState = {
  [string]: {
    status: string,
    model: ResolvableModels
  }
};

const updateStatus = (
  state,
  { key, status }: { key: string, status: string }
) => ({
  ...state,
  [key]: {
    ...state[key],
    status
  }
});

const setModel = (state, { key, model }: { key: string, model: any }) => {
  if (model) {
    return {
      ...state,
      [key]: {
        ...state[key],
        model
      }
    };
  }

  throw new Error("No model for setModel");
};

const updateModel = (state, model) => {
  const modelKey = Object.keys(state).find(
    key =>
      state[key].model &&
      state[key].model.connectKey &&
      state[key].model.connectKey === model.connectKey
  );

  if (modelKey) {
    return setModel(state, { key: modelKey, model });
  }

  throw new Error(`Cannot update model with key ${model.connectKey}`);
};

const removeModel = (state, model) => {
  const modelKey = Object.keys(state).find(
    key =>
      state[key].model &&
      state[key].model.connectKey &&
      state[key].model.connectKey === model.connectKey
  );

  return removeKey(state, modelKey);
};

const removeKey = (state, modelKey?: string) => {
  if (modelKey) {
    // eslint-disable-next-line no-unused-vars
    const { [modelKey]: _, ...newState } = state;
    return newState;
  }

  return state;
};

const initialState = {};

/**
 * Modular UI Reducer
 */
export default function modularuiReducer(
  state: ModularUIState = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case "MODULARUI/STATUS":
      return updateStatus(state, action.payload);

    case "MODULARUI/SET":
      return setModel(state, action.payload);

    case "MODULARUI/UPDATE":
      return updateModel(state, action.payload);

    case "MODULARUI/REMOVE":
      return removeModel(state, action.payload);

    case "MODULARUI/REMOVE_KEY":
      return removeKey(state, action.payload);

    default:
      return state;
  }
}
