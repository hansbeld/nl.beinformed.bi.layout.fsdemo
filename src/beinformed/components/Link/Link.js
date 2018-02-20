// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { NavLink as ReactRouterLink } from "react-router-dom";

import Href from "beinformed/models/href/Href";
import { KEYCODES } from "beinformed/constants/Constants";

type LinkProps = {
  ariaLabel?: string,
  children: any,
  className?: string,
  dataId?: string | number,
  href: Href,
  isActive?: boolean,
  isSelected?: boolean,
  isDisabled?: boolean,
  isDownload?: boolean,
  isNavLink?: boolean,
  isModal?: boolean,
  style?: Object,
  value?: string,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onClick?: (href: Href) => void,
  onEnter?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void,
  onLeave?: (e: SyntheticEvent<*>) => void
};

/**
 * HTML anchor link
 */
class Link extends Component<LinkProps> {
  static displayName = "BeInformedLink";

  static defaultProps = {
    href: new Href("#")
  };

  render() {
    const {
      ariaLabel,
      children,
      className,
      dataId,
      href,
      isActive,
      isDisabled,
      isDownload,
      isNavLink,
      isModal,
      style,
      value,
      onBlur,
      onClick,
      onEnter,
      onFocus,
      onLeave
    } = this.props;

    const linkClass = classNames(className, {
      "nav-link": isNavLink,
      disabled: isDisabled
    });

    const toLocation = Object.assign(href.toLocation(), {
      state: {
        href,
        modal: isModal
      }
    });

    return (
      <ReactRouterLink
        className={linkClass}
        activeClassName="active"
        isActive={typeof isActive === "undefined" ? void 0 : () => isActive}
        style={style}
        to={toLocation}
        data-value={value}
        data-id={dataId}
        disabled={isDisabled}
        download={isDownload}
        aria-label={ariaLabel}
        onClick={e => {
          if (onClick) {
            e.preventDefault();
            return onClick(href);
          }

          return true;
        }}
        onKeyDown={e => {
          if (
            onClick &&
            (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE)
          ) {
            e.preventDefault();

            return onClick(href);
          }

          return true;
        }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onBlur={onBlur}
        onFocus={onFocus}
      >
        {children}
      </ReactRouterLink>
    );
  }
}

export default Link;
