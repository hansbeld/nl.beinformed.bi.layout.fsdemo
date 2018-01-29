// @flow
import PagesizeModel from "beinformed/models/paging/PagesizeModel";

/**
 * Defines a paging object
 */
export default class PagingModel {
  _paging: PagingJSON;
  _contributions: PagingContributionsJSON;
  _pagesize: PagesizeModel;

  /**
   * constructor
   */
  constructor(
    paging: PagingJSON,
    pagingContributions: PagingContributionsJSON
  ) {
    this._contributions = pagingContributions;
    this._paging = paging;

    this._pagesize = new PagesizeModel(
      this.paging.pagesize,
      this.contributions.pagesize
    );
  }

  /**
   * Getting contributions
   */
  get contributions(): PagingContributionsJSON {
    return this._contributions || {};
  }

  /**
   * Getting paging information
   */
  get paging(): PagingJSON {
    return this._paging || {};
  }

  /**
   * Get the paging parameter name
   */
  get name(): string {
    return "page";
  }

  /**
   * Get current page
   */
  get page(): number {
    return this.paging.page;
  }

  /**
   * Getting paging value
   */
  get value(): number {
    return this.page;
  }

  /**
   * Get maximum pages
   */
  get maxpages(): number {
    return this.paging.maxpages;
  }

  /**
   * Set current page
   */
  set page(page: number) {
    this.paging.page = page;
  }

  /**
   * Get the total number of results
   */
  get totalResults(): number {
    return this.paging.totalresults || 0;
  }

  /**
   * Getting pagesize
   */
  get pagesize(): PagesizeModel {
    return this._pagesize;
  }
}
