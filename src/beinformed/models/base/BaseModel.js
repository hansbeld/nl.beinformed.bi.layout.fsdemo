// @flow
import clone from "clone";

import LayoutHintCollection from "beinformed/models/layouthint/LayoutHintCollection";

/**
 * Base model
 */
class BaseModel {
  _data: any;
  _contributions: any;
  _layouthint: LayoutHintCollection;
  _connectKey: string;

  /**
   * constructor
   */
  constructor(data: any, contributions: any) {
    this._data = data;
    this._contributions = contributions;
    this._layouthint = new LayoutHintCollection(this.contributions.layouthint);
  }

  /**
   * Retrieve data
   */
  get data(): any {
    return this._data || {};
  }

  /**
   * Retrieve contributions
   */
  get contributions(): any {
    return this._contributions || {};
  }

  /**
   * Getting the layout-hint
   */
  get layouthint(): LayoutHintCollection {
    return this._layouthint;
  }

  /**
   * Set the layout-hint
   */
  set layouthint(layouthint: Array<string>) {
    this._layouthint = new LayoutHintCollection(layouthint);
  }

  /**
   * Indicates if the model has data
   */
  get hasData(): boolean {
    return Object.keys(this.data).length > 0;
  }

  set connectKey(key: string) {
    this._connectKey = key;
  }

  get connectKey(): string | null {
    return this._connectKey;
  }

  dehydrate() {
    return {
      data: this._data,
      contributions: this._contributions,
      connectKey: this._connectKey
    };
  }

  rehydrate(data: Object) {
    this._connectKey = data.connectKey;
  }

  /**
   * Returns a clone of the model (this is not a deep copy)
   */
  clone(deepcopy: ?boolean = false): any {
    if (deepcopy) {
      return clone(this);
    }

    const originalPrototype = Object.getPrototypeOf(this);
    return Object.assign(Object.create(originalPrototype), this);
  }
}

export default BaseModel;
