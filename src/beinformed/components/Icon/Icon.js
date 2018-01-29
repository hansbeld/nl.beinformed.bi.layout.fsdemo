// @flow
import React from "react";
import classNames from "classnames";

import "./Icon.scss";

type IconType = {
  className?: string,
  flip?: "horizontal" | "vertical",
  name: string,
  pulse?: boolean,
  rotate?: "90" | "180" | "270",
  size?: "lg" | "2x" | "3x" | "4x" | "5x",
  spin?: boolean,
  fixedWidth?: boolean,
  textAfter?: boolean,
  textBefore?: boolean
};

/**
 * Render a font awesome icon
 */
const Icon = ({
  className,
  flip,
  name,
  pulse,
  rotate,
  size,
  spin,
  fixedWidth = true,
  textAfter,
  textBefore
}: IconType) => {
  const sizeClass = size ? `fa-${size}` : "";
  const rotateClass = rotate ? `fa-rotate-${rotate}` : "";
  const flipClass = flip ? `fa-flip-${flip}` : "";

  const iconClass = classNames("icon fa", `fa-${name}`, className, {
    "mr-2": textAfter,
    "ml-1": textBefore,
    "fa-spin": spin,
    "fa-fw": fixedWidth,
    "fa-pulse": pulse,
    [sizeClass]: typeof size !== "undefined",
    [rotateClass]: typeof rotate !== "undefined",
    [flipClass]: typeof flip !== "undefined"
  });

  return <i className={iconClass} aria-hidden="true" />;
};

export default Icon;
