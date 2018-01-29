// @flow
import BaseModel from "beinformed/models/base/BaseModel";
import LinkCollection from "beinformed/models/links/LinkCollection";
import type LinkModel from "beinformed/models/links/LinkModel";
import type Href from "beinformed/models/href/Href";

/**
 * Link to a concept
 */
export default class SubSectionModel extends BaseModel {
  _links: LinkCollection;

  /**
   * @override
   */
  constructor(data: any) {
    super(data);

    this._links = new LinkCollection(
      this.data._links,
      this.contributions._links
    );
  }

  /**
   * Retrieve key of subsection
   */
  get key(): string {
    return this.data._id;
  }

  /**
   * Retrieve html body
   */
  get body(): string {
    return this.data.body || "";
  }

  /**
   * Retrieve number of section
   */
  get number(): string {
    return this.data.number;
  }

  /**
   * Retrieve label of section
   */
  get label(): string {
    return this.data.label;
  }

  /**
   * Get sub sections
   */
  get subSections(): SubSectionModel[] {
    return this.data.subSections
      ? this.data.subSections.map(subSection => new SubSectionModel(subSection))
      : [];
  }

  /**
   * Retrieve links of section
   */
  get links(): LinkCollection {
    return this._links;
  }

  /**
   * Get self link of model
   */
  get selflink(): LinkModel | null {
    return this.links.getLinkByKey("self");
  }

  /**
   * Return default self link of resource
   */
  get selfhref(): Href | null {
    return this.selflink ? this.selflink.href : null;
  }
}
