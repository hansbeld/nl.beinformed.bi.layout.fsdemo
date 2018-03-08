// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";

import { getApplication } from "beinformed/modularui";

import type { RouterHistory } from "react-router-dom";

import type { Connector } from "react-redux";

type RoutesProps = {
  children: any,
  application: ApplicationModel,
  location: Location,
  history: RouterHistory
};

class Routes extends Component<RoutesProps> {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps: RoutesProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const isModal = Boolean(
      get(this.props.location, "state.modal") &&
        this.previousLocation !== this.props.location
    );

    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        isModal,
        location: isModal ? this.previousLocation : this.props.location,
        application: this.props.application
      })
    );
  }
}

const connector: Connector<{}, RoutesProps> = connect(
  state => ({
    application: getApplication(state)
  }),
  {}
);

export default withRouter(connector(Routes));
