// @flow
import { loadModel } from "beinformed/containers/ModularUI/actions";
import { modelSelector } from "beinformed/containers/ModularUI/selectors";
import connectModularUI from "beinformed/utils/modularui/connectModularUI";

import ConceptIndexModel from "beinformed/models/concepts/ConceptIndexModel";
import ConceptBrowser from "beinformed/components/ModelCatalogConcept/ConceptBrowser";

/**
 * Map state to props
 */
const mapStateToProps = (state: State, ownProps) => ({
  conceptindex: modelSelector(state, ownProps.href)
});

const modularUIConfig = {
  load: ({ href, entryDate }) =>
    loadModel(href.addParameter("entryDate", entryDate), ConceptIndexModel),
  shouldLoad: ({ conceptindex }) => !conceptindex,
  shouldReload: (newProps, oldProps) =>
    newProps.match.isExact &&
    newProps.href &&
    !newProps.href.equalsWithParameters(oldProps.href)
};

export const connector = connectModularUI(modularUIConfig, mapStateToProps);

export default connector(ConceptBrowser);
