// @flow
import React from "react";
import classNames from "classnames";

import NavigationItem from "beinformed/components/Navigation/NavigationItem";

import type { LinkCollection, LinkModel } from "beinformed/models";

type NavigationProps = {
  activeLink?: LinkModel,
  className?: string,
  items: LinkCollection
};

/**
 * Navigation
 */
const Navigation = ({ activeLink, className, items }: NavigationProps) => {
  const navbarClass = classNames("nav", className);

  return (
    <ul className={navbarClass}>
      {items.links.map((link, idx) => (
        <NavigationItem
          key={`${link.key}-${idx}` || idx}
          link={link}
          isActive={link.isActive(activeLink)}
        />
      ))}
    </ul>
  );
};

export default Navigation;
