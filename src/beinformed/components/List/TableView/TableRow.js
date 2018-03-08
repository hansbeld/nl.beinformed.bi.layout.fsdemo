// @flow
import React from "react";
import classNames from "classnames";

import { MULTI_ROW_TASK } from "beinformed/constants/LayoutHints";

import TableCellSelectable from "beinformed/components/List/TableView/TableCellSelectable";

import type { ListModel, ListItemModel } from "beinformed/models";
type TableRowProps = {
  className?: string,
  children?: any,
  item: ListItemModel,
  list: ListModel
};

/**
 * Render an HTML table row
 */
const TableRow = ({ className, children, item, list }: TableRowProps) => {
  const tableRowsClass = classNames("table-row", className);

  /**
   * Makes a clone of the cell component and renders for each header item a cell.
   * By rendering each header cell we have a concistent table row, regardless of the contents of the row
   */
  const renderChildren = (headers, cellcomponent, listitem) =>
    headers.map(header =>
      React.cloneElement(React.Children.only(cellcomponent), {
        attribute: listitem.getAttributeByKey(header.key),
        key: `${item.id}--${header.key}`
      })
    );

  return (
    <div className={tableRowsClass}>
      {list.actionCollection.hasActionsByLayoutHint(MULTI_ROW_TASK) && (
        <TableCellSelectable key="cellSelect" item={item} />
      )}
      {renderChildren(list.headers, children, item)}
    </div>
  );
};

export default TableRow;
