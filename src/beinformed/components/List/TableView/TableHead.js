// @flow
import React from "react";
import classNames from "classnames";

import type { ListModel } from "beinformed/models";
import TableHeadCellSelectAll from "beinformed/components/List/TableView/TableHeadCellSelectAll";
import { MULTI_ROW_TASK } from "beinformed/constants/LayoutHints";

type TableHeadProps = {
  children?: any,
  className?: string,
  list: ListModel
};

/**
 * Render an HTML table
 */
const TableHead = ({ children, className, list }: TableHeadProps) => {
  const tableHeadClass = classNames("table-header", className);

  return (
    <div className={tableHeadClass}>
      {list.actionCollection.hasActionsByLayoutHint(MULTI_ROW_TASK) && (
        <TableHeadCellSelectAll list={list} />
      )}
      {list.headers.map(header =>
        React.cloneElement(React.Children.only(children), {
          children: header.label,
          key: `headercell--${header.key}`,
          className: classNames({
            "text-right": header.alignment === "right",
            "text-center": header.alignment === "center"
          })
        })
      )}
    </div>
  );
};

export default TableHead;
