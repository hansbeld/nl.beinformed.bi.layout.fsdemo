// @flow
import React, { Component } from "react";
import classNames from "classnames";

import Link from "beinformed/components/Link/Link";
import type Href from "beinformed/models/href/Href";

type DropdownLinkProp = {
  ariaLabel?: string,
  children?: any,
  className?: string,
  href: Href,
  id?: string,
  value?: string,
  isActive?: boolean,
  isModal?: boolean
};

/**
 * Render dropdown item
 */
class DropdownLink extends Component<DropdownLinkProp> {
  _link: any;

  shouldComponentUpdate(nextProps: DropdownLinkProp) {
    return (
      !nextProps.href.equals(this.props.href) ||
      nextProps.value !== this.props.value ||
      nextProps.isActive !== this.props.isActive
    );
  }

  focus() {
    this._link.focus();
  }

  render() {
    const {
      ariaLabel,
      children,
      className,
      href,
      id,
      value,
      isActive,
      isModal
    } = this.props;

    const dropdownClass = classNames("dropdown-item", className);

    return (
      <Link
        wrappedComponentRef={c => {
          this._link = c;
        }}
        ariaLabel={ariaLabel}
        className={dropdownClass}
        dataId={id}
        href={href}
        value={value}
        isNavLink
        isActive={isActive}
        isModal={isModal}
      >
        {children}
      </Link>
    );
  }
}

export default DropdownLink;
