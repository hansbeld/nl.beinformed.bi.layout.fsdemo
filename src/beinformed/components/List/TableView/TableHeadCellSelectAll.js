// @flow
import React from "react";
import classNames from "classnames";

import MultiRowTaskAllCheckbox from "beinformed/containers/MultiRowTask/MultiRowTaskAllCheckbox";

import { Message } from "beinformed/i18n";

import type { ListModel } from "beinformed/models";
type TableHeadCellSelectAllProps = {
  className?: string,
  list: ListModel,
  minWidth?: number,
  width?: string
};

/**
 * Render an HTML table
 */
const TableHeadCellSelectAll = ({
  className,
  list,
  minWidth,
  width
}: TableHeadCellSelectAllProps) => {
  const tableHeadClass = classNames("table-cell", className);
  const cellStyle = {
    minWidth,
    width
  };

  return (
    <div className={tableHeadClass} style={cellStyle}>
      <MultiRowTaskAllCheckbox
        values={list.listItemCollection.all.map(item => item.id)}
      >
        <span className="sr-only">
          <Message
            id="MultiRowTask.AllCheckbox"
            defaultMessage="Check all items"
          />
        </span>
      </MultiRowTaskAllCheckbox>
    </div>
  );
};

export default TableHeadCellSelectAll;
