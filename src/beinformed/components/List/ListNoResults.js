// @flow
import React from "react";
import InformationOutlineIcon from "mdi-react/InformationOutlineIcon";

import { Message } from "beinformed/i18n";
/**
 * Render No results text
 */
const ListNoResults = ({ isSearch }: { isSearch: boolean }) => (
  <div className="no-results mt-1">
    <InformationOutlineIcon />
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
