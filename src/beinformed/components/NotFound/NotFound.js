// @flow
import React from "react";
import { Link } from "react-router-dom";

/**
 * Render a generic error page
 */
const NotFound = () => (
  <div className="errorpage jumbotron">
    <p className="lead">
      Sorry, but the page you are looking for was either not found or does not
      exist.<br />
      Try refreshing the page or click on the button below to go back to the
      Homepage.
    </p>
    <Link to="/" className="btn btn-primary btn-lg mt-4">
      Homepage
    </Link>
  </div>
);

export default NotFound;
