// @flow
import type AttributeModel from "beinformed/models/attributes/AttributeModel";

import AttributeCollection from "beinformed/models/attributes/AttributeCollection";
import BaseModel from "beinformed/models/base/BaseModel";
import Href from "beinformed/models/href/Href";
import {
  ALWAYS_COMMIT_FORM,
  HTTP_METHODS
} from "beinformed/constants/Constants";

type HttpMethods = $Keys<typeof HTTP_METHODS>;

/**
 * Defines an Action. For instance an action on the tab 'books', which leads to a form
 */
export default class ActionModel extends BaseModel {
  _fieldCollection: AttributeCollection;
  _icon: string;
  _href: Href;
  _redirectAction: ?Object | ?Href;

  /**
   * Create an ActionModel
   */
  constructor(action: ActionJSON, contributions?: ActionContributionsJSON) {
    super(action, contributions);

    this._fieldCollection = new AttributeCollection(
      this.data.fields,
      this.contributions.fields
    );
  }

  static createFromHref(name: string, href: string, label?: string) {
    return new ActionModel(
      {
        name,
        href
      },
      {
        name,
        label: label || name,
        type: "form"
      }
    );
  }

  /**
   * retrieve href of action
   */
  get selfhref(): Href {
    return (
      this._href || new Href(`${this.data.href}?${this.querystring}`, "Form")
    );
  }

  set selfhref(href: Href) {
    this._href = href;
  }

  /**
   * retrieve request method
   */
  get method(): HttpMethods {
    return this.data.method || HTTP_METHODS.POST;
  }

  /**
   * Retrieve type of method
   */
  get type(): string {
    return this.contributions.type || "general";
  }

  /**
   * Retrieve name of action
   */
  get name(): string {
    return this.data.name || "unknown";
  }

  /**
   * retrieve the collection of field attributes as an array
   */
  get fields(): AttributeModel[] {
    return this._fieldCollection.all;
  }

  /**
   * Retrieve the field collection
   */
  get fieldCollection(): AttributeCollection {
    return this._fieldCollection;
  }

  set fieldCollection(fieldCollection: AttributeCollection) {
    this._fieldCollection = fieldCollection;
  }

  /**
   * Retrieve querystring of action
   */
  get querystring(): string {
    const fieldParameters = this.fields
      .filter(attribute => attribute.value && attribute.value !== "")
      .map(attribute => {
        const value = attribute.value;
        if (value !== null) {
          return `${attribute.name}=${value}`;
        }
        return attribute.name;
      })
      .join("&");

    if (ALWAYS_COMMIT_FORM) {
      return fieldParameters;
    }

    return `commit=false&${fieldParameters}`;
  }

  /**
   * Retrieve a field by it's key
   */
  getFieldByKey(key: string) {
    return this._fieldCollection.getAttributeByKey(key);
  }

  /**
   * Indicates if field exists by the given key
   */
  hasFieldByKey(key: string) {
    return this.getFieldByKey(key) !== null;
  }

  /**
   * Getting the key/name of this action
   */
  get key(): string {
    return this.data.name || this.data.key;
  }

  /**
   * Getting the label of the action
   */
  get label(): string {
    return this.contributions.label || this.key;
  }

  /**
   * Setter for icon of ActionModel
   */
  set icon(icon: any) {
    this._icon = icon;
  }

  /**
   * Retrieve icon of task
   */
  get icon(): any {
    return this._icon;
  }

  set redirectAction(modularuiAction: Object | Href) {
    this._redirectAction = modularuiAction;
  }

  get redirectAction(): ?Object {
    return this._redirectAction;
  }
}
