// @flow
import React from "react";
import classNames from "classnames";

import NavigationItem from "beinformed/components/Navigation/NavigationItem";

import "./NavigationTabs.scss";

import type LinkCollection from "beinformed/models/links/LinkCollection";

type NavigationTabsProps = {
  className?: string,
  items: LinkCollection
};

/**
 * Navigation tabs
 */
const NavigationTabs = ({ className, items }: NavigationTabsProps) => {
  const tabsClass = classNames("nav nav-tabs", className);

  return (
    <ul className={tabsClass}>
      {items.links.map(link => <NavigationItem key={link.key} link={link} />)}
    </ul>
  );
};

export default NavigationTabs;
