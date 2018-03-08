// @flow
import { get, has } from "lodash";

import type LinkModel from "beinformed/models/links/LinkModel";

import BaseModel from "beinformed/models/base/BaseModel";
import AttributeCollection from "beinformed/models/attributes/AttributeCollection";
import ContentConfiguration from "beinformed/models/contentconfiguration/ContentConfiguration";
import ErrorCollection from "beinformed/models/error/ErrorCollection";

/**
 * Form Object
 */
export default class FormObjectModel extends BaseModel<
  FormAnchorJSON,
  FormObjectContributionsJSON
> {
  _attributeCollection: AttributeCollection;
  _contentConfiguration: ContentConfiguration;
  _errorCollection: ErrorCollection;

  /**
   * Construct FormObjectModel
   */
  constructor(
    object: FormAnchorJSON,
    objectContributions: FormObjectContributionsJSON
  ) {
    super(object, objectContributions);

    if (object && this.getElements().length > 0) {
      this._attributeCollection = new AttributeCollection(
        this.getElements(),
        this.getApplicableAttributeContributions()
      );
    } else {
      this._attributeCollection = new AttributeCollection();
    }

    this._contentConfiguration = new ContentConfiguration(
      objectContributions ? objectContributions.content : {}
    );

    this._errorCollection = new ErrorCollection("formobject");

    if (has(this.data, "referenceDate")) {
      this.attributeCollection.setReferenceDate(
        get(this.data, "referenceDate")
      );
    }
  }

  /**
   * Get elements from both the missing attributes and the result attributes
   */
  getElements(): Array<FormElementJSON> {
    const elements = [];

    if (this.data.elements) {
      elements.push(...this.data.elements);
    }

    if (this.data.results) {
      const dataResults = this.data.results.map(result => ({
        ...result,
        isResult: true
      }));

      elements.push(...dataResults);
    }

    if (this.data.elementid) {
      elements.push({
        ...this.data
      });
    }

    return elements;
  }

  /**
   * Map available contributions on the available data. Only use contributions that are needed for the data
   */
  getApplicableAttributeContributions(): Array<{
    [string]: AttributeContributionsJSON
  }> {
    if (this.data && this.contributions) {
      const dataElementIds = this.getElements().map(
        element => element.elementid
      );
      const contributionAttributes = this.contributions.attributes;
      return this.getAttributesInData(dataElementIds, contributionAttributes);
    }

    return [];
  }

  /**
   * Recursevily check if an attribute id occurs in the tree of attribute contributions.
   * The complete leaf of the tree is returned when an attribute id matches
   */
  getAttributesInData(
    dataElementIds: Array<string>,
    attributesContributions: Array<{
      [string]: Object
    }>
  ) {
    return attributesContributions.filter(attributeContributions => {
      const attributeKey = Object.keys(attributeContributions)[0];

      if (dataElementIds.includes(attributeKey)) {
        return true;
      }

      const attribute = attributeContributions[attributeKey];

      if (attribute.children && Array.isArray(attribute.children)) {
        return (
          this.getAttributesInData(dataElementIds, attribute.children).length >
          0
        );
      }

      return false;
    });
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    return this._attributeCollection.getInitialChildModelLinks();
  }

  /**
   * @override
   */
  setChildModels(models: ResolvableModels[]) {
    this._attributeCollection.setChildModels(models);
  }

  /**
   * get key
   */
  get key(): string {
    return this.data.objectid;
  }

  /**
   * Get content configuration for form objects
   */
  get contentConfiguration(): ContentConfiguration {
    return this._contentConfiguration;
  }

  get hasEndResultConfiguration(): boolean {
    return has(this.contributions, "content.results");
  }

  /**
   * Indicates if object is dynamic. A dynamic object should be submitted on each attribute change
   */
  get isDynamic(): boolean {
    return get(this.contributions, "dynamicObject", false);
  }

  /**
   * Indicates if object is repeatable
   */
  get isRepeatable(): boolean {
    return this.contributions.repeatable || false;
  }

  get repeatIndex(): number {
    return this.data.index || 1;
  }

  get repeatIndexLabel(): string | null {
    return this.data["index-identifier"] || null;
  }

  /**
   * Get label of form object
   */
  get label(): string {
    return this.contributions.label;
  }

  /**
   * Get introText of form object
   */
  get introText(): ?string {
    return this.contributions.introText;
  }

  /**
   * Get assistent of form object
   */
  get assistent(): ?string {
    return this.contributions.assistent;
  }

  /**
   * Get button labels
   */
  get buttonLabels(): Object {
    return this.contributions.buttonLabels || {};
  }

  /**
   * get attribute collection
   */
  get attributeCollection(): AttributeCollection {
    return this._attributeCollection;
  }

  set attributeCollection(attributeCollection: AttributeCollection) {
    this._attributeCollection = attributeCollection;
  }

  /**
   * Update attribute
   */
  updateAttribute(attribute: AttributeType, value: string) {
    const attributeToUpdate = this.attributeCollection.getAttributeByKey(
      attribute.name
    );

    if (attributeToUpdate === null) {
      throw new Error(`Attribute with name: ${attribute.name} not found.`);
    }

    if (attributeToUpdate.children) {
      attributeToUpdate.updateChild(attribute, value);
    } else {
      attributeToUpdate.update(value);
    }

    return attributeToUpdate;
  }

  /**
   * Inidicates if Form is changed since a given timestamp (Date.now)
   */
  isChangedSince(timestamp: number) {
    return (
      this.attributeCollection.find(attribute =>
        attribute.isChangedSince(timestamp)
      ) !== null
    );
  }

  /**
   * Reset all errors on Form Object
   */
  resetErrors() {
    this._errorCollection = new ErrorCollection("formobject");
    this.attributeCollection.all.forEach(attribute => attribute.resetErrors());
  }

  /**
   * Get error messages
   */
  get errorCollection(): ErrorCollection {
    return this._errorCollection;
  }

  /**
   * Registers an error that was received from a server response
   */
  addServerError(error: FormErrorJSON) {
    if (error.anchor && error.anchor.elementid) {
      const attribute = this.attributeCollection.getAttributeByKey(
        error.anchor.elementid
      );
      if (attribute) {
        attribute.addServerError(error.id, error.properties);
      }
    } else {
      this._errorCollection.addServerError(error.id, error.properties);
    }
  }

  hasServerErrors() {
    return (
      this.errorCollection.hasItems ||
      this.attributeCollection.hasServerErrors()
    );
  }

  get formdata(): Object {
    const formdata = {};

    this.attributeCollection.visible
      .filter(
        attribute => !attribute.readonly && !attribute.isConfirmationPassword
      )
      .forEach(attribute => {
        formdata[attribute.name] = attribute.value;
      });

    return formdata;
  }
}
