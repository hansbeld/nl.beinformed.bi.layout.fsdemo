// @flow
import ResourceModel from "beinformed/models/base/ResourceModel";
import BaseCollection from "beinformed/models/base/BaseCollection";
import FilterCollection from "beinformed/models/filters/FilterCollection";
import ContentLinkModel from "beinformed/models/content/ContentLinkModel";
import Href from "beinformed/models/href/Href";

import type ModularUIResponse from "beinformed/modularui/ModularUIResponse";
import type FilterModel from "beinformed/models/filters/FilterModel";

/**
 * Get Index of concepts, to filter model catalog
 */
export default class ContentIndexModel extends ResourceModel<
  ContentSearchJSON,
  ContentSearchContributionsJSON
> {
  _filterCollection: FilterCollection<ContentSearchFilterJSON>;
  _content: BaseCollection<ContentLinkModel>;

  /**
   * @override
   */
  constructor(
    modularuiResponse: ModularUIResponse<
      ContentSearchJSON,
      ContentSearchContributionsJSON
    >
  ) {
    super(modularuiResponse);

    this._filterCollection = new FilterCollection(this.data.filter, {
      filter: this.contributions.filter,
      dynamicschema: this.data.dynamicschema
    });

    this._content = new BaseCollection();
    this._content.collection = this.data._embedded
      ? this.data._embedded.results.map(
          content => new ContentLinkModel(content.content)
        )
      : [];
  }

  /**
   * @overwrite
   */
  get type(): "ContentIndex" {
    return "ContentIndex";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "ContentSearch"
    );
  }

  /**
   * Getting the self link of this list
   */
  get selfhref(): Href {
    const href = new Href(this.selflink.href);

    this.filterCollection.all.forEach(filter => {
      filter.params.forEach(param => {
        if (param.value) {
          href.setParameter(param.name, param.value);
        } else {
          href.removeParameter(param.name);
        }
      });
    });

    return href;
  }

  /**
   * Retrieve filters of conceptindex model
   */
  get filterCollection(): FilterCollection<ContentSearchFilterJSON> {
    return this._filterCollection;
  }

  /**
   * Get index filter
   */
  get indexfilter(): FilterModel | null {
    return this._filterCollection.getFilterByAttributeKey("index");
  }

  /**
   * Retrieve content collection
   */
  get items(): BaseCollection<ContentLinkModel> {
    return this._content;
  }

  hasIndexFilter() {
    return (
      this.indexfilter && this.indexfilter.attribute.options.all.length > 0
    );
  }

  hasNoFiltersSet() {
    return (
      this.items.isEmpty &&
      this.filterCollection.all.filter(
        filter => filter.attribute.inputvalue !== ""
      ).length === 0
    );
  }

  getFirstCharHref() {
    const firstChar =
      this.indexfilter && this.indexfilter.attribute
        ? this.indexfilter.attribute.options.all.filter(
            option => option.code !== "0"
          )[0].code
        : "#";

    return new Href(this.selfhref.path).addParameter("index", firstChar);
  }
}
