// @flow
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import modularui from "beinformed/utils/modularui/modularui";
import ContentDetail from "beinformed/components/ModelCatalogContent/ContentDetail";

const mapStateToProps = (state: State, ownProps) => ({
  ...ownProps,
  availableLocales: state.i18n.locales.availableLocaleCodes
});

export const connector = compose(
  withRouter,
  connect(mapStateToProps),
  modularui(
    "ContentDetail",
    ({ match, location }) =>
      `/content/${decodeURIComponent(match.params.content)}${location.search}`,
    { propName: "contentTOC" }
  )
);

export default connector(ContentDetail);
