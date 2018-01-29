// @flow
import React from "react";
import classNames from "classnames";

import { Message } from "beinformed/containers/I18n/Message";

import "./NotImplementedLink.scss";

const NotImplementedLink = ({
  messageId,
  defaultMessage,
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
    <Message id={messageId} defaultMessage={defaultMessage} />
  </a>
);

export default NotImplementedLink;
