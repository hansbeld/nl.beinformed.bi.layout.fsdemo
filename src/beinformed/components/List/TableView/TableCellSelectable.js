// @flow
import React from "react";
import classNames from "classnames";

import DetailModel from "beinformed/models/detail/DetailModel";
import MultiRowTaskCheckbox from "beinformed/containers/MultiRowTask/MultiRowTaskCheckbox";

type TableCellSelectableProps = {
  className?: string,
  item: DetailModel,
  minWidth?: number,
  width?: string
};

/**
 * Render an HTML table
 */
const TableCellSelectable = ({
  className,
  item,
  minWidth,
  width
}: TableCellSelectableProps) => {
  const tableHeadClass = classNames("table-cell", className);
  const cellStyle = {
    minWidth,
    width
  };

  return (
    <div className={tableHeadClass} style={cellStyle}>
      <MultiRowTaskCheckbox value={item.id} />
    </div>
  );
};

export default TableCellSelectable;
