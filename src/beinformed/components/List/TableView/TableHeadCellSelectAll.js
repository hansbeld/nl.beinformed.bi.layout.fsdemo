// @flow
import React from "react";
import classNames from "classnames";

import ListModel from "beinformed/models/list/ListModel";
import MultiRowTaskAllCheckbox from "beinformed/containers/MultiRowTask/MultiRowTaskAllCheckbox";

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
      />
    </div>
  );
};

export default TableHeadCellSelectAll;
