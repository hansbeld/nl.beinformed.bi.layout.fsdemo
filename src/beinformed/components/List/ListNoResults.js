// @flow
import React from "react";
import InformationIcon from "mdi-react/InformationIcon";

import { Message } from "beinformed/containers/I18n/Message";
/**
 * Render No results text
 */
const ListNoResults = ({ isSearch }: { isSearch: boolean }) => (
  <div className="no-results mt-1">
    <InformationIcon />
    <span className="ml-1">
      {isSearch ? (
        <Message
          id="ListNoResults.Msg.EnterSearchTerm"
          defaultMessage="Enter a search term to search"
        />
      ) : (
        <Message
          id="ListNoResults.Msg.NoResults"
          defaultMessage="No results available"
        />
      )}
    </span>
  </div>
);

export default ListNoResults;
