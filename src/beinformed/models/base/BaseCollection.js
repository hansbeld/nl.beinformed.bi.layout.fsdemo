// @flow

/**
 * Base class for collections of models
 */
class BaseCollection<T> {
  _collection: Array<T>;

  /**
   * Construct base collection
   */
  constructor(initCollection: Array<T> = []) {
    this._collection = initCollection;
  }

  /**
   * Add an other collection, array of items or single item to this collection;
   */
  add(items: BaseCollection<T> | Array<T> | T) {
    if (items instanceof BaseCollection) {
      this._collection = [...this._collection, ...items.all];
    } else if (Array.isArray(items)) {
      this._collection = [...this._collection, ...items];
    } else {
      this._collection = [...this._collection, items];
    }

    return this;
  }

  /**
   * Remove an item from the collection by it's index.
   */
  remove(itemIndex: number) {
    if (itemIndex > -1) {
      this._collection = [
        ...this._collection.slice(0, itemIndex),
        ...this._collection.slice(itemIndex + 1)
      ];
    }
  }

  /**
   * Replace current collection with a new collection
   */
  set collection(collection: Array<T>) {
    this._collection = collection;
  }

  /**
   * Retrieve current collection
   */
  get collection(): Array<T> {
    return this._collection;
  }

  /**
   * Indicates if the collection has items
   */
  get hasItems(): boolean {
    return this.all.length > 0;
  }

  /**
   * Indicates if collection is empty
   */
  get isEmpty(): boolean {
    return !this.hasItems;
  }

  /**
   * Retrieve all items in collection
   */
  get all(): Array<T> {
    return this._collection;
  }

  /**
   * Get the size of this collection
   */
  get size(): number {
    return this.length;
  }

  /**
   * Get the size of this collection
   */
  get length(): number {
    return this._collection.length;
  }

  /**
   * Return first link in collection
   */
  get first(): T | null {
    return this._collection.length > 0 ? this._collection[0] : null;
  }

  get last(): T | null {
    return this._collection[this._collection.length - 1];
  }

  /**
   * Find item
   */
  find(...args: any): T | null {
    return this._collection.find(...args) || null;
  }

  /**
   * Filter items
   */
  filter(...args: any): Array<T> {
    return this._collection.filter(...args);
  }

  /**
   * Retrieve an alphabetically sorted array of items
   */
  get sorted(): Array<T> {
    return this._collection.sort();
  }
}

export default BaseCollection;
