// @flow
import React from "react";
import classNames from "classnames";

import Link from "beinformed/components/Link/Link";

import type Href from "beinformed/models/href/Href";

type LinkButtonType = {
  ariaLabel?: string,
  buttonStyle?:
    | "danger"
    | "info"
    | "link"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "light"
    | "dark",
  children?: any,
  className?: string,
  disabled?: boolean,
  href: Href,
  size?: "small" | "large" | "default",
  onBlur?: (e: SyntheticEvent<*>) => void,
  onClick?: (href: Href) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

/**
 * Render a link as a button
 */
const LinkButton = ({
  ariaLabel,
  buttonStyle = "light",
  children,
  className,
  disabled,
  href,
  size,
  onBlur,
  onClick,
  onFocus
}: LinkButtonType) => {
  const buttonClass = classNames("btn", `btn-${buttonStyle}`, className, {
    "btn-sm": size === "small",
    "btn-lg": size === "large"
  });

  return (
    <Link
      href={href}
      className={buttonClass}
      ariaLabel={ariaLabel}
      isDisabled={disabled}
      onBlur={onBlur}
      onFocus={onFocus}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
