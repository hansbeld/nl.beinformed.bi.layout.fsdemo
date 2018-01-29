// @flow
import React from "react";

import ListHref from "beinformed/models/href/ListHref";

import Link from "beinformed/components/Link/Link";

import type Href from "beinformed/models/href/Href";

type PagingItemProps = {
  ariaLabel?: string,
  baseHref: Href,
  page: number,
  onClick: (href: Href) => void
};

/**
 * Paging item
 */
const PagingItem = ({
  baseHref,
  page,
  ariaLabel,
  onClick
}: PagingItemProps) => {
  const pageHref = new ListHref(baseHref);

  pageHref.page = page;

  return (
    <Link
      className="page-link"
      href={pageHref}
      ariaLabel={ariaLabel}
      onClick={onClick}
    >
      {page}
    </Link>
  );
};

export default PagingItem;
