// @flow
import type ConceptTypeDetailModel from "beinformed/models/concepts/ConceptTypeDetailModel";
import BaseModel from "beinformed/models/base/BaseModel";
import Href from "beinformed/models/href/Href";
import LinkModel from "beinformed/models/links/LinkModel";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

/**
 * Link to a concept
 */
export default class ConceptLinkModel extends BaseModel {
  _entryDate: string | null;
  _conceptType: ConceptTypeDetailModel;

  /**
   * Construct ConceptLinkModel
   */
  constructor(data: ConceptItemJSON, entryDate: string | null = null) {
    super(data);

    this._entryDate = entryDate;
  }

  /**
   * Retrieve concept type
   */
  get conceptType(): ConceptTypeDetailModel {
    return this._conceptType;
  }

  /**
   * Set concept type
   */
  set conceptType(model: ConceptTypeDetailModel) {
    this._conceptType = model;
  }

  /**
   * Retrieve key
   */
  get key(): string {
    return this.data._id || this.data.conceptIdentifier;
  }

  /**
   * Retrieve label
   */
  get label(): string {
    return this.data.label || this.data.conceptLabel;
  }

  /**
   * Self href of concept
   */
  get selfhref(): Href {
    if (this._entryDate !== null) {
      return new Href(this.data._links.self.href).addParameter(
        TIMEVERSION_FILTER_NAME,
        this._entryDate
      );
    }

    return new Href(this.data._links.self.href);
  }

  /**
   * Concept type href of concept
   */
  get concepttypeHref(): Href {
    return new Href(this.data._links.concepttype.href);
  }

  get taxonomyType(): string {
    return "default";
  }

  asLinkModel() {
    const link = LinkModel.create(this.key, this.selfhref.href, this.label);
    link.href = this.selfhref;

    return link;
  }
}
