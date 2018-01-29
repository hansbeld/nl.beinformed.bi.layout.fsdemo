// @flow
import React from "react";

import ListHref from "beinformed/models/href/ListHref";

import Link from "beinformed/components/Link/Link";
import Icon from "beinformed/components/Icon/Icon";

import type Href from "beinformed/models/href/Href";

type PagingItemArrowProps = {
  ariaLabel: string,
  baseHref: Href,
  isEnabled: boolean,
  page: number,
  type: "first" | "previous" | "next" | "last",
  onClick: (href: Href) => void
};

/**
 * Paging item for prev and next arrows
 */
const PagingItemArrow = ({
  baseHref,
  page,
  type,
  isEnabled,
  ariaLabel,
  onClick
}: PagingItemArrowProps) => {
  const iconMap = {
    first: "angle-double-left",
    previous: "angle-left",
    next: "angle-right",
    last: "angle-double-right"
  };

  const pageHref = new ListHref(baseHref);
  pageHref.page = page;

  if (isEnabled) {
    return (
      <Link
        className="page-link"
        href={pageHref}
        ariaLabel={ariaLabel}
        onClick={onClick}
      >
        <Icon name={iconMap[type]} />
      </Link>
    );
  }
  return (
    <span className="page-link">
      <Icon name={iconMap[type]} />
    </span>
  );
};

export default PagingItemArrow;
