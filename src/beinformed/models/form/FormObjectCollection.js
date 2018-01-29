// @flow
import ResourceCollection from "beinformed/models/base/ResourceCollection";
import FormObjectModel from "beinformed/models/form/FormObjectModel";
import ErrorCollection from "beinformed/models/error/ErrorCollection";

/**
 * Form Objects
 */
export default class FormObjectCollection extends ResourceCollection<
  FormObjectModel
> {
  _errorCollection: ErrorCollection;

  /**
   * constructor
   */
  constructor(
    formObjectData?: Array<FormAnchorJSON> = [],
    formObjectContributions?: { [string]: FormObjectContributionsJSON }
  ) {
    super([]);

    if (formObjectContributions && Array.isArray(formObjectData)) {
      this.collection = this.createCollection(
        formObjectData,
        formObjectContributions
      );
    }

    this._errorCollection = new ErrorCollection("formobjects");
  }

  createCollection(
    formObjectData: Array<FormAnchorJSON>,
    formObjectContributions: { [string]: FormObjectContributionsJSON }
  ) {
    return formObjectData.map(
      formObject =>
        new FormObjectModel(
          formObject,
          formObjectContributions[formObject.objectid]
        )
    );
  }

  /**
   * Get object by key
   */
  get(key: string) {
    return this.collection.find(object => object.key === key);
  }

  /**
   * Check if object with key exists
   */
  has(key: string) {
    return typeof this.get(key) !== "undefined";
  }

  /**
   * Get object by object model
   */
  getObject(obj: FormObjectModel) {
    if (obj instanceof FormObjectModel) {
      return this.get(obj.key);
    }

    throw new Error(
      `Object not an instance of FormObjectModel, can not find ${obj}`
    );
  }

  /**
   * Reset all error messages on form objects
   */
  resetErrors() {
    this._errorCollection = new ErrorCollection("formobjects");
    this.all.forEach(object => object.resetErrors());
  }

  hasServerErrors(): boolean {
    return (
      this.errorCollection.hasItems ||
      typeof this.collection.find(item => item.hasServerErrors()) !==
        "undefined"
    );
  }

  /**
   * Get list of errormessages
   */
  get errorCollection(): ErrorCollection {
    return this._errorCollection;
  }

  /**
   * Get a form attribute count in this collection
   */
  get attributeCount(): number {
    return this.all.reduce(
      (prev, curr) => prev + curr.attributeCollection.size,
      0
    );
  }

  /**
   * Check if one ore more objects are repeatable
   */
  get hasRepeatableObject(): boolean {
    return this.all.some(obj => obj.isRepeatable);
  }

  get hasEndResultConfiguration(): boolean {
    return this.all.some(obj => obj.hasEndResultConfiguration);
  }
}
