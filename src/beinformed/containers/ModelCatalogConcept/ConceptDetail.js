// @flow
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import modularui from "beinformed/modularui/modularui";
import ConceptDetail from "beinformed/components/ModelCatalogConcept/ConceptDetail";

const mapStateToProps = (state: State, ownProps) => ({
  ...ownProps,
  availableLocales: state.i18n.locales.availableLocaleCodes
});

export const connector = compose(
  withRouter,
  connect(mapStateToProps),
  modularui(
    "ConceptDetail",
    ({ match, location }) =>
      `/concepts/${match.params.concept}${location.search}`,
    { propName: "conceptDetail" }
  )
);

export default connector(ConceptDetail);
