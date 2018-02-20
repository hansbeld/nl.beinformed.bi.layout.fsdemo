import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { IS_SERVER } from "beinformed/constants/Constants";
import { logout } from "beinformed/containers/SignOut/actions";

class SignOut extends Component<> {
  // Logout on server
  componentWillMount() {
    if (IS_SERVER) {
      this.props.doLogout();
    }
  }

  // Logout on client
  componentDidMount() {
    this.props.doLogout();
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to={{ pathname: "/", state: { reload: true } }} />;
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
