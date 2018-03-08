// @flow
import React from "react";
import classNames from "classnames";

import Link from "beinformed/components/Link/Link";

import type { LinkModel } from "beinformed/models";

type NavigationItemProps = {
  className?: string,
  isActive?: boolean,
  link: LinkModel
};

/**
 * Navigation item
 */
const NavigationItem = ({
  className,
  isActive = false,
  link
}: NavigationItemProps) => {
  const linkClass = classNames(className, {
    active: isActive
  });

  return (
    <li className="nav-item">
      <Link className={linkClass} dataId={link.key} href={link.href} isNavLink>
        {link.icon}
        {link.label}
      </Link>
    </li>
  );
};

export default NavigationItem;
