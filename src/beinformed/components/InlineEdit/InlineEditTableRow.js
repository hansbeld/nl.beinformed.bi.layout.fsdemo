// @flow
import React, { Component } from "react";
import classNames from "classnames";

import FormErrorList from "beinformed/components/FormError/FormErrorList";

import InlineEditActionsCell from "beinformed/components/InlineEdit/InlineEditActionsCell";

import type EditableListItemModel from "beinformed/models/list/EditableListItemModel";
import type ListModel from "beinformed/models/list/ListModel";

type InlineEditTableRowProps = {
  children?: any,
  item: EditableListItemModel,
  list: ListModel,

  onCloneListItemClick: Function,
  onAttributeChange: Function,
  onCancel: Function,
  onFinishProgress: Function,
  onItemClick: Function,
  onSave: Function,
  onDelete: Function,
  onStartProgress: Function
};

type InlineEditTableRowState = {
  hasFocus?: boolean,
  hasChanges: boolean,
  hasErrors: boolean,
  isCancelled: boolean,
  isSaving: boolean,
  showSaveCancel: boolean
};

/**
 * Render an HTML table
 */
class InlineEditTableRow extends Component<
  InlineEditTableRowProps,
  InlineEditTableRowState
> {
  constructor(props: InlineEditTableRowProps) {
    super(props);

    this.state = {
      hasFocus: false,
      hasChanges: false,
      hasErrors: false,
      isCancelled: false,
      isSaving: false,
      showSaveCancel: false
    };
  }

  /**
   * componentWillReceiveProps
   * @param {Object} nextProps - Next props
   */
  componentWillReceiveProps(nextProps: InlineEditTableRowProps) {
    if (this.state.isSaving) {
      this.setState({
        isSaving: nextProps.item.isChanged && !nextProps.item.hasErrors(),
        hasChanges: nextProps.item.isChanged,
        hasErrors: nextProps.item.hasErrors(),
        showSaveCancel: nextProps.item.isChanged || nextProps.item.hasErrors()
      });
    }
  }

  /**
   * Handles the change of a cell
   */
  handleCellChange = (attribute: AttributeType, inputvalue: string) => {
    this.props.onAttributeChange(
      this.props.list,
      this.props.item,
      attribute,
      inputvalue
    );

    this.setState({
      hasChanges: true,
      hasErrors: !this.props.item.isValid
    });
  };

  /**
   * Handles click on the cancel button, reloads the list through the cancel action
   * @param  {SytheticEvent} e - event data
   */
  handleCancelClick = (e: SyntheticEvent<*>) => {
    e.preventDefault();

    this.setState({
      isCancelled: true,
      hasChanges: false,
      hasFocus: false,
      hasErrors: false,
      showSaveCancel: false
    });

    this.props.onCancel(this.props.list);
  };

  /**
   * Handles the blur of a cell
   * When no other cell has focus, the whole row is blurred and the save action is triggered
   */
  handleCellBlur = () => {
    if (!this.state.hasErrors) {
      this.setState({
        hasFocus: false
      });
    }

    const TIMEOUT_BEFORE_SAVE = 200;

    setTimeout(() => {
      if (
        !this.state.isSaving &&
        !this.state.hasFocus &&
        this.state.hasChanges &&
        !this.state.hasErrors
      ) {
        this.setState({
          isSaving: true
        });

        this.props.onSave(this.props.list, this.props.item);
      } else if (!this.state.hasFocus) {
        this.setState({
          isCancelled: false,
          showSaveCancel: false
        });
      } else if (this.state.isCancelled) {
        this.setState({
          isCancelled: false
        });
      }
    }, TIMEOUT_BEFORE_SAVE);
  };

  /**
   * Handle the focus of a cell
   */
  handleCellFocus = () => {
    this.setState({
      showSaveCancel: true,
      hasFocus: true
    });
  };

  /**
   * Handles the click on the delete button of a row
   */
  handleDeleteClick = () => {
    this.props.onDelete(this.props.item.deleteAction);
  };

  /**
   * Handles the click on the clone button of a row
   */
  handleCloneClick = () => {
    this.props.onCloneListItemClick(this.props.item);
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const hasActions =
      typeof this.props.item.deleteAction !== "undefined" ||
      typeof this.props.item.cloneAction !== "undefined";
    const tableRowsClass = classNames("table-row", {
      "has-actions": hasActions
    });

    return (
      <div className={tableRowsClass} data-id={this.props.item.id}>
        {this.props.list.headers.map((header, i) => {
          const attribute = this.props.item.getAttributeByKey(header.key);

          if (attribute) {
            return React.cloneElement(
              React.Children.only(this.props.children),
              {
                attribute,
                item: this.props.item,
                key: `${this.props.item.id}--${header.key}--${i}`,
                onChange: value => this.handleCellChange(attribute, value),
                onBlur: this.handleCellBlur,
                onFocus: this.handleCellFocus
              }
            );
          }

          return null;
        })}

        {hasActions && (
          <InlineEditActionsCell
            rowHasErrors={this.state.hasErrors}
            isSaving={this.state.isSaving}
            itemId={this.props.item.id}
            showCancelButton={this.state.showSaveCancel}
            showSaveButton={this.state.showSaveCancel && this.state.hasChanges}
            cloneAction={this.props.item.cloneAction}
            deleteAction={this.props.item.deleteAction}
            onCancelClick={this.handleCancelClick}
            onSaveClick={this.handleCellBlur}
            onDeleteClick={this.handleDeleteClick}
            onCloneClick={this.handleCloneClick}
            onBlur={this.handleCellBlur}
            onFocus={this.handleCellFocus}
          />
        )}
        {this.props.item.errorCollection.hasItems && (
          <div className="text-danger text-right">
            <FormErrorList errorCollection={this.props.item.errorCollection} />
          </div>
        )}
      </div>
    );
  }
}

export default InlineEditTableRow;
