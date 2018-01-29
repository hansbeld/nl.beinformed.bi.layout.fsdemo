// @flow
import type Href from "beinformed/models/href/Href";

/**
 * Context Item
 */
export default class ContextItemModel {
  _key: string;
  _listHref: Href;
  _detailHref: Href | null;
  _label: string;

  /**
   * constructor
   */
  constructor(
    key: string,
    listHref: Href,
    detailHref: Href | null,
    label: string
  ) {
    this._key = key;
    this._listHref = listHref;
    this._detailHref = detailHref;
    this._label = label;
  }

  /**
   * Retrieve key
   */
  get key(): string {
    return this._key;
  }

  /**
   * Retrieve label
   */
  get label(): string {
    return this._label;
  }

  /**
   * Retrieve href
   */
  get href(): Href {
    return this._listHref;
  }

  /**
   * Retrieve detail Href from context item
   */
  get detailHref(): Href | null {
    return this._detailHref;
  }
}
