// @flow
import type Href from "beinformed/models/href/Href";
import ContextItemModel from "beinformed/models/context/ContextItemModel";

/**
 * Context List
 */
export default class ContextModel {
  _self: ContextItemModel;
  _root: ContextItemModel;
  _context: ContextItemModel[];

  /**
   * constructor
   */
  constructor(key: string, listhref: Href, label: string) {
    this._self = new ContextItemModel(key, listhref, null, label);
    this._root = this._self;
    this._context = [];
  }

  /**
   * Getting context
   */
  get context(): ContextItemModel[] {
    return this._context;
  }

  /**
   * Getting context + self
   */
  get all(): ContextItemModel[] {
    return [...this._context, this._self];
  }

  /**
   * Getting root of context tree
   */
  get root(): ContextItemModel {
    return this._root;
  }

  /**
   * Sets the context property to the input context, which is a combination of _context and _self.
   * Also puts the root to the input context root.
   */
  set context(context: ContextModel | ContextItemModel[]) {
    if (context instanceof ContextModel) {
      this._context = context.context;
      this._root = context.root;
    } else {
      this._context = context;
    }
  }

  /**
   * Set parent list as context of this list
   */
  set parent(context: ContextModel) {
    if (context instanceof ContextModel) {
      this._context = context.all;
      this._root = context.root;
    }
  }

  /**
   * Set self context item
   */
  addItem(key: string, listHref: Href, detailHref: Href, label: string) {
    if (this._self.href.equals(this._root.href)) {
      this._root = new ContextItemModel(key, listHref, detailHref, label);
    }
    this._self = new ContextItemModel(key, listHref, detailHref, label);
  }

  /**
   * Set root
   */
  set root(root: ContextItemModel) {
    this._root = root;
  }

  /**
   * Get size of context
   */
  get size(): number {
    return this.context.length;
  }

  /**
   * Get context item by index
   * @param  {integer} idx - Context item index, zero based
   */
  get(idx: number): ContextItemModel {
    return this.context[idx];
  }

  /**
   * Get the context of a Href
   */
  getContextOfHref(href: Href): ContextModel {
    if (this._self.href.equals(href)) {
      return this;
    }

    const idx = this.context.findIndex(element => element.href.equals(href));

    if (idx > -1) {
      this._self = this.get(idx);
      this._context = this.context.slice(0, idx);
    } else {
      throw new Error(`Context of ${JSON.stringify(href)} not found`);
    }

    return this;
  }

  /**
   * Check if this context model has the given href in it's collection
   */
  hasContextOfHref(href: Href) {
    if (this._self.href.equals(href)) {
      return this;
    }

    const idx = this.context.findIndex(element => element.href.equals(href));

    return idx > -1;
  }

  /**
   * Check if context is empty
   */
  hasContext() {
    return this._context.length > 0;
  }
}
