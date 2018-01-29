// @flow
import React from "react";
import classNames from "classnames";

import InlineEditCellRenderer from "beinformed/components/InlineEdit/InlineEditCellRenderer";
import TableCell from "beinformed/components/List/TableView/TableCell";
import type EditableListItemModel from "beinformed/models/list/EditableListItemModel";

type InlineEditTableCellProps = {
  attribute?: AttributeType,
  className?: string,
  item?: EditableListItemModel,
  minWidth: number,
  width: string,
  onBlur?: Function,
  onChange?: Function,
  onFocus?: Function
};

/**
 * Render an HTML table cell
 */
const InlineEditTableCell = (props: InlineEditTableCellProps) => {
  const cellClass = classNames(
    "table-cell table-cell-inline-edit",
    props.className
  );
  const cellStyle = {
    minWidth: props.minWidth,
    width: props.width
  };

  if (props.attribute && !props.attribute.readonly) {
    return (
      <div className={cellClass} style={cellStyle}>
        <InlineEditCellRenderer {...props} />
      </div>
    );
  }

  return <TableCell {...props} />;
};

export default InlineEditTableCell;
