// @flow
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import modularui from "beinformed/utils/modularui/modularui";
import Application from "beinformed/components/Application/Application";

const mapStateToProps = (state: State, ownProps) => ({
  ...ownProps,
  locale: state.i18n.locale
});

export const connector = compose(
  withRouter,
  connect(mapStateToProps),
  modularui("Applicatin", "/", { propName: "application" })
);

export default connector(Application);
