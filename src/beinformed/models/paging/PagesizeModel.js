// @flow

/**
 * Defines a page size object
 */
export default class PagesizeModel {
  _pagesize: number;
  _options: number[];

  /**
   * Construct the page size
   */
  constructor(
    pagesize: number,
    pagesizeContributions: { options: Array<number> }
  ) {
    this._pagesize = pagesize;

    this._options = pagesizeContributions ? pagesizeContributions.options : [];
  }

  /**
   * Getting the name
   */
  get name(): string {
    return "pagesize";
  }

  /**
   * Geting the value
   */
  get value(): number {
    return this._pagesize;
  }

  /**
   * Setting the page size
   */
  set value(pagesize: number) {
    this._pagesize = pagesize;
  }

  /**
   * Getting available pagesize options
   */
  get options(): number[] {
    return this._options;
  }
}
