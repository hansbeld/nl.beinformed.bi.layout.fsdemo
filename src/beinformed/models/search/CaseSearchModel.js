// @flow
import ListModel from "beinformed/models/list/ListModel";

/**
 * Case search model
 */
export default class CaseSearchModel extends ListModel {
  /**
   * @overwrite
   */
  get type(): string {
    return "CaseSearch";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "CaseSearch"
    );
  }

  /**
   * Retrieve quick search filters
   */
  getQuickSearchFilters() {
    return this.filterCollection
      ? this.filterCollection.all.filter(filter => filter.isQuickSearch())
      : [];
  }

  hasQuickSearchFilters() {
    return this.getQuickSearchFilters().length > 0;
  }
}
