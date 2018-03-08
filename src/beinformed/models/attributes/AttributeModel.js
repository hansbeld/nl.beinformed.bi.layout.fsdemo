// @flow
import { get } from "lodash";

import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";

import BaseModel from "beinformed/models/base/BaseModel";
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import ErrorCollection from "beinformed/models/error/ErrorCollection";
import LinkCollection from "beinformed/models/links/LinkCollection";

import {
  MANDATORY,
  ALIGN_CENTER,
  ALIGN_RIGHT
} from "beinformed/constants/LayoutHints";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

import { getDependentAttributeHint } from "beinformed/models/attributes/attributeVisibilityUtil";

import type ContentModel from "beinformed/models/content/ContentModel";
import type LinkModel from "beinformed/models/links/LinkModel";
import type ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

/**
 * Attribute model, base model for all kind of attributes
 */
export default class AttributeModel<
  Contributions: Object = CommonAttributeContributionsJSON
> extends BaseModel<AttributeJSON, Contributions> {
  _isValid: boolean;
  _label: string;
  _readonly: boolean;
  _isResult: boolean;
  _errorCollection: ErrorCollection;
  _lastModification: number;
  _links: LinkCollection;
  _isEditable: boolean;
  _concept: ConceptDetailModel | null;
  _content: Map<string, ContentModel>;
  _referenceDate: string;
  _mandatory: boolean;
  _validatedValue: string;
  _isHidden: boolean;
  _value: {
    initvalue: ?string,
    inputvalue: ?string,
    value: ?string
  };

  /**
   * Create an attribute model
   */
  constructor(attribute: AttributeJSON, attributeContributions: Contributions) {
    super(attribute, attributeContributions);

    this._label = this.contributions.label;

    this._lastModification = 0;

    this._value = {
      initvalue: this.data.value,
      inputvalue: this.getInitialInputValue(this.data.value),
      value: this.data.value
    };

    this._errorCollection = new ErrorCollection("attribute");
    if (attribute && attribute.message) {
      this._errorCollection.addServerError(
        attribute.message.id,
        attribute.message.parameters
      );
    }
    this._isValid = true;

    this._isEditable = false;

    this._concept = null;
    this._content = new Map();
    this._referenceDate = this.data.referenceDate || DateUtil.now();

    this._isResult = this.data.isResult || false;

    this._isHidden = false;
  }

  /**
   * Retrieve initial input value
   */
  getInitialInputValue(value: string | null) {
    return value;
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    if (this.conceptLink) {
      return [this.conceptLink];
    }
    return [];
  }

  /**
   * @override
   */
  setChildModels(models: ResolvableModels[]) {
    const conceptLink = this.conceptLink;

    if (conceptLink && conceptLink !== null) {
      const conceptModel =
        models.find(model =>
          model.selfhref.equalsWithParameters(conceptLink.href)
        ) || null;

      if (conceptModel !== null && conceptModel.type === "ConceptDetail") {
        this.concept = conceptModel;
      }
    }
  }

  /**
   * Getting the attribute key
   */
  get key(): string {
    return this.data.key;
  }

  /**
   * Getting the attribute name
   */
  get name(): string {
    return this.key;
  }

  /**
   * Getting the type of the attribute
   */
  get type(): string {
    return this.contributions.type;
  }

  /**
   * Getting the label of the attribute
   */
  get label(): string {
    return this._label || "";
  }

  /**
   * Retrieve the first permitted label to render when a concept and contentConfiguration is available
   * Be aware that permission could be in place for labels from a concept.
   */
  getContentConfiguredLabel(
    contentConfiguration?: ContentConfigurationElements
  ): string {
    const configuredLabelProperties =
      contentConfiguration && contentConfiguration.labelConfig.length > 0
        ? contentConfiguration.labelConfig[0].types
        : [];

    if (this.concept && configuredLabelProperties.length > 0) {
      const configuredLabels = this.concept
        .getLabelElementByIds(configuredLabelProperties)
        .filter(
          configuredLabel =>
            configuredLabel.value && configuredLabel.value !== ""
        );

      if (configuredLabels.length > 0) {
        return configuredLabelProperties
          .filter(
            configuredLabelProperty =>
              typeof configuredLabels.find(
                configuredLabel =>
                  configuredLabel._id === configuredLabelProperty
              ) !== "undefined"
          )
          .map(configuredLabelProperty =>
            configuredLabels.find(
              configuredLabel => configuredLabel._id === configuredLabelProperty
            )
          )[0].value;
      }
    }

    return this.label;
  }

  /**
   * Handles layout hint align-left, align-center and align-right
   */
  get alignment(): string {
    if (this.layouthint.getByLayoutHint(ALIGN_CENTER)) {
      return "center";
    } else if (this.layouthint.getByLayoutHint(ALIGN_RIGHT)) {
      return "right";
    }

    return "left";
  }

  /**
   * Set the label of this attribute
   */
  set label(label: string) {
    this._label = label;
  }

  /**
   * Retrieve links of attribute
   */
  get links(): LinkCollection {
    if (!this._links) {
      this._links = new LinkCollection(
        this.data._links,
        this.contributions._links
      );
    }

    return this._links;
  }

  /**
   * Retrieve link of attribute when available
   */
  get downloadLink(): LinkModel | null {
    const downloadLink = this.links.getLinksByGroup("download").first;

    if (downloadLink && downloadLink.key === this.key) {
      return downloadLink;
    }

    return null;
  }

  /**
   * Check if attribute has a link
   */
  hasDownloadLink() {
    return this.downloadLink !== null;
  }

  /**
   * Retrieve concept link of attribute when available
   */
  get conceptLink(): LinkModel | null {
    const conceptLink = this.links.getLinkByKey("concept");

    if (conceptLink !== null) {
      conceptLink.href = conceptLink.href.addParameter(
        TIMEVERSION_FILTER_NAME,
        this.referenceDate
      );

      conceptLink.isCacheable = true;
    }

    return conceptLink;
  }

  /**
   * Get concept information
   */
  get concept(): ConceptDetailModel | null {
    return this._concept || null;
  }

  /**
   * Set the concept
   */
  set concept(concept: ConceptDetailModel | null) {
    this._concept = concept;
  }

  /**
   * Retrieve reference date of attribute which can be used as entryDate for content
   */
  get referenceDate(): string {
    return this._referenceDate;
  }

  /**
   * Set reference date for concepts and content
   */
  set referenceDate(date: string) {
    this._referenceDate = date;
  }

  /**
   * Add content model to attribute
   */
  addContent(type: string, content: ContentModel) {
    if (content.type !== "Content") {
      throw new Error(
        `Attribute.addContent: not a ContentModel for type ${type}`
      );
    }
    this._content.set(type, content);
  }

  /**
   * Get content model
   */
  get content(): Map<string, ContentModel> {
    return this._content;
  }

  /**
   * Retrieve input value
   */
  getInputValue(): string {
    const inputvalue = this._value.inputvalue;

    return !inputvalue || inputvalue === null ? "" : inputvalue.toString();
  }

  /**
   * Returns the value as entered by the user. This can differ from the internal iso value that is stored
   */
  get inputvalue(): string {
    return this.getInputValue();
  }

  /**
   * Sets the input value to the value entered by the user
   */
  set inputvalue(value: string) {
    this._value.inputvalue = value;
    this.value = value;

    this.validate(value);
  }

  /**
   * Getting the value of the attribute
   */
  getValue(): number | string | null {
    const value = this._value.value;

    return typeof value === "undefined" || value === null || value === ""
      ? null
      : value;
  }

  /**
   * Getting the value of the attribute
   */
  get value(): number | string | null {
    return this.getValue();
  }

  /**
   * Setting a value in the element
   */
  set value(value: string | null) {
    this.updateLastModification();
    this._errorCollection.removeServerErrors();

    this._value.value = value;
  }

  /**
   * Getting the readonly value, iso value converted for human reading
   */
  get readonlyvalue(): string {
    return !this.value || this.value === null ? "" : this.value.toString();
  }

  /**
   * Getting mandatory status of attribute
   */
  get mandatory(): boolean {
    return (
      this.layouthint.has(MANDATORY) || this.contributions.mandatory || false
    );
  }

  /**
   * Set mandatory status of attribute
   */
  set mandatory(mandatory: boolean) {
    this._mandatory = mandatory;
  }

  get readonly(): boolean {
    return (
      this._readonly ||
      this.contributions.readonly === true ||
      this.data.static === true ||
      this.isResult === true ||
      false
    );
  }

  set readonly(readonly: boolean) {
    this._readonly = readonly;
  }

  get isResult(): boolean {
    return this._isResult;
  }

  set isResult(isResult: boolean) {
    this._isResult = isResult;
  }

  /**
   * Getting the display and input format of a attribute
   */
  get format(): string | null {
    return get(this.contributions, "format", null);
  }

  get formatLabel(): string {
    return this.format || "";
  }

  /**
   * Get minimum string length
   */
  get minLength(): number | null {
    return get(this.contributions, "minLength", null);
  }

  /**
   * Get maximum string length
   */
  get maxLength(): number | null {
    return get(this.contributions, "maxLength", null);
  }

  /**
   * Get assistant message
   */
  get assistantMessage(): string | null {
    return this.contributions.assistant || null;
  }

  /**
   * Get valid status
   */
  get isValid(): boolean {
    return this.validate(this.inputvalue);
  }

  isNotEmptyString(value: string) {
    if (typeof value !== "string") {
      throw new TypeError("isNotEmptyString: Not comparing to string");
    }

    return value !== "";
  }

  isExactLength(value: string) {
    if (typeof value !== "string") {
      throw new TypeError("isExactLength: Not comparing to string");
    }

    if (this.minLength === null) {
      throw new Error("isExactLength: Min and max length not set");
    }

    return value.length === this.minLength;
  }

  isBetween(value: string) {
    if (typeof value !== "string") {
      throw new TypeError("isBetween: Not comparing to string");
    }

    if (this.minLength === null || this.maxLength === null) {
      throw new Error("isBetween: Min or max length not set");
    }

    return (
      this.minLength &&
      this.maxLength &&
      this.isLongEnough(value) &&
      this.isSmallEnough(value)
    );
  }

  isLongEnough(value: string) {
    if (typeof value !== "string") {
      throw new TypeError("isLongEnough: Not comparing to string");
    }

    if (this.minLength === null) {
      throw new Error("isLongEnough: Min length not set");
    }

    return this.minLength && value.length >= this.minLength;
  }

  isSmallEnough(value: string) {
    if (typeof value !== "string") {
      throw new TypeError("isSmallEnough: Not comparing to string");
    }

    if (this.maxLength === null) {
      throw new Error("isSmallEnough: Max length not set");
    }

    return this.maxLength && value.length <= this.maxLength;
  }

  /**
   * Retrieve applicable constraint for this attribute
   */
  get constraintCollection(): ConstraintCollection {
    const constraints = new ConstraintCollection();

    // Don't need constraints on a readonly value because there is no user input to validate
    if (this.readonly) {
      return constraints;
    }

    // Mandatory constraint
    if (this.mandatory) {
      constraints.addConstraint(
        "Constraint.Mandatory",
        this.isNotEmptyString.bind(this)
      );
    }

    // Length constraints
    if (this.minLength && this.maxLength && this.minLength === this.maxLength) {
      constraints.addConstraint(
        "Constraint.InvalidLengthExact",
        this.isExactLength.bind(this),
        {
          length: this.maxLength,
          value: this.inputvalue,
          "actual-length": this.inputvalue.length
        }
      );
    } else if (this.minLength && this.maxLength) {
      constraints.addConstraint(
        "Constraint.InvalidLengthBetween",
        this.isBetween.bind(this),
        {
          "min-length": this.minLength,
          "max-length": this.maxLength,
          value: this.inputvalue,
          "actual-length": this.inputvalue.length
        }
      );
    } else if (this.minLength) {
      constraints.addConstraint(
        "Constraint.InvalidLengthTooShort",
        this.isLongEnough.bind(this),
        {
          "min-value": this.minLength,
          value: this.inputvalue,
          "actual-length": this.inputvalue.length
        }
      );
    } else if (this.maxLength) {
      constraints.addConstraint(
        "Constraint.InvalidLengthTooLong",
        this.isSmallEnough.bind(this),
        {
          "max-value": this.maxLength,
          value: this.inputvalue,
          "actual-length": this.inputvalue.length
        }
      );
    }

    constraints.add(this.addConstraints());

    return constraints;
  }

  /**
   * Template method for class extending this model to add extra constraints
   * @abstract
   */
  addConstraints() {
    return new ConstraintCollection();
  }

  /**
   * Validate input
   */
  validate(value: string) {
    if (this.isOptionalAndEmpty(value)) {
      this._isValid = true;
    } else if (this._validatedValue !== value) {
      this._isValid = this.constraintCollection.validate(value);
      this._validatedValue = value;
    }

    return this._isValid;
  }

  /**
   * Indicates if attribute is optional and empty
   */
  isOptionalAndEmpty(value?: string) {
    return !this.mandatory && value === "";
  }

  /**
   * Retrieve error messages of this attribute
   */
  get errorCollection(): ErrorCollection {
    const collection = new ErrorCollection("attribute", this._errorCollection);

    collection.addConstraints(
      this.constraintCollection.invalidConstraints(this.inputvalue)
    );

    return collection;
  }

  /**
   * Check if attribute is in error
   */
  inError(): boolean {
    return !this._isValid && this.isChangedSince(0);
  }

  /**
   * Reset static error messages on attribute
   */
  resetErrors() {
    this._errorCollection = new ErrorCollection("attribute");
  }

  /**
   * Registers an error that was received from a server response
   */
  addServerError(id: string, parameters?: MessageParametersType) {
    this._errorCollection.addServerError(id, parameters);
  }

  removeServerError(id: string) {
    this._errorCollection.removeServerError(id);
  }

  hasServerErrors() {
    return this.errorCollection.serverErrors.length > 0;
  }

  /**
   * Registers a missing error that was received from the server
   */
  addMissingError() {
    this._errorCollection.addServerError("Constraint.Mandatory");
  }

  removeMissingError() {
    this.removeServerError("Constraint.Mandatory");
  }

  /**
   * Set last modification to current timestamp
   */
  updateLastModification() {
    this._lastModification = Date.now();
  }

  /**
   * Inidicates if attribute is changed since a given timestamp (Date.now)
   */
  isChangedSince(timestamp: number) {
    return this._lastModification > timestamp;
  }

  /**
   * Abstract reset method which should be implemented on each attribute that has this attribute as a base class.
   * @abstract
   */
  reset() {
    throw new Error(`Reset method not implemented for ${this.type}`);
  }

  /**
   * Abstract update method which should be implemented on each attribute that has this attribute as a base class.
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  update(value: string) {
    throw new Error(`Update method not implemented for ${this.type}`);
  }

  /**
   * Indicate if attribute is editable
   */
  set isEditable(isEditable: boolean) {
    this._isEditable = isEditable;
  }

  /**
   * Retrieve if attribute is editable
   */
  get isEditable(): boolean {
    return this._isEditable;
  }

  /**
   * Retrieve if the attribute has an dependent attribute layout hint
   */
  get isDependentAttribute(): boolean {
    return getDependentAttributeHint(this) !== null;
  }

  get isHidden(): boolean {
    return this._isHidden;
  }

  /*
   * Explicitly toggle visibility of this attribute
   */
  show() {
    this._isHidden = false;
  }

  hide() {
    this._isHidden = true;
  }
}
