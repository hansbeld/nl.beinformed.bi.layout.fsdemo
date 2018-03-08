// @flow
import React from "react";

import type { Href } from "beinformed/models";

/**
 * Render an item on the breadcrumb
 */
const BreadcrumbItem = ({
  item
}: {
  item: {
    key: string,
    href: Href,
    label: string
  }
}) => (
  <li className="breadcrumb-item" data-id={item.key}>
    {item.label}
  </li>
);

export default BreadcrumbItem;
