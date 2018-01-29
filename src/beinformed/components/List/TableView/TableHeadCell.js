// @flow
import React from "react";
import classNames from "classnames";

type TableHeadCellProps = {
  children?: any,
  className?: string,
  minWidth?: number,
  width?: string
};

/**
 * Render an HTML table
 */
const TableHeadCell = ({
  className,
  minWidth,
  width,
  children
}: TableHeadCellProps) => {
  const tableHeadClass = classNames("table-cell", className);
  const cellStyle = {
    minWidth,
    width
  };

  return (
    <div className={tableHeadClass} style={cellStyle}>
      {children}
    </div>
  );
};

export default TableHeadCell;
