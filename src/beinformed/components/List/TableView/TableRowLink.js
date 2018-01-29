// @flow
import React from "react";
import classNames from "classnames";

import { MULTI_ROW_TASK } from "beinformed/constants/LayoutHints";
import ListItemModel from "beinformed/models/list/ListItemModel";
import ListModel from "beinformed/models/list/ListModel";
import TableCellSelectable from "beinformed/components/List/TableView/TableCellSelectable";
import Href from "beinformed/models/href/Href";
import Link from "beinformed/components/Link/Link";

import "./TableRow.scss";

type TableRowLinkProps = {
  className?: string,
  children?: any,
  item: ListItemModel,
  list: ListModel,
  href: Href
};

/**
 * Render an HTML table row
 */
const TableRowLink = ({
  className,
  children,
  item,
  list,
  href
}: TableRowLinkProps) => {
  const TableRowLinksClass = classNames("table-row table-row-link", className);

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
    <div
      className={TableRowLinksClass}
      data-id={item.id}
      role="button"
      tabIndex="0"
    >
      {list.actionCollection.hasActionsByLayoutHint(MULTI_ROW_TASK) && (
        <TableCellSelectable key="cellSelect" item={item} />
      )}
      <Link href={href}>{renderChildren(list.headers, children, item)}</Link>
    </div>
  );
};

export default TableRowLink;
