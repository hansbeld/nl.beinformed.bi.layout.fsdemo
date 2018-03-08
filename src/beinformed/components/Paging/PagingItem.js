// @flow
import React from "react";

import { ListHref } from "beinformed/models";

import Link from "beinformed/components/Link/Link";

import type { Href } from "beinformed/models";

type PagingItemProps = {
  ariaLabel?: string,
  baseHref: Href,
  page: number,
  isActive: boolean
};

/**
 * Paging item
 */
const PagingItem = ({
  baseHref,
  page,
  ariaLabel,
  isActive
}: PagingItemProps) => {
  const pageHref = new ListHref(baseHref);

  pageHref.page = page;

  return (
    <Link
      className="page-link"
      href={pageHref}
      ariaLabel={ariaLabel}
      isActive={isActive}
    >
      {page}
    </Link>
  );
};

export default PagingItem;
