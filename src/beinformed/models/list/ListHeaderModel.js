// @flow
import LayoutHintCollection from "beinformed/models/layouthint/LayoutHintCollection";

/**
 * One header item of the list
 */
export default class ListHeaderModel {
  _key: string;
  _header: AttributeContributionsJSON;

  /**
   * constructor
   */
  constructor(header: { [string]: AttributeContributionsJSON }) {
    const headerKey = Object.keys(header)[0];

    this._key = headerKey;
    this._header = header[headerKey];
  }

  /**
   * Get key
   */
  get key(): string {
    return this._key;
  }

  /**
   * Getting the label of this header item
   */
  get label(): string {
    return this._header.label;
  }

  /**
   * Getting the type of this header item. For instance string, date, etc.
   */
  get type(): string {
    return this._header.type;
  }

  /**
   * Getting the layout hints of this header item
   */
  get layouthint(): LayoutHintCollection {
    return new LayoutHintCollection(this._header.layouthint || []);
  }

  /**
   * Get alignment of header label
   */
  get alignment(): string {
    const alignment = this.layouthint.getByLayoutHint("align-");

    return alignment === null ? "left" : alignment.substring("align-".length);
  }

  equals(listHeader: ListHeaderModel): boolean {
    return listHeader.key === this.key;
  }
}
