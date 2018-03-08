// @flow
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { modularui } from "beinformed/modularui";
import ContentDetail from "beinformed/components/ModelCatalogContent/ContentDetail";

import type { Connector } from "react-redux";

type OwnProps = {
  entryDate: string
};
type Props = {
  entryDate: string,
  availableLocales: Array<string>
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
    "ContentDetail",
    ({ match, location }) =>
      `/content/${decodeURIComponent(match.params.content)}${location.search}`,
    { propName: "contentTOC" }
  )
);

export default connector(ContentDetail);
