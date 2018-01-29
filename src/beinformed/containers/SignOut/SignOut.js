import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "beinformed/containers/SignOut/actions";

class SignOut extends Component<> {
  componentWillMount() {
    this.props.doLogout();
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return null;
  }
}

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export const connector = connect(mapStateToProps, { doLogout: logout });

export default connector(SignOut);
