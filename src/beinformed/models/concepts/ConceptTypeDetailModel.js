// @flow
import ResourceModel from "beinformed/models/base/ResourceModel";

/**
 * Model for concept details, available through modelcatalog
 */
export default class ConceptTypeDetailModel extends ResourceModel {
  /**
   * @overwrite
   */
  get type(): string {
    return "ConceptTypeDetail";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "ConceptTypeDetail"
    );
  }

  /**
   * Get concept type label
   */
  get label(): string {
    return this.data.label;
  }

  /**
   * Get concept type icon
   */
  get icon(): string {
    return this.data.icon;
  }

  /**
   * Get concept type text color
   */
  get textColor(): string {
    return this.data.textColor;
  }

  /**
   * Get concept type background color
   */
  get backgroundColor(): string {
    return this.data.backgroundColor;
  }

  /**
   * Get concept line color
   */
  get lineColor(): string {
    return this.data.lineColor;
  }

  /**
   * Get label types
   */
  get labelTypes(): Object[] {
    return this.data.labelTypes;
  }

  /**
   * Get propertyTypes
   */
  get propertyTypes(): Object[] {
    return this.data.propertyTypes;
  }

  /**
   * Get textFragmentTypes
   */
  get textFragmentTypes(): Object[] {
    return this.data.textFragmentTypes;
  }

  /**
   * Get sectionReferenceTypes
   */
  get sectionReferenceTypes(): Object[] {
    return this.data.sectionReferenceTypes;
  }
}
