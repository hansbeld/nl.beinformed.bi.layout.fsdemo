// @flow
import React from "react";
import classNames from "classnames";

/**
 * Render List group header
 */
const InputGroup = ({
  children,
  className,
  readonly
}: {
  children?: any,
  className?: string,
  readonly?: boolean
}) => {
  const filteredInputs = Array.isArray(children)
    ? children.filter(child => typeof child !== "undefined")
    : [children];

  const groupClass = classNames("input-group", className, {
    "is-readonly": readonly
  });

  const filteredInput =
    filteredInputs.length === 1 ? filteredInputs[0] : filteredInputs;

  return <div className={groupClass}>{filteredInput}</div>;
};

export default InputGroup;
