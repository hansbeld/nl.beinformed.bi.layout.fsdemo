// @flow
import ResourceModel from "beinformed/models/base/ResourceModel";

/**
 * Model for concept details, available through modelcatalog
 */
export default class ContentTypeModel extends ResourceModel {
  /**
   * @overwrite
   */
  get type(): string {
    return "ContentType";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "ContentTypeDetail"
    );
  }

  /**
   * Get concept type label
   */
  get label(): string {
    return this.data.label || "";
  }

  /**
   * Get content type icon
   */
  get icon(): string {
    return this.iconLarge;
  }

  /**
   * Get content type small icon
   */
  get iconSmall(): string {
    return this.data.iconSmall;
  }

  /**
   * Get content type medium icon
   */
  get iconMedium(): string {
    return this.data.iconMedium;
  }

  /**
   * Get content type large icon
   */
  get iconLarge(): string {
    return this.data.iconLarge;
  }

  /**
   * Get concept type text color
   */
  get description(): string {
    return this.data.description;
  }
}
