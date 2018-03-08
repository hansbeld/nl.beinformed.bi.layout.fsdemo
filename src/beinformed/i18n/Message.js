// @flow
import * as React from "react";

import withMessage from "./withMessage";

type MessageProps = {
  id: string,
  defaultMessage?: string,
  data?: Object,
  message: messageFunctionType,
  screenreaderOnly?: boolean
};

/**
 * Message React component
 */
const Message = ({
  id,
  defaultMessage,
  data,
  message,
  screenreaderOnly = false
}: MessageProps) => {
  const translatedMessage = message(id, defaultMessage, data);

  if (screenreaderOnly) {
    return <span className="msg sr-only">{translatedMessage}</span>;
  }

  return <span className="msg">{translatedMessage}</span>;
};

export default withMessage(Message);
