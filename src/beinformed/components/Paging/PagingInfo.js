// @flow
import React from "react";

import { Message } from "beinformed/i18n";
import type { ListModel } from "beinformed/models";

/**
 * Render paging information
 */
const PagingInfo = ({ list }: { list: ListModel }) => {
  const firstItem =
    list.paging.page === 1
      ? 1
      : list.paging.pagesize.value * (list.paging.page - 1) + 1;
  const last = firstItem + list.paging.pagesize.value - 1;
  const lastItem =
    last > list.paging.totalResults ? list.paging.totalResults : last;

  const totalResults = list.paging.totalResults;

  if (list.paging.page) {
    return (
      <small className="paginginfo">
        <Message
          id="PagingInfo.Information"
          data={{
            FIRSTITEM: firstItem,
            LASTITEM: lastItem,
            TOTALRESULTS: totalResults
          }}
          defaultMessage="{FIRSTITEM} - {LASTITEM} of {TOTALRESULTS}"
        />
      </small>
    );
  }

  return (
    <small className="paginginfo">
      <Message
        id="PagingInfo.TotalResults"
        data={{
          TOTALRESULTS: totalResults
        }}
        defaultMessage="{TOTALRESULTS, plural, =0{no results} one{1 result} other{# results}}"
      />
    </small>
  );
};

export default PagingInfo;
