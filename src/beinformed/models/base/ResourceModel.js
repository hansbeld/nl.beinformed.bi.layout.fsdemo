// @flow
import type LinkModel from "beinformed/models/links/LinkModel";
import type Href from "beinformed/models/href/Href";

import ModularUIResponse from "beinformed/utils/modularui/ModularUIResponse";

import BaseModel from "beinformed/models/base/BaseModel";
import LinkCollection from "beinformed/models/links/LinkCollection";

/**
 * Base model
 */
class ResourceModel extends BaseModel {
  _key: string;
  _links: LinkCollection;
  _childModels: ResolvableModels[];
  _locale: string;

  /**
   * constructor
   */
  constructor(modularuiResponse: ModularUIResponse = new ModularUIResponse()) {
    super(modularuiResponse.data, modularuiResponse.contributions);

    this._key = modularuiResponse.key;

    this._childModels = this.data.childModels || [];
    this._locale = modularuiResponse.locale;
  }

  /**
   * Returns true when the model is supported based on configuration found in contributions
   * @abstract
   */

  static isApplicableModel(
    data: ModularUIResponse // eslint-disable-line no-unused-vars
  ): boolean {
    throw new Error(
      "No isSupportedResourceTypes condition set on resourcemodel"
    );
  }

  get locale(): string {
    return this._locale;
  }

  /**
   * Retrieve key
   */
  get key(): string {
    return this._key;
  }

  /**
   * Get type of model
   * @abstract
   */
  get type(): string {
    throw new Error(`No type set on the resource model with key ${this.key}`);
  }

  /**
   * Retrieve type of resource
   */
  get resourcetype(): string {
    return this.contributions.resourcetype;
  }

  /**
   * Getting the links of the resource
   */
  get links(): LinkCollection {
    if (!this._links) {
      this._links = new LinkCollection(
        Array.isArray(this.data._links)
          ? this.data._links[0]
          : this.data._links,
        {
          self: {
            resourcetype: this.resourcetype
          },
          ...this.contributions._links
        }
      );
    }
    return this._links;
  }

  /**
   * Get self link of model
   */
  get selflink(): LinkModel {
    const selflink = this.links.getLinkByKey("self");

    if (selflink === null) {
      throw new Error(
        `Could not find self link for ${
          this.key === null ? "unknown" : this.key
        }`
      );
    }

    return selflink;
  }

  /**
   * Return default self link of resource
   */
  get selfhref(): Href {
    return this.selflink.href;
  }

  /**
   * Add links to expand on initialization of this model
   * @abstract
   */
  getInitialChildModelLinks(): LinkModel[] {
    return [];
  }

  /**
   * Retrieve links of expanded child models
   */
  get childModels(): ResolvableModels[] {
    return this._childModels;
  }

  /**
   * Add child models to this model
   */
  addChildModels(models: ResolvableModels[]) {
    const flattenModels = [].concat(...models);

    this._childModels = flattenModels;

    this.setChildModels(flattenModels);

    return this;
  }

  /**
   * Template to set expanded child models
   * Use this hook to separate the retrieved child models into the correct models.
   *
   * @abstract
   * @example <caption>Put all models of instance List and GroupingPanel into the panels property</caption>
   */
  setChildModels(models: ResolvableModels[]) {} // eslint-disable-line no-unused-vars, no-empty-function
}

export default ResourceModel;
