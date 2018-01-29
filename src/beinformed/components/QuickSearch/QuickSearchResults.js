// @flow
import React from "react";
import classNames from "classnames";

import { Message } from "beinformed/containers/I18n/Message";
import ListView from "beinformed/components/List/ListView/List";

import "./QuickSearchResults.scss";

import type CaseSearchModel from "beinformed/models/search/CaseSearchModel";

type QuickSearchType = {
  className?: string,
  search: CaseSearchModel
};

/**
 * Render default text field
 */
const QuickSearchResults = ({ className, search }: QuickSearchType) => {
  const resultsClass = classNames("quicksearch-results", className, {
    "no-results": !search.hasResults()
  });

  if (search.hasResults()) {
    return (
      <div className={resultsClass}>
        <ListView list={search} openListItemInCaseView />
      </div>
    );
  }

  return (
    <div className={resultsClass}>
      <Message
        id="QuickSearchResuls.Msg.NoResults"
        defaultMessage="No search results"
      />
    </div>
  );
};

export default QuickSearchResults;
