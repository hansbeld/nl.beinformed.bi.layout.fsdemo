// @flow
import { loadModel } from "beinformed/containers/ModularUI/actions";
import { modelSelector } from "beinformed/containers/ModularUI/selectors";
import connectModularUI from "beinformed/utils/modularui/connectModularUI";

import ContentIndexModel from "beinformed/models/content/ContentIndexModel";
import ContentBrowser from "beinformed/components/ModelCatalogContent/ContentBrowser";

/**
 * Map state to props
 */
const mapStateToProps = (state: State, ownProps) => ({
  contentindex: modelSelector(state, ownProps.href)
});

const modularUIConfig = {
  load: ({ href }) => loadModel(href, ContentIndexModel),
  shouldLoad: ({ contentindex }) => !contentindex,
  shouldReload: (newProps, oldProps) =>
    newProps.match.isExact &&
    newProps.href &&
    !newProps.href.equalsWithParameters(oldProps.href)
};

export const connector = connectModularUI(modularUIConfig, mapStateToProps);

export default connector(ContentBrowser);
