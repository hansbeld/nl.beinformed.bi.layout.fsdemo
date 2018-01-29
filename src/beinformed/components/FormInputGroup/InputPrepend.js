// @flow
import React from "react";

/**
 * Prepend element for inputs
 */
const InputPrepend = ({ children }: { children?: any }) => (
  <div className="input-group-prepend">{children}</div>
);

export default InputPrepend;
