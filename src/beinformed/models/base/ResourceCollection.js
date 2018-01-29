// @flow
import type LinkModel from "beinformed/models/links/LinkModel";
import BaseCollection from "beinformed/models/base/BaseCollection";

/**
 * The ResourceCollection makes it possible to add child models to a collection of models
 * These child models are fetched using the ModularUI util
 */
class ResourceCollection<T> extends BaseCollection<T> {
  /**
   * Retrieve all child model links and flatten it into an array with single entries, removing all undefined items
   */
  getInitialChildModelLinks(): LinkModel[] {
    const initialChildModelLinks = [];

    this.collection.forEach(item => {
      if (item && typeof item.getInitialChildModelLinks === "function") {
        initialChildModelLinks.push(...item.getInitialChildModelLinks());
      }
    });

    return initialChildModelLinks;
  }

  /**
   * Pass through models for setchildmodels to items of this collection
   */
  setChildModels(models: Array<ResolvableModels>) {
    this.collection.forEach(item => {
      if (item && typeof item.setChildModels === "function") {
        item.setChildModels(models);
      }
    });
  }
}

export default ResourceCollection;
