// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";

import RangeFilterModel from "beinformed/models/filters/RangeFilterModel";
import AssignmentFilterModel from "beinformed/models/filters/AssignmentFilterModel";
import FilterModel from "beinformed/models/filters/FilterModel";
import ConceptIndexFilter from "beinformed/models/filters/ConceptIndexFilter";

/**
 * Contains a collection of filters
 */
export default class FilterCollection extends BaseCollection<
  RangeFilterModel | AssignmentFilterModel | FilterModel
> {
  /**
   * Construct a collection of filters
   */
  constructor(
    data: FilterCollectionJSON,
    contributions: FilterCollectionContributionsJSON
  ) {
    super();

    if (data && contributions && Array.isArray(contributions.filter)) {
      this.collection = contributions.filter
        .filter(filterContribution => Object.keys(filterContribution)[0])
        .map(filterContribution => {
          const filterKey = Object.keys(filterContribution)[0];
          const filterData = data[filterKey];
          const filterContributionByKey = filterContribution[filterKey];

          const filter = this.createFilter(
            filterKey,
            {
              ...filterData,
              dynamicschema: contributions.dynamicschema
            },
            filterContributionByKey
          );

          if (contributions.listkey) {
            filter.listkey = contributions.listkey;
          }

          if (contributions.contexts && filterContributionByKey.contextid) {
            const filterContext = contributions.contexts.find(
              context => context.id === filterContributionByKey.contextid
            );
            if (filterContext) {
              filter.context = filterContext;
            }
          }

          return filter;
        });
    }
  }

  createFilter(
    filterKey: string,
    data: FilterJSON,
    contributions: FilterContributionsJSON
  ) {
    const type = contributions.type || "stringfilter";

    if (type === "choicefilter" && filterKey === "index") {
      return new ConceptIndexFilter(data, contributions);
    }

    if (type.includes("rangefilter")) {
      return new RangeFilterModel(data, contributions);
    }

    if (type === "assignmentfilter") {
      return new AssignmentFilterModel(data, contributions);
    }

    return new FilterModel(data, contributions);
  }

  /**
   * Call the reset function on all filters
   * @see {Filter#reset()}
   */
  reset() {
    this.collection = this.collection.map(filter => filter.reset());

    return this;
  }

  /**
   * Checks if range attribute key equals key
   */
  checkRangeFilterByAttributeKey(filter: RangeFilterModel, key: string) {
    return (
      filter.attribute.key === key ||
      (filter.attribute.start && filter.attribute.start.key === key) ||
      (filter.attribute.end && filter.attribute.end.key === key)
    );
  }

  /**
   * Check if assignment filter attribute matches key
   */
  checkAssignmentFilterByAttributeKey(
    filter: AssignmentFilterModel,
    key: string
  ) {
    return (
      filter.key === key ||
      filter.user.key === key ||
      filter.assignmenttype.key === key
    );
  }

  /**
   * Getting the filter by name
   */
  getFilterByAttributeKey(key: string) {
    return (
      this.find(filter => {
        if (filter.type.includes("range")) {
          return this.checkRangeFilterByAttributeKey(filter, key);
        } else if (filter.type === "assignment") {
          return this.checkAssignmentFilterByAttributeKey(filter, key);
        }

        return filter.attribute.key === key;
      }) || null
    );
  }

  /**
   * Update Filter by input name and value
   */
  update(attribute: AttributeType, value: string) {
    const filterToUpdate = this.getFilterByAttributeKey(attribute.key);

    if (!filterToUpdate) {
      throw new Error(`Can not find filter by attribute key: ${attribute.key}`);
    }

    filterToUpdate.update(attribute, value);
  }

  /**
   * Retrieve if all filters are valid
   */
  get isValid(): boolean {
    return this.collection.every(filter => filter.attribute.isValid);
  }

  /**
   * Indicates if an active filter is present in the collection
   */
  hasActiveFilters() {
    return typeof this.all.find(filter => filter.isActive()) !== "undefined";
  }
}
