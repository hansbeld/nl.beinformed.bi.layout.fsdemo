// @flow
import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import type ActionModel from "beinformed/models/actions/ActionModel";
import {
  INLINE_EDIT_CLONE_ACTION,
  INLINE_EDIT_DELETE_ACTION,
  INLINE_EDIT_UPDATE_ACTION
} from "beinformed/constants/LayoutHints";
import ListItemModel from "beinformed/models/list/ListItemModel";
import AttributeCollection from "beinformed/models/attributes/AttributeCollection";
import ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";
import ErrorCollection from "beinformed/models/error/ErrorCollection";

/**
 * Editable ListItem Model, maps an update Action on a ListItemModel
 */
export default class EditableListItemModel extends ListItemModel {
  _cloneAction: ActionModel;
  _deleteAction: ActionModel;
  _saveAction: ActionModel;
  _isChanged: boolean;
  _errorCollection: ErrorCollection;

  /**
   * constructor
   */
  constructor(
    modularUIResponse: ModularUIResponse,
    saveAction: ActionModel | null = null
  ) {
    super(modularUIResponse);

    // When save action is explicitly set, use this action as the save action.
    if (saveAction !== null) {
      this.saveAction = saveAction;
    }

    if (this.saveAction) {
      this._attributeCollection = this.constructEditableAttributeCollection();
    }
  }

  /**
   * Retrieve the action that can update or create this listitem
   */
  get saveAction(): ActionModel | null {
    if (this._saveAction) {
      return this._saveAction;
    }

    const updateActionByHint = this.actionCollection.getActionsByLayoutHint(
      INLINE_EDIT_UPDATE_ACTION
    );

    if (updateActionByHint.hasItems) {
      return updateActionByHint.first;
    }

    return this.getActionsByType("update").first;
  }

  /**
   * Set the action that can be used to update or create this ListItem
   */
  set saveAction(action: ActionModel) {
    this._saveAction = action;
  }

  /**
   * Retrieve the action that can perform a delete of this listitem
   */
  get deleteAction(): ActionModel | null {
    if (this._deleteAction) {
      return this._deleteAction;
    }

    const deleteActionByHint = this.actionCollection.getActionsByLayoutHint(
      INLINE_EDIT_DELETE_ACTION
    );

    if (deleteActionByHint.hasItems) {
      return deleteActionByHint.first;
    }

    return this.getActionsByType("delete").first;
  }

  /**
   * Set the action that can be used to delete this ListItem
   */
  set deleteAction(action: ActionModel) {
    this._deleteAction = action;
  }

  /**
   * Retrieve the create action that can be used to clone this ListItem
   */
  get cloneAction(): ActionModel | null {
    if (this._cloneAction) {
      return this._cloneAction;
    }

    const cloneActionByHint = this.actionCollection.getActionsByLayoutHint(
      INLINE_EDIT_CLONE_ACTION
    );

    if (cloneActionByHint.hasItems) {
      return cloneActionByHint.first;
    }

    return null;
  }

  /**
   * Set the action that can be used to delete this ListItem
   */
  set cloneAction(action: ActionModel) {
    this._cloneAction = action;
  }

  /**
   * Check if all attributes in list item have a valid value
   */
  get isValid(): boolean {
    return this.attributeCollection.all.every(attribute => attribute.isValid);
  }

  /**
   * Return a mapped array of list attributes mapped on the corresponding form attribute.
   * Attributes of the fields of an action are replacing the attributes on the list item
   * @override
   */
  constructEditableAttributeCollection() {
    const newCollection = new AttributeCollection();

    this.attributeCollection.all.forEach(attribute => {
      const updateActionField = this.saveAction
        ? this.saveAction.getFieldByKey(attribute.name)
        : null;

      if (updateActionField && !updateActionField.readonly) {
        if (updateActionField instanceof ChoiceAttributeModel) {
          updateActionField.enableOption(attribute.inputvalue);
        } else {
          updateActionField.update(attribute.inputvalue);
        }
        newCollection.add(updateActionField);
      } else {
        newCollection.add(attribute);
      }
    });

    return newCollection;
  }

  /**
   * Retrieve an attribute by it's key
   */
  getAttributeByKey(key: string) {
    return this.attributeCollection.getAttributeByKey(key);
  }

  /**
   * Update an attribute on this listitem that is editable
   */
  updateEditableAttribute(attribute: AttributeType, value: string) {
    this._isChanged = true;
    const editableAttribute = this.attributeCollection.getAttributeByKey(
      attribute.key
    );

    if (editableAttribute === null) {
      throw new Error(
        `Editable attribute with key: ${attribute.key} not found.`
      );
    }

    editableAttribute.update(value);
  }

  /**
   * Inidicates the Listitem is changed
   */
  set isChanged(isChanged: boolean) {
    this._isChanged = isChanged;
  }

  /**
   * Retrieve the ischanged status
   */
  get isChanged(): boolean {
    return this._isChanged;
  }

  /**
   * Retrieve all errormessages on this listitem
   */
  get errorCollection(): ErrorCollection {
    return this._errorCollection || new ErrorCollection("list");
  }

  /**
   * Indicates this EditableListItem has errors or not
   * @return {boolean}
   */
  hasErrors() {
    return this.errorCollection.hasItems;
  }
}
