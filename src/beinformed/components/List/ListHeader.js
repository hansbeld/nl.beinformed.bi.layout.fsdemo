// @flow
import React from "react";
import classNames from "classnames";

import FormattedText from "beinformed/components/FormattedText/FormattedText";

import type ListModel from "beinformed/models/list/ListModel";

type ListHeaderProps = {
  className?: string,
  list: ListModel
};

/**
 * Render List list
 */
const ListHeader = ({ className, list }: ListHeaderProps) => {
  const listHeaderClass = classNames("list-header", className);

  return (
    <div className={listHeaderClass}>
      <h3 className="list-label">{list.label}</h3>
      {list.introtext && (
        <FormattedText className="introtext" text={list.introtext} />
      )}
    </div>
  );
};

export default ListHeader;
