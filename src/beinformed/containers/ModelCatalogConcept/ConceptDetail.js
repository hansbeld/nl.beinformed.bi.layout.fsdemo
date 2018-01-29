// @flow
import { loadModel } from "beinformed/containers/ModularUI/actions";
import { modelSelector } from "beinformed/containers/ModularUI/selectors";
import connectModularUI from "beinformed/utils/modularui/connectModularUI";

import ConceptDetail from "beinformed/components/ModelCatalogConcept/ConceptDetail";

/**
 * Map state to props
 */
const mapStateToProps = (state: State, ownProps) => ({
  availableLocales: state.i18n.locales.availableLocaleCodes,
  conceptDetail: modelSelector(
    state,
    `/concepts/${ownProps.match.params.concept}`
  )
});

const modularUIConfig = {
  load: ({ match, location }) =>
    loadModel(`/concepts/${match.params.concept}${location.search}`),
  shouldLoad: ({ conceptDetail }) => !conceptDetail,
  shouldReload: (newProps, oldProps) =>
    newProps.match.params.concept !== oldProps.match.params.concept ||
    newProps.entryDate !== oldProps.entryDate
};

export const connector = connectModularUI(modularUIConfig, mapStateToProps);

export default connector(ConceptDetail);
