// @flow
import Href from "beinformed/models/href/Href";

export const getApplication = (state: State) => modelByHref(state, "/");

export const modelByHref = (state: State, href: Href | string) => {
  if (state && state.modularui) {
    const findHref = href instanceof Href ? href : new Href(href);

    const modelConfig = Object.values(state.modularui).find(
      model => model.model.selfhref && model.model.selfhref.equals(findHref)
    );

    if (modelConfig) {
      return modelConfig.model;
    }
  }

  return null;
};

export const keyByHref = (state: State, href: Href | string) => {
  if (state && state.modularui) {
    const findHref = href instanceof Href ? href : new Href(href);

    return Object.keys(state.modularui).find(key => {
      const model = state.modularui[key].model;

      return model && model.selfhref && model.selfhref.equals(findHref);
    });
  }

  return null;
};
