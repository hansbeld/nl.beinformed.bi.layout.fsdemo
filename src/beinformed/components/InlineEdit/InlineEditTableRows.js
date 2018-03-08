// @flow
import React from "react";
import classNames from "classnames";

import { EditableListItemModel } from "beinformed/models";

import InlineEditTableRow from "beinformed/components/InlineEdit/InlineEditTableRow";

import type { ListModel } from "beinformed/models";

type InlineEditTableRowsProps = {
  children?: any,
  list: ListModel,
  onCloneListItemClick: Function,
  onAttributeChange: Function,
  onCancel: Function,
  onDelete: Function,
  onFinishProgress: Function,
  onItemClick: Function,
  onSave: Function,
  onStartProgress: Function
};

/**
 * Render an HTML table
 */
const InlineEditTableRows = (props: InlineEditTableRowsProps) => {
  const tableRowsClass = classNames("table-rows");

  const rowCells =
    Array.isArray(props.children) && props.children.length > 0
      ? props.children[0]
      : props.children;
  const rowActions =
    Array.isArray(props.children) && props.children.length > 1
      ? props.children[1]
      : null;

  return (
    <div className={tableRowsClass}>
      {props.list.listItemCollection.all.map(listitem => {
        if (listitem instanceof EditableListItemModel) {
          return (
            <InlineEditTableRow key={listitem.id} item={listitem} {...props}>
              {rowCells}
            </InlineEditTableRow>
          );
        }
        return null;
      })}
      {rowActions}
    </div>
  );
};

export default InlineEditTableRows;
