// @flow
import React from "react";
import { Route, Redirect } from "react-router-dom";
import queryString from "query-string";

const SecureRedirect = ({ children }: { children: any }) => (
  <Route
    key="redirectRoute"
    render={({ location }) => {
      const parsedQuerystring = queryString.parse(location.search);
      if (parsedQuerystring && parsedQuerystring.redirectURI) {
        return <Redirect to={parsedQuerystring.redirectURI} />;
      }

      return children;
    }}
  />
);

export default SecureRedirect;
