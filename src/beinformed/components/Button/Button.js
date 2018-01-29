// @flow
import React from "react";
import classNames from "classnames";

type ButtonType = {
  ariaLabel?: string,
  buttonStyle?: string,
  children?: any,
  className?: string,
  dataId?: string,
  disabled?: boolean,
  name: string,
  size?: "small" | "large" | "default",
  type?: "button" | "submit" | "reset",
  value?: string,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onClick?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void,
  onMouseEnter?: (e: SyntheticEvent<*>) => void,
  onMouseLeave?: (e: SyntheticEvent<*>) => void,
  onMouseOver?: (e: SyntheticEvent<*>) => void
};

/**
 * Render a generic button
 */
const Button = ({
  buttonStyle = "outline-secondary",
  ariaLabel,
  dataId,
  className,
  size,
  children,
  type = "button",
  ...htmlProps
}: ButtonType) => {
  const buttonClass = classNames("btn", `btn-${buttonStyle}`, className, {
    "btn-sm": size === "small",
    "btn-lg": size === "large"
  });

  return (
    <button
      {...htmlProps}
      type={type}
      data-id={dataId}
      className={buttonClass}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
