// @flow
import React, { Component } from "react";
import classNames from "classnames";

import InlineEditCreateTableRow from "beinformed/components/InlineEdit/InlineEditCreateTableRow";
import ApplyForMortgageTableCell from "fsdemo/components/ApplyForMortgageList/ApplyForMortgageTableCell";
import InlineEditTableRows from "beinformed/components/InlineEdit/InlineEditTableRows";
import FormattedText from "beinformed/components/FormattedText/FormattedText";

import "./ApplyForMortgageList.scss";

import type ListModel from "beinformed/models/list/ListModel";
import type EditableListItemModel from "beinformed/models/list/EditableListItemModel";

type InlineEditTableProps = {
  className?: string,
  list: ListModel,
  onAttributeChange: Function,
  onCancel: Function,
  onCloneListItemClick: Function,
  onDelete: Function,
  onFinishProgress: Function,
  onItemClick: Function,
  onSave: Function,
  onStartProgress: Function
};

type InlineEditTableState = {
  cloneListItemId: string | number | null
};

/**
 * Render an HTML table
 */
class InlineEditTable extends Component<
  InlineEditTableProps,
  InlineEditTableState
> {
  _createRow: ?InlineEditCreateTableRow;

  icon: string;
  label: string;
  type: string;

  constructor(props: InlineEditTableProps) {
    super(props);
    this.state = {
      cloneListItemId: null
    };
  }

  static icon = "pencil";
  static label = "editable table";
  static type = "EditableTableView";

  /**
   * componentWillReceiveProps
   * Set cloneListItemid on null
   */
  componentWillReceiveProps() {
    if (this.state.cloneListItemId !== null) {
      this.setState({
        cloneListItemId: null
      });
    }
  }

  /**
   * Handles the click on the clone button of a table row
   */
  handleCloneListItemClick = (listitem: EditableListItemModel) => {
    this.props.onStartProgress();

    if (this._createRow) {
      this._createRow.scrollIntoView();
    }

    this.setState({
      cloneListItemId: listitem.id
    });

    this.props.onFinishProgress();
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const tableClass = classNames(
      "table table-inline-edit",
      this.props.className,
      {
        "has-delete-task":
          typeof this.props.list.listItemCollection.find(
            listitem => listitem.getActionsByType("delete").hasItems
          ) !== "undefined",
        "has-clone-task": this.props.list.getActionsByType("create").hasItems
      }
    );

    const TABLE_WIDTH_PERCENTAGE = 100;
    const TABLE_MIN_CELL_WIDTH = 100;
    const TABLE_BORDER_WIDTH = 2;
    const ACTION_CELL_PADDING = 55;

    const tableCellWidth =
      TABLE_WIDTH_PERCENTAGE / this.props.list.headers.length;

    const tableStyle = {
      minWidth:
        this.props.list.headers.length * TABLE_MIN_CELL_WIDTH +
        TABLE_BORDER_WIDTH +
        ACTION_CELL_PADDING
    };

    const createActions = this.props.list.getActionsByType("create");

    return (
      <div className="apply-for-mortgage-list">
        {this.props.list.key === "IncomeSources" && (
          <h4 className="list-label">{this.props.list.label}</h4>
        )}
        {this.props.list.introtext && (
          <FormattedText
            className="introtext"
            text={this.props.list.introtext}
          />
        )}
        <div className="tableWrapper">
          <div className={tableClass} style={tableStyle}>
            <InlineEditTableRows
              {...this.props}
              onCloneListItemClick={this.handleCloneListItemClick}
            >
              <ApplyForMortgageTableCell
                key="bodycell"
                width={`${tableCellWidth}%`}
                minWidth={TABLE_MIN_CELL_WIDTH}
                {...this.props}
              />

              {createActions.hasItems && (
                <InlineEditCreateTableRow
                  ref={c => {
                    this._createRow = c;
                  }}
                  action={createActions.first}
                  cloneListItemId={this.state.cloneListItemId}
                  showListColumns={false}
                  {...this.props}
                >
                  <ApplyForMortgageTableCell
                    key="bodycell"
                    width={`${tableCellWidth}%`}
                    minWidth={TABLE_MIN_CELL_WIDTH}
                    {...this.props}
                  />
                </InlineEditCreateTableRow>
              )}
            </InlineEditTableRows>
          </div>
        </div>
      </div>
    );
  }
}

export default InlineEditTable;
