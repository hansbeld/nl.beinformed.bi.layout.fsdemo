// @flow
import { push } from "react-router-redux";

import connectModularUI from "beinformed/utils/modularui/connectModularUI";
import { modelSelector } from "beinformed/containers/ModularUI/selectors";
import { loadModel } from "beinformed/containers/ModularUI/actions";

import ModelCatalogModel from "beinformed/models/modelcatalog/ModelCatalogModel";
import ModelCatalog from "beinformed/components/ModelCatalog/ModelCatalog";

/**
 * Map state to props
 */
const mapStateToProps = (state: State, ownProps) => ({
  modelcatalog: modelSelector(state, ownProps.match.url)
});

const modularUIConfig = {
  load: ({ match }) => loadModel(match.url, ModelCatalogModel),
  shouldLoad: ({ modelcatalog }) => !modelcatalog,
  shouldReload: (newProps, oldProps) =>
    newProps.match.url !== oldProps.match.url
};

export const connector = connectModularUI(modularUIConfig, mapStateToProps, {
  pushState: push
});

export default connector(ModelCatalog);
