// @flow
import { get } from "lodash";

import ResourceModel from "beinformed/models/base/ResourceModel";

/**
 * Model for concept details, available through modelcatalog
 */
export default class ConceptTypeDetailModel extends ResourceModel<
  ConceptTypeJSON,
  ConceptTypeContributionsJSON
> {
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
    return get(this.data, "label", "");
  }

  /**
   * Get concept type icon
   */
  get icon(): string {
    return get(this.data, "icon", "");
  }

  /**
   * Get concept type text color
   */
  get textColor(): string {
    return get(this.data, "textColor", "#000");
  }

  /**
   * Get concept type background color
   */
  get backgroundColor(): string {
    return get(this.data, "backgroundColor", "#fff");
  }

  /**
   * Get concept line color
   */
  get lineColor(): string {
    return get(this.data, "lineColor", "#000");
  }

  /**
   * Get label types
   */
  get labelTypes(): Array<labelType> {
    return this.data.labelTypes;
  }

  /**
   * Get propertyTypes
   */
  get propertyTypes(): Array<propertyType> {
    return get(this.data, "propertyTypes", []);
  }

  /**
   * Get textFragmentTypes
   */
  get textFragmentTypes(): Array<textFragmentType> {
    return get(this.data, "textFragmentTypes", []);
  }

  /**
   * Get sectionReferenceTypes
   */
  get sectionReferenceTypes(): Array<sectionReferenceType> {
    return get(this.data, "sectionReferenceTypes", []);
  }
}
