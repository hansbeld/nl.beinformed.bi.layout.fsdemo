// @flow
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { modularui } from "beinformed/modularui";
import Application from "beinformed/components/Application/Application";

import type { Connector } from "react-redux";
import type { ApplicationModel } from "beinformed/models";

type OwnProps = {
  children: any
};

type Props = {
  children: any,
  application: ApplicationModel,
  locale: string
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  ...ownProps,
  locale: state.i18n.locale
});

const reduxConnector: Connector<OwnProps, Props> = connect(mapStateToProps, {});

export const connector = compose(
  withRouter,
  reduxConnector,
  modularui("Application", "/", { propName: "application" })
);

export default connector(Application);
