// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { withMessage } from "beinformed/containers/I18n/Message";

import PagingItem from "beinformed/components/Paging/PagingItem";
import PagingItemArrow from "beinformed/components/Paging/PagingItemArrow";

import type ListModel from "beinformed/models/list/ListModel";
import type Href from "beinformed/models/href/Href";

type PaginationProps = {
  className?: string,
  list: ListModel,
  maxPagesToShow: number,
  message: messageFunctionType,
  onChange: (href: Href) => void
};

class Pagination extends Component<PaginationProps> {
  static defaultProps = {
    maxPagesToShow: 5
  };

  /**
   * Generate array of page numbers to show to the end user, based on current page,
   * maximum number of pages and the number of pagenumbers we want to show
   */
  getPageNumbers(currentPage, maxPages, maxPagesToShow) {
    let startNumber = currentPage - Math.floor(maxPagesToShow / 2);

    if (startNumber <= 0) {
      startNumber = 1;
    }

    let endNumber = startNumber + maxPagesToShow - 1;

    if (endNumber > maxPages) {
      endNumber = maxPages;
    }

    const pageNumbers = [];

    for (let i = startNumber; i <= endNumber; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }

  render() {
    const { className, list, maxPagesToShow, message } = this.props;

    const paginationClass = classNames(
      "pagination",
      "pagination-sm",
      className
    );

    const prevPage = list.paging.page - 1;
    const nextPage = list.paging.page + 1;

    const pages = this.getPageNumbers(
      list.paging.page,
      list.paging.maxpages,
      maxPagesToShow
    );

    return (
      <ul className={paginationClass}>
        <li
          className={classNames("page-item first-page", {
            disabled: list.paging.page <= 1
          })}
        >
          <PagingItemArrow
            type="first"
            baseHref={list.selfhref}
            page={1}
            isEnabled={list.paging.page > 1}
            ariaLabel={message(
              "PagingItem.AriaLabel.GotoFirstPage",
              "Go to the first page"
            )}
          />
        </li>
        <li
          className={classNames("page-item previous-page", {
            disabled: list.paging.page <= 1
          })}
        >
          <PagingItemArrow
            type="previous"
            baseHref={list.selfhref}
            page={prevPage}
            isEnabled={list.paging.page > 1}
            ariaLabel={message(
              "PagingItem.AriaLabel.GotoPreviousPage",
              "Go to the previous page, page number {PREVIOUS_PAGE_NUMBER}",
              {
                PREVIOUS_PAGE_NUMBER: prevPage
              }
            )}
          />
        </li>

        {pages.map(number => (
          <li
            key={number}
            className={classNames("page-item", `page-${number}`, {
              active: list.paging.page === number
            })}
          >
            <PagingItem
              baseHref={list.selfhref}
              page={number}
              isActive={list.paging.page === number}
              ariaLabel={message(
                "PagingItem.AriaLabel.GotoPage",
                "Go to page {PAGE_NUMBER}",
                {
                  PAGE_NUMBER: number
                }
              )}
            />
          </li>
        ))}

        <li
          className={classNames("page-item next-page", {
            disabled: list.paging.page >= list.paging.maxpages
          })}
        >
          <PagingItemArrow
            type="next"
            baseHref={list.selfhref}
            page={nextPage}
            isEnabled={list.paging.page < list.paging.maxpages}
            ariaLabel={message(
              "PagingItem.AriaLabel.GotoNextPage",
              "Go to the next page, page number {NEXT_PAGE_NUMBER}",
              {
                NEXT_PAGE_NUMBER: nextPage
              }
            )}
          />
        </li>
        <li
          className={classNames("page-item last-page", {
            disabled: list.paging.page >= list.paging.maxpages
          })}
        >
          <PagingItemArrow
            type="last"
            baseHref={list.selfhref}
            page={list.paging.maxpages}
            isEnabled={list.paging.page < list.paging.maxpages}
            ariaLabel={message(
              "PagingItem.AriaLabel.GotoLastPage",
              "Go to the last page, page number {LAST_PAGE_NUMBER}",
              {
                LAST_PAGE_NUMBER: list.paging.maxpages
              }
            )}
          />
        </li>
      </ul>
    );
  }
}

export default withMessage(Pagination);
