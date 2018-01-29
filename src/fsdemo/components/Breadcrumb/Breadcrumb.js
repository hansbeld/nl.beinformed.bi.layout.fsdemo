// @flow
import React, { Component } from "react";

import "./Breadcrumb.scss";

class Breadcrumb extends Component<{}> {
  render() {
    return (
      <nav className="accountsummary breadcrumb">
        <a className="breadcrumb-item" href="#a">
          Home
        </a>
        <a className="breadcrumb-item" href="#a">
          online banking
        </a>
        <a className="breadcrumb-item" href="#a">
          account summary
        </a>
      </nav>
    );
  }
}
export default Breadcrumb;
