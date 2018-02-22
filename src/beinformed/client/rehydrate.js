// @flow
import Locales from "beinformed/i18n/Locales";

import resolveModel from "beinformed/models/resolveModel";

import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

const createModelData = (data: any) => {
  const modelData = new ModularUIResponse();

  modelData.locale = data.locale;
  modelData.key = data.key;
  modelData.data = data.data;
  modelData.contributions = data.contributions;
  modelData.parameters = data.parameters;

  return modelData;
};

/**
 * Recreate a model from dehydrated data obtained after a server render.
 */
const recreateModel = (data: any) => {
  const modelData = createModelData(data);

  const Model = resolveModel(modelData);

  if (Model && Model.isApplicableModel) {
    const model = new Model(modelData);
    model.rehydrate(data);

    const childModels = data.childModels.map(childModel =>
      recreateModel(childModel)
    );

    model.addChildModels(childModels);

    return model;
  }

  return data;
};

const isModularUIModelData = (data: any) =>
  data !== null &&
  typeof data === "object" &&
  ("data" in data && "contributions" in data);

/**
 * Maps dehydrated state to models that can be used to rehydrated the application.
 */
const rehydrate = (state: any) => {
  const mappedState = {};

  Object.keys(state).forEach(stateKey => {
    if (Array.isArray(state[stateKey])) {
      mappedState[stateKey] = state[stateKey].map(stateItem =>
        rehydrate(stateItem)
      );
    } else if (isModularUIModelData(state[stateKey])) {
      mappedState[stateKey] = recreateModel(state[stateKey]);
    } else if (stateKey === "i18n") {
      mappedState.i18n = {
        locales: Locales.rehydrate(state.i18n.locales),
        locale: state.i18n.locale
      };
    } else if (
      state[stateKey] !== null &&
      typeof state[stateKey] === "object"
    ) {
      mappedState[stateKey] = rehydrate(state[stateKey]);
    } else {
      mappedState[stateKey] = state[stateKey];
    }
  });

  return mappedState;
};

export default rehydrate;
