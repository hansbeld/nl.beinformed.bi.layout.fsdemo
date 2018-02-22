// @flow
import type FilterModel from "beinformed/models/filters/FilterModel";
import ResourceModel from "beinformed/models/base/ResourceModel";
import BaseCollection from "beinformed/models/base/BaseCollection";
import FilterCollection from "beinformed/models/filters/FilterCollection";
import ConceptLinkModel from "beinformed/models/concepts/ConceptLinkModel";
import Href from "beinformed/models/href/Href";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

import type ModularUIResponse from "beinformed/modularui/ModularUIResponse";

/**
 * Get Index of concepts, to filter model catalog
 */
export default class ConceptIndexModel extends ResourceModel {
  _filterCollection: FilterCollection;
  _concepts: BaseCollection<ConceptLinkModel>;

  /**
   * @override
   */
  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this._filterCollection = new FilterCollection(this.data.filter, {
      filter: this.contributions.filter,
      contexts: this.contributions.contexts,
      dynamicschema: this.data.dynamicschema
    });

    this._concepts = new BaseCollection();
    this._concepts.collection = this.data._embedded
      ? this.data._embedded.results.map(
          concept => new ConceptLinkModel(concept.concept, this.entryDate)
        )
      : [];
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "ConceptIndex";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "ConceptSearch"
    );
  }

  /**
   * Getting the self link of this list
   */
  get selfhref(): Href {
    const href = this.selflink.href;

    if (this.filterCollection.hasItems) {
      this.filterCollection.all.forEach(filter => {
        filter.params.forEach(param => {
          if (param.value) {
            href.setParameter(param.name, param.value);
          } else {
            href.removeParameter(param.name);
          }
        });
      });
    }

    return href;
  }

  /**
   * Retrieve filters of conceptindex model
   */
  get filterCollection(): FilterCollection {
    return this._filterCollection;
  }

  /**
   * Get index filter
   */
  get indexfilter(): FilterModel | null {
    return this.filterCollection.getFilterByAttributeKey("index");
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

  /**
   * get searchterm filter
   */
  get searchtermfilter(): FilterModel | null {
    return this.filterCollection.getFilterByAttributeKey("label");
  }

  /**
   * Get concept links found by index filter
   */
  get items(): BaseCollection<ConceptLinkModel> {
    return this._concepts;
  }

  /**
   * Replace the items collection
   */
  set items(itemCollection: BaseCollection<ConceptLinkModel>) {
    this._concepts = itemCollection;
  }

  hasIndexFilter() {
    return (
      this.indexfilter && this.indexfilter.attribute.options.all.length > 0
    );
  }

  hasNoFiltersSet() {
    return this.items.isEmpty;
  }

  getFirstCharHref() {
    const firstChar =
      this.indexfilter && this.indexfilter.attribute
        ? this.indexfilter.attribute.options.all.filter(
            option => option.code !== "0"
          )[0].code
        : "#";

    return new Href(this.selfhref.path)
      .addParameter("index", firstChar)
      .addParameter(TIMEVERSION_FILTER_NAME, this.entryDate);
  }
}
