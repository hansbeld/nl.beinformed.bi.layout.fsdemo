// @flow
import React, { Component } from "react";
import PlusIcon from "mdi-react/PlusIcon";

import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import Link from "beinformed/components/Link/Link";
import InlineEditActionsCell from "beinformed/components/InlineEdit/InlineEditActionsCell";
import { withModularUI } from "beinformed/modularui";

import { EditableListItemModel, FormModel } from "beinformed/models";

import type { ListModel, ActionModel } from "beinformed/models";

type InlineEditCreateTableRowProps = {
  action: ActionModel,
  children?: any,
  cloneListItemId: string | number | null,
  list: ListModel,
  showListColumns: boolean,
  modularui: any,
  onAttributeChange: Function,
  onSave: Function,
  startProgress: Function,
  finishProgress: Function
};

type InlineEditCreateTableRowState = {
  hasFocus?: boolean,
  hasChanges: boolean,
  hasErrors: boolean,
  isSaving: boolean,
  showCreateRow: boolean,
  emptyItem: EditableListItemModel | null,
  item: EditableListItemModel | null
};

/**
 * Render an Inline edit create row
 */
class InlineEditCreateTableRow extends Component<
  InlineEditCreateTableRowProps,
  InlineEditCreateTableRowState
> {
  _createRow: ?HTMLDivElement;

  static defaultProps = {
    showListColumns: true
  };

  constructor(props: InlineEditCreateTableRowProps) {
    super(props);
    this.state = {
      hasFocus: false,
      hasChanges: false,
      hasErrors: false,
      isSaving: false,
      showCreateRow: false,
      emptyItem: null,
      item: null
    };
  }

  componentDidMount() {
    if (this.props.action.fields.length > 0) {
      this.createEditableListItemFromFields();
    } else {
      this.createEditableListItemFromRequest();
    }
  }

  createEditableListItemFromRequest() {
    const modularuiRequest = this.props.modularui(this.props.action.selfhref, {
      method: "POST",
      data: {}
    });
    modularuiRequest.targetModel = FormModel;

    modularuiRequest.fetchFromCache().then(form => {
      this.createEditableListItem(
        this.props.action,
        form.missingObjects.first.attributeCollection.all
      );
    });
  }

  /**
   * Create a new list item model,
   * create a new response with the request parameters as fields for the create list item
   */
  createEditableListItemFromFields() {
    const action = this.props.action;

    this.createEditableListItem(action, action.fields);
  }

  createEditableListItem(
    action: ActionModel,
    attributes: Array<AttributeType>
  ) {
    const itemContribution = {
      attributes: [],
      metadata: {
        _id: {
          type: "number"
        }
      }
    };
    const itemAttributes = {};
    attributes.forEach(attribute => {
      itemAttributes[attribute.name] = null;
      itemContribution.attributes.push({
        [attribute.name]: {
          ...attribute.contributions,
          readonly: attribute.contributions.readonly || false
        }
      });
    });

    const listitemInput = new ModularUIResponse();
    listitemInput.key = action.key;
    listitemInput.data = itemAttributes;
    listitemInput.contributions = itemContribution;

    const listitem = new EditableListItemModel(listitemInput, action);

    this.setState({
      emptyItem: listitem
    });
  }

  /**
   * When a clone list item id is present render the create row with the item to clone as list item input
   */
  componentWillReceiveProps(nextProps: InlineEditCreateTableRowProps) {
    // when current result equals next result, the create row is saved
    if (
      this.props.list.listItemCollection.length !==
      nextProps.list.listItemCollection.length
    ) {
      this.setState({
        showCreateRow: false,
        isSaving: false,
        hasErrors: false,
        hasChanges: false,
        item: null
      });
    } else if (nextProps.cloneListItemId !== null && this.state.item === null) {
      // show clone create row
      this.setState({
        item: this.cloneEditableListItem(nextProps.cloneListItemId),
        showCreateRow: true,
        hasErrors: false,
        hasChanges: true
      });

      this.scrollIntoView();
    }
  }

  /**
   * Method handling an element change
   */
  handleCellChange = (attribute: AttributeType, inputvalue: string) => {
    this.props.onAttributeChange(
      this.props.list,
      this.state.item,
      attribute,
      inputvalue
    );

    this.setState({
      hasChanges: true,
      hasErrors: this.state.item !== null && !this.state.item.isValid
    });
  };

  /**
   * Method handling when cancel button clicked
   */
  handleCancelClick = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    this.props.startProgress();
    this.setState({
      hasChanges: false,
      hasFocus: false,
      hasErrors: false,
      showCreateRow: false,
      item: null
    });
    this.props.finishProgress();
  };

  /**
   * Method handling an element blur
   */
  handleCellBlur = () => {
    this.setState({
      hasFocus: false
    });

    const TIMEOUT_BEFORE_SAVE = 200;

    setTimeout(() => {
      if (!this.state.hasFocus) {
        this.handleSaveClick();
      }
    }, TIMEOUT_BEFORE_SAVE);
  };

  /**
   * Method handling click on the save button
   */
  handleSaveClick = () => {
    if (
      !this.state.isSaving &&
      this.state.hasChanges &&
      !this.state.hasErrors
    ) {
      this.setState({
        isSaving: true,
        hasFocus: false
      });

      this.props.onSave(this.props.list, this.state.item);
    }
  };

  /**
   * Method handling an element focus
   */
  handleCellFocus = () => {
    this.setState({
      hasFocus: true
    });
  };

  /**
   * Method handling the click on the create button
   */
  handleCreateClick = () => {
    const emptyItem = this.state.emptyItem;
    if (emptyItem === null) {
      throw new Error("No empty item to create");
    }

    this.props.startProgress();

    const newItem = emptyItem.clone(true);

    this.setState({
      item: newItem,
      showCreateRow: true
    });

    this.props.finishProgress();
  };

  /**
   * Scroll create row into view
   */
  scrollIntoView() {
    const SCROLL_TIMEOUT = 200;

    setTimeout(() => {
      if (this._createRow) {
        const elementBottom = this._createRow.getBoundingClientRect().bottom;
        window.scrollTo(0, elementBottom);
      }
    }, SCROLL_TIMEOUT);
  }

  /**
   * Clone an EditableListItem model by id
   */
  cloneEditableListItem(cloneId: string | number | null) {
    if (cloneId === null) {
      return null;
    }

    const emptyItem = this.state.emptyItem;
    if (emptyItem === null) {
      return null;
    }

    const originalItem = this.props.list.getListItemById(cloneId);
    const newItem = emptyItem.clone();

    this.props.list.headers.forEach(header => {
      const attribute = originalItem.getAttributeByKey(header.key);

      if (
        attribute &&
        newItem.attributeCollection.hasAttributeByKey(header.key)
      ) {
        newItem.updateEditableAttribute(
          attribute,
          attribute.readonly ? null : attribute.inputvalue
        );
      }
    });

    return newItem;
  }

  renderCell(id: string, key: string, attribute: AttributeType) {
    return React.cloneElement(React.Children.only(this.props.children), {
      key: `${id}--${key}`,
      hasFocus: this.state.hasFocus,
      attribute,
      item: this.state.item,
      onChange: value => this.handleCellChange(attribute, value),
      onBlur: this.handleCellBlur,
      onFocus: this.handleCellFocus
    });
  }

  render() {
    const stateItem = this.state.item;
    if (stateItem && stateItem !== null && this.state.showCreateRow) {
      const itemId = stateItem === null ? "" : stateItem.id;

      // combine list attribute and task attributes
      const attributes = [];

      if (this.props.showListColumns) {
        attributes.push(
          ...this.props.list.headers.map(header =>
            stateItem.getAttributeByKey(header.key)
          )
        );
      }

      // add form attributes not yet in the list of attributes
      attributes.push(
        ...stateItem.attributeCollection.filter(
          attribute =>
            typeof attributes.find(
              header => header !== null && header.key === attribute.key
            ) === "undefined"
        )
      );
      return (
        <div
          className="table-row create-table-row"
          ref={c => {
            this._createRow = c;
          }}
          data-id={itemId}
        >
          {attributes.map((attribute, i) =>
            this.renderCell(
              itemId.toString(),
              attribute ? attribute.key : `not-available-${i}`,
              attribute
            )
          )}
          <InlineEditActionsCell
            rowHasErrors={this.state.hasErrors}
            isSaving={this.state.isSaving}
            itemId={itemId}
            showCancelButton
            showSaveButton={this.state.hasChanges}
            onCancelClick={this.handleCancelClick}
            onSaveClick={this.handleSaveClick}
            onBlur={this.handleCellBlur}
            onFocus={this.handleCellFocus}
          />
        </div>
      );
    }

    return (
      <Link
        key={this.props.action.name}
        href={this.props.action.selfhref}
        className="btn btn-light btn-task mt-1"
        dataId={`${this.props.list.key}--create`}
        onClick={this.handleCreateClick}
      >
        <PlusIcon />
        {` ${this.props.action.label}`}
      </Link>
    );
  }
}

export default withModularUI(InlineEditCreateTableRow);
