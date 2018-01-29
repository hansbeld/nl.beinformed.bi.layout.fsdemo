import React from "react";

import "./NoScript.scss";

const NoScript = () => (
  <noscript>
    <div id="no-script">
      <div className="jumbotron">
        <h1 className="display-3">No JavaScript</h1>
        <p className="lead">
          This application does not work correctly without JavaScript (yet).
        </p>
        <hr className="my-4" />
        <a
          className="btn btn-primary btn-lg"
          href="https://www.enable-javascript.com/"
        >
          Please enable JavaScript in your browser.
        </a>
      </div>
    </div>
  </noscript>
);

export default NoScript;
