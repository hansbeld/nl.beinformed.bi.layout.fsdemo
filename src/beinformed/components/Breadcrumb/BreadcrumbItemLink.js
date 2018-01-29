// @flow
import React from "react";

import Link from "beinformed/components/Link/Link";

import type Href from "beinformed/models/href/Href";

type BreadcrumbItemLinkType = {
  item: {
    key: string,
    href: Href,
    label: string
  }
};

/**
 * Render an item on the breadcrumb
 */
const BreadcrumbItemLink = ({ item }: BreadcrumbItemLinkType) => (
  <li className="breadcrumb-item" data-id={item.key}>
    <Link href={item.href}>{item.label}</Link>
  </li>
);

export default BreadcrumbItemLink;
