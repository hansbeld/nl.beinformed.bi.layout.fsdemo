// @flow
import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import EditableListItemModel from "beinformed/models/list/EditableListItemModel";
import {
  INLINE_EDIT_LIST,
  INLINE_EDIT_CAN_DUPLICATE
} from "beinformed/constants/LayoutHints";
import ListModel from "beinformed/models/list/ListModel";
import ListItemCollection from "beinformed/models/list/ListItemCollection";

/**
 * Defines an editable list object, created with the inline-edit layouthint pattern
 */
export default class EditableListModel extends ListModel {
  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.layouthint &&
      data.contributions.layouthint.includes(INLINE_EDIT_LIST)
    );
  }

  /**
   * Create a ListItem
   */
  createListItem(resultItem: { [string]: ListItemJSON }) {
    const key = Object.keys(resultItem)[0];

    const listitemInput = new ModularUIResponse();
    listitemInput.key = key;
    listitemInput.data = resultItem[key];
    listitemInput.contributions = this.contributions.results[key];

    const listitem = new EditableListItemModel(listitemInput);

    if (this.canDuplicateListItems()) {
      listitem.cloneAction = this.getActionsByType("create").first;
    }

    return listitem;
  }

  /**
   * Indicates if the list can duplicate list items
   */
  canDuplicateListItems() {
    return this.layouthint.has(INLINE_EDIT_CAN_DUPLICATE);
  }

  /**
   * Replace an existing list item in the list for a new list item, matched on id
   */
  replaceListItem(
    oldListitem: EditableListItemModel,
    newListItem: EditableListItemModel
  ) {
    const newCollection = new ListItemCollection();

    newCollection.collection = this.listItemCollection.all.map(result => {
      if (result.id === oldListitem.id) {
        return newListItem;
      }

      return result;
    });

    this.listItemCollection = newCollection;
  }
}
