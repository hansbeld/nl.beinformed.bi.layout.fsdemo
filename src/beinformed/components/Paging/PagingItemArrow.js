// @flow
import React, { Component } from "react";

import ChevronDoubleRightIcon from "mdi-react/ChevronDoubleRightIcon";
import ChevronRightIcon from "mdi-react/ChevronRightIcon";
import ChevronDoubleLeftIcon from "mdi-react/ChevronDoubleLeftIcon";
import ChevronLeftIcon from "mdi-react/ChevronLeftIcon";

import { ListHref } from "beinformed/models";

import Link from "beinformed/components/Link/Link";

import type { Href } from "beinformed/models";

type PagingItemArrowProps = {
  ariaLabel: string,
  baseHref: Href,
  isEnabled: boolean,
  page: number,
  type: "first" | "previous" | "next" | "last"
};

/**
 * Paging item for prev and next arrows
 */
class PagingItemArrow extends Component<PagingItemArrowProps> {
  renderIcon(type: string) {
    switch (type) {
      case "last":
        return <ChevronDoubleRightIcon />;
      case "next":
        return <ChevronRightIcon />;
      case "first":
        return <ChevronDoubleLeftIcon />;
      case "previous":
        return <ChevronLeftIcon />;
      default:
        return null;
    }
  }

  render() {
    const { baseHref, page, type, isEnabled, ariaLabel } = this.props;

    const pageHref = new ListHref(baseHref);
    pageHref.page = page;

    if (isEnabled) {
      return (
        <Link
          className="page-link"
          href={pageHref}
          ariaLabel={ariaLabel}
          isActive={false}
        >
          {this.renderIcon(type)}
        </Link>
      );
    }
    return <span className="page-link">{this.renderIcon(type)}</span>;
  }
}
export default PagingItemArrow;
