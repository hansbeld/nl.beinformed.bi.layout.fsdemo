// @flow
import Href from "beinformed/models/href/Href";

export const modelSelector = (state: State, href: Href | string) => {
  if (state && state.modularui && state.modularui.models) {
    return href instanceof Href
      ? state.modularui.models[href.path]
      : state.modularui.models[new Href(href).path];
  }

  return null;
};

export const modelByType = (state: State, type: string) => {
  if (state && state.modularui && state.modularui.models) {
    return Object.values(state.modularui.models).find(
      model => model.type === type
    );
  }

  return null;
};

/**
 * Returns the first model that starts with the given href
 */
export const modelSelectorStartsWith = (state: State, href: Href | string) => {
  if (state && state.modularui && state.modularui.models) {
    const searchString = href instanceof Href ? href.path : href;

    const modelKey = Object.keys(state.modularui.models).find(key =>
      key.startsWith(searchString)
    );

    if (modelKey) {
      return state.modularui.models[modelKey];
    }
  }

  return null;
};
