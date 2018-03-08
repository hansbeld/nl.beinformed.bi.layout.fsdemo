// @flow
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { modularui } from "beinformed/modularui";
import ConceptDetail from "beinformed/components/ModelCatalogConcept/ConceptDetail";

import type { Connector } from "react-redux";
import type { ConceptDetailModel } from "beinformed/models";

type OwnProps = {
  entryDate: string
};
type Props = {
  entryDate: string,
  availableLocales: Array<string>,
  conceptDetail: ConceptDetailModel
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  ...ownProps,
  availableLocales: state.i18n.locales.availableLocaleCodes
});

const reduxConnector: Connector<OwnProps, Props> = connect(mapStateToProps, {});

export const connector = compose(
  withRouter,
  reduxConnector,
  modularui(
    "ConceptDetail",
    ({ match, location }) =>
      `/concepts/${match.params.concept}${location.search}`,
    { propName: "conceptDetail" }
  )
);

export default connector(ConceptDetail);
