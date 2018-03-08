// @flow
import React from "react";

import "./Home.scss";
import logo from "./logo.png";

import { Message } from "beinformed/i18n";

/**
 * Render a home page
 */
const HomePage = () => (
  <div className="homepage banner">
    <div>
      <img src={logo} alt="Logo of Be Informed" />
      <br />
      <h1>
        <Message id="Homepage.Header" defaultMessage="Hello" />
      </h1>
      <p>
        <Message
          id="Homepage.Msg"
          defaultMessage="This is an example ddd homepage"
        />
      </p>
    </div>
  </div>
);

export default HomePage;
