// @flow
import React from "react";
import classNames from "classnames";

import "./NotImplementedLink.scss";

const NotImplementedLink = ({
  children,
  className
}: {
  messageId: string,
  defaultMessage: string,
  className?: string
}) => (
  <a
    href="#not-implemented"
    className={classNames("not-implemented-link", className)}
    onClick={e => {
      e.preventDefault();
      return false;
    }}
  >
    {children}
  </a>
);

export default NotImplementedLink;
