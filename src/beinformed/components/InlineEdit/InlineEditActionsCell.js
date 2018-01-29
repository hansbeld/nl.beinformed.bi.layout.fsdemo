// @flow
import React, { Component } from "react";

import Button from "beinformed/components/Button/Button";
import Icon from "beinformed/components/Icon/Icon";
import Link from "beinformed/components/Link/Link";

import { Message } from "beinformed/containers/I18n/Message";
import type ActionModel from "beinformed/models/actions/ActionModel";

type InlineEditActionsCellProps = {
  cloneAction?: ActionModel | null,
  deleteAction?: ActionModel | null,
  isSaving: boolean,
  itemId: string | number,
  rowHasErrors: boolean,
  showCancelButton: boolean,
  showSaveButton: boolean,
  onBlur?: Function,
  onCancelClick: Function,
  onCloneClick?: Function,
  onDeleteClick?: Function,
  onFocus?: Function,
  onSaveClick: Function
};

class InlineEditActionsCell extends Component<InlineEditActionsCellProps> {
  renderSaveButton() {
    if (
      this.props.showSaveButton &&
      !this.props.rowHasErrors &&
      !this.props.isSaving
    ) {
      return (
        <Button
          name={`${this.props.itemId}--save`}
          className="btn-task btn-save"
          onClick={this.props.onSaveClick}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        >
          <Icon name="save" />
          <Message
            id="InlineEdit.SaveRow"
            defaultMessage="Save row"
            screenreaderOnly
          />
        </Button>
      );
    }

    return null;
  }

  renderProgressButton() {
    if (this.props.isSaving) {
      return (
        <Button
          name={`${this.props.itemId}--save-inprogress`}
          className="btn-task btn-save-inprogress"
          disabled
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        >
          <Icon name="circle-o-notch" spin />
          <Message
            id="InlineEdit.SaveInProgress"
            defaultMessage="Save in progress"
            screenreaderOnly
          />
        </Button>
      );
    }

    return null;
  }

  renderErrorButton() {
    if (this.props.rowHasErrors) {
      return (
        <Button
          name={`${this.props.itemId}--save-error`}
          buttonStyle="danger"
          className="btn-task btn-save-error"
          disabled
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        >
          <Icon name="exclamation" />
          <Message
            id="InlineEdit.RowInError"
            defaultMessage="Row has errors"
            screenreaderOnly
          />
        </Button>
      );
    }

    return null;
  }

  renderCancelButton() {
    return (
      <Button
        name={`${this.props.itemId}--cancel`}
        className="btn-task btn-cancel"
        onClick={this.props.onCancelClick}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus}
      >
        <Icon name="times" />
        <Message
          id="InlineEdit.CancelEdit"
          defaultMessage="Cancel edit"
          screenreaderOnly
        />
      </Button>
    );
  }

  renderDeleteButton() {
    if (this.props.deleteAction) {
      return (
        <Link
          key={`${this.props.itemId}--delete`}
          dataId={`${this.props.itemId}--delete`}
          href={this.props.deleteAction.selfhref}
          className="btn btn-light btn-task btn-delete"
          isModal
        >
          <Icon name="trash-o" />
          <Message
            id="InlineEdit.DeleteRow"
            defaultMessage="Delete row"
            screenreaderOnly
          />
        </Link>
      );
    }

    return null;
  }

  renderCloneButton() {
    if (this.props.cloneAction && this.props.onCloneClick) {
      return (
        <Link
          key={`${this.props.itemId}--clone`}
          dataId={`${this.props.itemId}--clone`}
          href={this.props.cloneAction.selfhref}
          className="btn btn-light btn-task btn-clone"
          onClick={this.props.onCloneClick}
        >
          <Icon name="files-o" />
          <Message
            id="InlineEdit.CloneRow"
            defaultMessage="Clone row"
            screenreaderOnly
          />
        </Link>
      );
    }

    return null;
  }

  render() {
    if (this.props.showCancelButton) {
      return (
        <div className="table-cell table-cell-inline-actions">
          {this.renderSaveButton()}
          {this.renderProgressButton()}
          {this.renderErrorButton()}
          {this.renderCancelButton()}
        </div>
      );
    }
    return (
      <div className="table-cell table-cell-inline-actions">
        {this.renderDeleteButton()}
        {this.renderCloneButton()}
      </div>
    );
  }
}

export default InlineEditActionsCell;
