// @flow
import type LinkCollection from "beinformed/models/links/LinkCollection";

import DetailModel from "beinformed/models/detail/DetailModel";
import Href from "beinformed/models/href/Href";

/**
 * List Item
 */
export default class ListItemModel extends DetailModel {
  get selfhref(): Href {
    const selflink = this.links.getLinkByKey("self");

    if (selflink === null) {
      return new Href("#");
    }

    return selflink.href;
  }

  /**
   * Getting panel links
   */
  get panelLinks(): LinkCollection {
    return this.links.getLinksByGroup("panel");
  }

  /**
   * Check if list item has panel links
   */
  hasPanelLinks() {
    return this.panelLinks.length > -1;
  }

  /**
   * Retrieve all actions by type
   */
  getActionsByType(actionType: string) {
    return this.actionCollection.getActionsByType(actionType);
  }
}
