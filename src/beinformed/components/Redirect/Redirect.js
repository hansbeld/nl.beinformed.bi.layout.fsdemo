// @flow
import React from "react";

import { Redirect as ReactRouterRedirect } from "react-router-dom";

import type { Href } from "beinformed/models";

const Redirect = ({ href }: { href: Href }) => {
  const redirectLocation = {
    pathname: href.path,
    search: href.querystring,
    state: {
      href
    }
  };

  return <ReactRouterRedirect to={redirectLocation} />;
};

export default Redirect;
