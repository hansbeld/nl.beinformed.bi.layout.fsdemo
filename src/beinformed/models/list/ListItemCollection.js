// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";
import type ListItemModel from "beinformed/models/list/ListItemModel";
import type EditableListItemModel from "beinformed/models/list/EditableListItemModel";

/**
 * Collection of list items
 */
class ListItemCollection extends BaseCollection<
  ListItemModel | EditableListItemModel
> {}

export default ListItemCollection;
