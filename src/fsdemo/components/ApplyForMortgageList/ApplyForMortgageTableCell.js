// @flow
import React from "react";
import classNames from "classnames";

import InlineEditCellRenderer from "beinformed/components/InlineEdit/InlineEditCellRenderer";
import TableCell from "beinformed/components/List/TableView/TableCell";
import type { EditableListItemModel } from "beinformed/models";

import "./ApplyForMortgageTableCell.scss";

type ApplyForMortgageTableCellProps = {
  attribute?: AttributeType,
  className?: string,
  hasFocus?: boolean,
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
const ApplyForMortgageTableCell = (props: ApplyForMortgageTableCellProps) => {
  const cellClass = classNames(
    "table-cell table-cell-inline-edit apply-for-mortgage-table-cell",
    props.className
  );

  if (props.attribute && !props.attribute.readonly) {
    return (
      <div className={cellClass}>
        <div className="label">{props.attribute.label}</div>
        <InlineEditCellRenderer {...props} />
      </div>
    );
  }

  return <TableCell {...props} />;
};

export default ApplyForMortgageTableCell;
