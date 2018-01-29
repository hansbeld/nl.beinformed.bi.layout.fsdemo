// @flow
import deepmerge from "deepmerge";

import type LinkModel from "beinformed/models/links/LinkModel";
import type ActionModel from "beinformed/models/actions/ActionModel";
import type ErrorResponse from "beinformed/models/error/ErrorResponse";
import type FormObjectModel from "beinformed/models/form/FormObjectModel";
import type ModularUIResponse from "beinformed/utils/modularui/ModularUIResponse";

import Parameter from "beinformed/models/href/Parameter";
import FormObjectCollection from "beinformed/models/form/FormObjectCollection";

import ErrorCollection from "beinformed/models/error/ErrorCollection";
import Href from "beinformed/models/href/Href";
import ResourceModel from "beinformed/models/base/ResourceModel";

import {
  HTTP_METHODS,
  ALWAYS_COMMIT_FORM
} from "beinformed/constants/Constants";

import type { Location } from "react-router-dom";

/**
 * Model for Forms
 */
class FormModel extends ResourceModel {
  lastModification: number;
  _nextObjects: FormObjectCollection[];
  _missingObjects: FormObjectCollection;
  _endResultObjects: FormObjectCollection;
  _completeObjects: FormObjectCollection[];
  _errorCollection: ErrorCollection;
  _tokens: string[];
  _type: string;
  _parameters: Parameter[];
  _commit: boolean;
  _autoSubmit: boolean;
  _isFinished: boolean;
  _isComplete: boolean;
  _successAction: ActionModel | null;
  _redirectLocation: Location | null;

  /**
   * Construct a form
   */
  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this.lastModification = Date.now();

    this._missingObjects = this.createMissingCollection(
      this.data,
      this.contributions
    );
    this._endResultObjects = this.createEndResultCollection(
      this.data,
      this.contributions
    );

    this._nextObjects = [];
    this._completeObjects = [];

    this._errorCollection = new ErrorCollection("form");

    this._tokens = this.data.tokens;
    this._type = "generic";

    this._commit = false;
    this._autoSubmit = false;

    this._isFinished = "success" in this.data;
    this._isComplete = "complete" in this.data;

    this._successAction = null;

    if (
      modularuiResponse.parameters &&
      modularuiResponse.parameters.length > 0
    ) {
      this._parameters = modularuiResponse.parameters.map(
        parameter =>
          new Parameter(parameter._prefix, parameter._name, parameter._value)
      );
    }
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "Form";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "Form"
    );
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    return [
      ...this._missingObjects.getInitialChildModelLinks(),
      ...this._endResultObjects.getInitialChildModelLinks()
    ];
  }

  /**
   * @override
   */
  setChildModels(models: ResolvableModels[]) {
    this._missingObjects.setChildModels(models);
    this._endResultObjects.setChildModels(models);
  }

  createMissingCollection(
    data: FormJSON,
    contributions: FormContributionsJSON
  ): FormObjectCollection {
    if (!data || !contributions) {
      return new FormObjectCollection();
    }

    const formObjects =
      data.missing && data.missing.anchors ? data.missing.anchors : [];

    const formObjectsWithResults = formObjects.map(formObject => {
      if (data.results) {
        const resultObject = data.results.find(
          result =>
            result.objectid === formObject.objectid && "elements" in result
        );

        if (resultObject && "elements" in resultObject) {
          formObject.results = resultObject.elements;
        }
      }

      return formObject;
    });

    return new FormObjectCollection(
      formObjectsWithResults,
      contributions.objects
    );
  }

  createEndResultCollection(
    data: FormJSON,
    contributions: FormContributionsJSON
  ): FormObjectCollection {
    if (!data || !contributions) {
      return new FormObjectCollection();
    }

    const missingObjectIds =
      data.missing && data.missing.anchors
        ? data.missing.anchors.map(anchor => anchor.objectid)
        : [];

    // mark elements in results as result in stead of elements
    const endResults = data.results
      ? data.results
          .filter(result => !missingObjectIds.includes(result.objectid))
          .map(result => {
            const newResult = {
              type: "result",
              ...result,
              results: result.elements || []
            };
            delete newResult.elements;

            return newResult;
          })
      : [];

    return new FormObjectCollection(endResults, contributions.objects);
  }

  // do action on successful finish of form
  set successAction(action: ActionModel | null) {
    this._successAction = action;
  }

  get successAction(): ActionModel | null {
    return this._successAction;
  }

  /**
   * Replace or add parameters array with a new array of parameters
   */
  set parameters(parameters: Parameter[]) {
    this._parameters = parameters;
  }

  /**
   * Retrieve parameters
   */
  get parameters(): Parameter[] {
    return this._parameters || [];
  }

  selfhrefNoCommitParam() {
    const selfhref = this.selflink.href;
    selfhref.method = HTTP_METHODS.POST;

    selfhref.parameters = this.parameters.filter(
      parameter => parameter.name !== "commit"
    );

    return selfhref;
  }

  selfhrefWithCommitParam() {
    const selfhref = this.selfhrefNoCommitParam();

    const commitForm =
      !this.hasEndResultConfiguration || this.isComplete || this._commit;

    if (commitForm !== true) {
      selfhref.parameters.push(new Parameter("", "commit", "false"));
    }

    return selfhref;
  }

  /**
   * Create a selfhref including the parameters that are used to start this form
   */
  get selfhref(): Href {
    if (!this.selflink) {
      throw new Error("No self link found for form");
    }

    if (ALWAYS_COMMIT_FORM) {
      return this.selfhrefNoCommitParam();
    }

    return this.selfhrefWithCommitParam();
  }

  get commit(): boolean {
    return this._commit;
  }

  set commit(commit: boolean) {
    this._commit = commit;
  }

  /**
   * auto submits the form after changes in input
   * @returns {boolean}
   */
  get autoSubmit(): boolean {
    return this._autoSubmit;
  }

  set autoSubmit(autoSubmit: boolean) {
    this._autoSubmit = autoSubmit;
  }

  /**
   * Inidicates if form is finished
   */
  get isFinished(): boolean {
    return this._isFinished;
  }

  set isFinished(isFinished: boolean) {
    this._isFinished = isFinished;
  }

  get isComplete(): boolean {
    return this._isComplete;
  }

  set isComplete(isComplete: boolean) {
    this._isComplete = isComplete;
  }

  /**
   * Retrieve success redirect when finish
   */
  get successRedirect(): Href | null {
    return this.isFinished && this.data.success
      ? new Href(this.data.success.redirect)
      : null;
  }

  set redirectLocation(redirectLocation: Location) {
    this._redirectLocation = redirectLocation;
  }

  get redirectLocation(): Location | null {
    return this._redirectLocation;
  }

  /**
   * Get label
   */
  get label(): string {
    return this.contributions.label;
  }

  /**
   * Get missing form objects
   * @return {ListModel}
   */
  get missingObjects(): FormObjectCollection {
    return this._missingObjects;
  }

  set missingObjects(missingObjects: FormObjectCollection) {
    this._missingObjects = missingObjects;
  }

  /**
   * Get list of completed form objects
   */
  get completeObjects(): Array<FormObjectCollection> {
    return this._completeObjects;
  }

  /**
   * The end result is the result for the object that was previous shown
   */
  get endResultObjects(): FormObjectCollection {
    if (this.hasPreviousStep) {
      const previousObjectsKeys = this._completeObjects[
        this._completeObjects.length - 1
      ].all.map((completeObject: FormObjectModel) => completeObject.key);

      const applicableEndResults = this.allEndResultObjects.filter(
        endResultObject => previousObjectsKeys.includes(endResultObject.key)
      );

      const applicableCollection = new FormObjectCollection();
      applicableCollection.collection = applicableEndResults;

      return applicableCollection;
    } else if (this.missingObjects.isEmpty) {
      return this.allEndResultObjects;
    }

    return new FormObjectCollection();
  }

  set allEndResultObjects(endResultObjects: FormObjectCollection) {
    this._endResultObjects = endResultObjects;
  }

  get allEndResultObjects(): FormObjectCollection {
    return this._endResultObjects;
  }

  /**
   * Get all needed attributes according to the contributions.
   * This can be used to calculate if there are still attributes left to ask for
   */
  get neededAttributes(): number {
    if (typeof this.contributions.objects === "undefined") {
      return 0;
    }

    return Object.keys(this.contributions.objects)
      .map(objectid => this.contributions.objects[objectid].attributes.length)
      .reduce((prev, curr) => prev + curr);
  }

  /**
   * Check if form has a next step
   */
  get hasNextStep(): boolean {
    if (this.isComplete || this.isFinished) {
      return false;
    }

    const completedAttributes = this.completeObjects.reduce(
      (prev, curr) => prev + curr.attributeCount,
      0
    );
    return (
      this.missingObjects.hasRepeatableObject ||
      completedAttributes + this.missingObjects.attributeCount <
        this.neededAttributes
    );
  }

  /**
   * Check if form has a previous step
   */
  get hasPreviousStep(): boolean {
    return this._completeObjects.length > 0;
  }

  get previousStep(): FormObjectCollection | null {
    if (this.hasPreviousStep) {
      const previousIndex = this._completeObjects.length - 1;

      return this._completeObjects[previousIndex];
    }

    return null;
  }

  /**
   * Retrieve if all visible attributes are valid
   * @return {boolean}
   */
  get isValid(): boolean {
    return (
      this.missingObjects.all.every(missingObject =>
        missingObject.attributeCollection.visible.every(
          attribute => attribute.isValid
        )
      ) && !this.missingObjects.errorCollection.hasItems
    );
  }

  hasServerErrors() {
    return (
      this.errorCollection.hasItems || this.missingObjects.hasServerErrors()
    );
  }

  /**
   * Rest error messages
   */
  resetErrors() {
    this._errorCollection = new ErrorCollection("form");
    this.missingObjects.resetErrors();
  }

  /**
   * Retrieve error messages of form and it's objects
   */
  get errorCollection(): ErrorCollection {
    return this._errorCollection;
  }

  /**
   * Add an error to the error collection of this form
   */
  addServerError(error: ErrorResponse) {
    this._errorCollection.addServerError(error.id, error.parameters);
  }

  /**
   * Inidicates if Form is changed since last modifiction
   */
  isChanged() {
    return (
      typeof this.missingObjects.all.find(missingObject =>
        missingObject.isChangedSince(this.lastModification)
      ) !== "undefined"
    );
  }

  /**
   * Get form data as stringified literal
   *
   * Combine form objects with the same key and index into one object
   */
  get formdata(): string {
    const json = {
      objects: [],
      tokens: this.tokens
    };

    const allObjectCollections = [...this.completeObjects, this.missingObjects];

    const formdata = [];

    allObjectCollections.forEach(formObjectCollection => {
      formObjectCollection.all.forEach(formObject => {
        const existingObjectIndex = formdata.findIndex(
          obj =>
            obj.key === formObject.key &&
            obj.repeatIndex === formObject.repeatIndex
        );

        /*
         * when the object already exists in the formdata with the same key and index,
         * merge the attributes of both object together
         */
        if (existingObjectIndex > -1) {
          formdata[existingObjectIndex].formdata = deepmerge(
            formdata[existingObjectIndex].formdata,
            formObject.formdata
          );
        } else {
          formdata.push({
            key: formObject.key,
            repeatIndex: formObject.repeatIndex,
            formdata: formObject.formdata
          });
        }
      });
    });

    json.objects = formdata.map(obj => ({ [obj.key]: obj.formdata }));

    return JSON.stringify(json);
  }

  /**
   * Process errors from new form
   */
  handleErrors(newForm: FormModel) {
    const errorAnchors = newForm.data.errors;
    errorAnchors.forEach(error => {
      if (error.anchor) {
        // object errors
        const errorObject = this.missingObjects.get(error.anchor.objectid);
        if (errorObject) {
          errorObject.addServerError(error);
        }
      } else {
        this.errorCollection.addServerError(error.id, error.properties);
      }
    });
  }

  /**
   * Process missing from new form
   */
  handleMissing(newForm: FormModel) {
    const newAnchors = newForm.data.missing ? newForm.data.missing.anchors : [];

    if (this.hasNewObject(newAnchors)) {
      this._completeObjects = [...this.completeObjects, this.missingObjects];
      this._missingObjects = newForm._missingObjects;
      this._endResultObjects = newForm._endResultObjects;
    } else {
      this._missingObjects = this.processMissing(newForm);
    }
  }

  processMissing(newForm: FormModel) {
    const missingAnchors = newForm.data.missing.anchors;
    const newCollection = new FormObjectCollection();
    newCollection.collection = this.missingObjects.all.map(missingObject => {
      missingObject.attributeCollection.all.forEach(attribute => {
        if (
          typeof missingAnchors.find(
            anchor =>
              anchor.objectid === missingObject.key &&
              anchor.elementid === attribute.key
          ) === "undefined"
        ) {
          attribute.removeMissingError();
        } else {
          attribute.addMissingError();
        }
      });

      return missingObject;
    });

    return newCollection;
  }

  /**
   * Check if the objectid from the missing attributes already exist in this form,
   * in that case it is an existing object that has mandatory attributes not filled,
   * else it is a new object
   */
  hasNewObject(anchors: Array<FormAnchorJSON>) {
    return (
      typeof anchors.find(anchor => {
        const missingObject = this.missingObjects.get(anchor.objectid);

        if (missingObject && anchor.elementid) {
          return missingObject.attributeCollection.hasAttributeByKey(
            anchor.elementid
          );
        }

        return false;
      }) === "undefined"
    );
  }

  /**
   * Process finished form
   */
  handleFinished(newForm: FormModel) {
    this._completeObjects = [...this._completeObjects, this._missingObjects];
    this._missingObjects = newForm._missingObjects;
    this._endResultObjects = newForm._endResultObjects;
  }

  /**
   * Update current form with data from a new form
   */
  update(newForm: FormModel) {
    this.initAction = newForm.initAction;

    this.resetErrors();

    this._tokens = newForm.tokens;

    this.isComplete = newForm.isComplete;
    this.isFinished = newForm.isFinished;

    // When missing and error both don't exist, the form is finished
    if (!("missing" in newForm.data) && !("errors" in newForm.data)) {
      this.handleFinished(newForm);

      return this;
    }

    // handle errors
    if ("errors" in newForm.data) {
      this.handleErrors(newForm);
    }

    // handle missing attributes
    if ("missing" in newForm.data) {
      this.handleMissing(newForm);
    }

    return this;
  }

  /**
   * Go one object back
   */
  setPreviousObject() {
    this.isComplete = false;

    this._nextObjects = [this._missingObjects, ...this._nextObjects];
    this._missingObjects = this._completeObjects[
      this._completeObjects.length - 1
    ];
    this._endResultObjects = new FormObjectCollection();

    this._completeObjects = this._completeObjects.slice(0, -1);
  }

  /**
   * Go one object forward
   */
  setNextObject() {
    this._completeObjects = [...this._completeObjects, this._missingObjects];
    this._missingObjects = this._nextObjects[this._nextObjects.length - 1];
    this._nextObjects = this._nextObjects.slice(0, -1);
  }

  /**
   * Retrieve tokens of the form
   */
  get tokens(): string[] {
    return this._tokens;
  }

  get hasEndResultConfiguration(): boolean {
    return (
      this.missingObjects.hasEndResultConfiguration ||
      this.allEndResultObjects.hasEndResultConfiguration
    );
  }

  get isResultOnly(): boolean {
    return (
      this.hasEndResultConfiguration &&
      this.endResultObjects.hasItems &&
      this.missingObjects.isEmpty
    );
  }

  findAttribute(findMethod: Function) {
    const allObjectCollections = [...this.completeObjects, this.missingObjects];

    let foundAttribute = null;

    allObjectCollections.forEach(formObjectCollection => {
      if (foundAttribute === null) {
        formObjectCollection.all.forEach(formObject => {
          foundAttribute =
            formObject.attributeCollection.all.find(item => findMethod(item)) ||
            null;
        });
      }
    });

    return foundAttribute;
  }
}

export default FormModel;
