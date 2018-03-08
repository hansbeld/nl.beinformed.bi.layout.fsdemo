// @flow
import { get } from "lodash";

import ResourceModel from "beinformed/models/base/ResourceModel";
import FilterCollection from "beinformed/models/filters/FilterCollection";
import ContentLinkModel from "beinformed/models/content/ContentLinkModel";
import ContentTypeModel from "beinformed/models/content/ContentTypeModel";

import Href from "beinformed/models/href/Href";

import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

import type LinkModel from "beinformed/models/links/LinkModel";

type FilterCollectionData = {
  entryDate: EntryDateFilterJSON
};

/**
 * Get content items recursively
 */
const getItems = (items: ContentItems, entryDate: string | null) =>
  items.map((item: ContentItem) => {
    const link = new ContentLinkModel(
      {
        ...item,
        section: item._id
      },
      entryDate
    );

    if (item.items) {
      link.items = getItems(item.items, entryDate);
    }

    return link;
  });

/**
 * Get categories
 */
const getCategories = categories =>
  categories.map(category => new ContentLinkModel(category));

/**
 * Content detail model
 */
export default class ContentTOCModel extends ResourceModel<
  ContentTOCJSON,
  ContentTOCContributionsJSON
> {
  _contentType: ContentTypeModel;
  _filterCollection: FilterCollection<FilterCollectionData>;

  /**
   * @overwrite
   */
  get type(): string {
    return "ContentTOC";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "ContentTOC"
    );
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    const contentTypeLink = this.links.getLinkByKey("contenttype");

    if (contentTypeLink) {
      return [contentTypeLink];
    }

    return [];
  }

  /**
   * @override
   */
  setChildModels() {
    const contentTypeModel = this.childModels.find(
      model => model.type === "ContentType"
    );

    if (contentTypeModel) {
      this._contentType = contentTypeModel;
    }
  }

  /**
   * Get content label
   */
  get label(): string {
    return get(this.data, "label", "");
  }

  /**
   * Getting the self link of this list
   */
  get selfhref(): Href {
    const href = new Href(this.selflink.href);

    this.filterCollection.all.forEach(filter => {
      filter.params.forEach(param => {
        if (param.value) {
          href.setParameter(param.name, param.value, false);
        } else {
          href.removeParameter(param.name, false);
        }
      });
    });

    return href;
  }

  /**
   * Get sub items of toc
   */
  get items(): ContentLinkModel[] {
    return this.data.items ? getItems(this.data.items, this.entryDate) : [];
  }

  /**
   * get categories of content
   */
  get categories(): ContentLinkModel[] {
    return this.data.categories ? getCategories(this.data.categories) : [];
  }

  /**
   * Retrieve content type model
   * @return {ContentTypeModel}
   */
  get contentType(): ContentTypeModel {
    return this._contentType;
  }

  /**
   * Retrieve available filters on concept toc
   */
  get filterCollection(): FilterCollection<FilterCollectionData> {
    if (!this._filterCollection) {
      const filterData: Object = {
        entryDate: this.data.filter.datefilter
      };

      if (this.data.filter.stringfilter) {
        filterData.searchTerm = this.data.filter.stringfilter;
      }

      this._filterCollection = new FilterCollection(filterData, {
        filter: this.contributions.filter
      });
    }

    return this._filterCollection;
  }

  /**
   * Retrieve entrydate of content toc
   */
  get entryDate(): string | null {
    const timeversionFilter = this.filterCollection.getFilterByAttributeKey(
      TIMEVERSION_FILTER_NAME
    );
    if (timeversionFilter) {
      return timeversionFilter.attribute.value;
    }

    return null;
  }
}
