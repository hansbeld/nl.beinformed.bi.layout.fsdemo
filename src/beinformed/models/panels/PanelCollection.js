// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";
import Href from "beinformed/models/href/Href";

/**
 * A object containing all panels of one detail
 */
export default class PanelCollection extends BaseCollection<PanelType> {
  _activeHref: Href;

  /**
   * Constructs this collection
   */
  constructor(panels: PanelType[] = []) {
    super();

    this.collection = panels;
  }

  /**
   * Getting the panels of a case
   */
  get panels(): PanelType[] {
    return this.collection;
  }

  /**
   * Replace an existing panel with a new panel
   */
  replace(oldPanel: PanelType | Href, newPanel: PanelType) {
    const oldPanelHref =
      oldPanel instanceof Href ? oldPanel : oldPanel.selfhref;

    this.collection = this.panels.map(panel => {
      const href = panel.selfhref;

      if (href.equals(oldPanelHref)) {
        return newPanel;
      }

      return panel;
    });
  }

  update(panel: PanelType) {
    this.replace(panel.selfhref, panel);
  }

  /**
   * Getting the panel by href
   */
  getPanelByHref(href: Href, traverseChilds: boolean = true) {
    const panel = this.find(childPanel => childPanel.selfhref.equals(href));

    if (!panel && traverseChilds) {
      return this.find(childPanel => {
        const panels =
          childPanel.panelCollection ||
          (childPanel.detail && childPanel.detail.panelCollection);

        return panels ? panels.getPanelByHref(href) : false;
      });
    }

    return panel || null;
  }

  /**
   * Check if panel with key exists
   */
  hasPanelByHref(href: Href, traverseChilds: boolean = true) {
    return this.getPanelByHref(href, traverseChilds) !== null;
  }

  /**
   * Set current active Href
   */
  set activeHref(href: Href) {
    this._activeHref = href;
  }

  /**
   * Get active href
   */
  get activeHref(): Href | null {
    if (this._activeHref) {
      return this._activeHref;
    } else if (this.first) {
      return this.first.selfhref;
    }
    return null;
  }

  /**
   * Get active panel
   */
  get activePanel(): PanelType | null {
    if (this.hasItems && this.activeHref) {
      return this.getPanelByHref(this.activeHref);
    }

    return null;
  }
}
