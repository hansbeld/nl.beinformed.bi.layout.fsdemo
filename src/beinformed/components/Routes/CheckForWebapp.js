import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import universalFetch from "beinformed/utils/fetch/universalFetch";

import NotFound from "beinformed/components/NotFound/NotFound";
import { BASE } from "beinformed/constants/Constants";

/**
 * Temporary fix for redirect to the webapp.
 */
class CheckForWebapp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWebapp: null
    };
  }

  componentDidMount() {
    const matchedUri = this.props.match.params.uri;
    if (matchedUri) {
      universalFetch({
        url: `${BASE}/contributions/${matchedUri}`,
        headers: {
          Accept: "application/json"
        }
      }).then(response => {
        this.setState({
          isWebapp:
            response &&
            response.webapplication &&
            response.webapplication.resourcetype === "Application"
        });
      });
    }
  }

  render() {
    if (this.state.isWebapp === null) {
      return null;
    }

    if (this.state.isWebapp) {
      return <Redirect to="/" />;
    }

    return <NotFound />;
  }
}

export default CheckForWebapp;
