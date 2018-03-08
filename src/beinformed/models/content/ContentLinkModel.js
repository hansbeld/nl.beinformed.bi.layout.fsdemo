// @flow
import { get, has } from "lodash";

import BaseModel from "beinformed/models/base/BaseModel";
import Href from "beinformed/models/href/Href";
import LinkModel from "beinformed/models/links/LinkModel";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";
import type ContentTypeModel from "beinformed/models/content/ContentTypeModel";

type ContentLinkData =
  | ContentItemJSON
  | CategoryLinkJSON
  | (ChildSectionLinkJSON & { section: string })
  | (SourceReferenceJSON & { section: string })
  | (ContentItem & { section: string });

/**
 * Link to a concept
 */
export default class ContentLinkModel extends BaseModel<ContentLinkData, void> {
  _entryDate: string | null;
  _contentType: ContentTypeModel;
  _items: Array<ContentLinkModel>;

  /**
   * Construct ContentLinkModel
   */
  constructor(data: ContentLinkData, entryDate: string | null = null) {
    super(data);

    this._entryDate = entryDate;
  }

  /**
   * Retrieve concept type
   */
  get contentType(): ContentTypeModel {
    return this._contentType;
  }

  /**
   * Set concept type
   */
  set contentType(model: ContentTypeModel) {
    this._contentType = model;
  }

  set entryDate(entryDate: string) {
    this._entryDate = entryDate;
  }

  /**
   * Retrieve key
   */
  get key(): string {
    return get(this.data, "_id", "");
  }

  /**
   * Retrieve label
   */
  get label(): string {
    return get(this.data, "label", "");
  }

  /**
   * Retrieve the label of the source a link to a section belongs to
   */
  get sourceLabel(): ?string {
    return get(this.data, "sourceLabel");
  }

  /**
   * Self href of content
   */
  get selfhref(): Href {
    const href = new Href(this.data._links.self.href);
    if (this._entryDate !== null) {
      return href.addParameter(TIMEVERSION_FILTER_NAME, this._entryDate);
    }

    return href;
  }

  /**
   * Encode the content-identifier of the path to the content resource.
   * This makes it a single uri part, which can be used on routes to make nested routes
   */
  get encodedHref(): Href {
    const startURI = "/content/";

    const selfhref = this.data._links.self.href;
    const href = has(this.data, "section")
      ? new Href(
          `${startURI}${encodeURIComponent(
            selfhref.substring(
              startURI.length,
              selfhref.indexOf(this.data.section) - 1
            )
          )}/${get(this.data, "section")}`
        )
      : new Href(
          `${startURI}${encodeURIComponent(
            this.data._links.self.href.substr(startURI.length)
          )}`
        );

    if (this._entryDate !== null) {
      return href.addParameter(TIMEVERSION_FILTER_NAME, this._entryDate);
    }

    return href;
  }

  /**
   * Get self link of model
   */
  get selflink(): LinkModel {
    return LinkModel.create("self", this.selfhref.href, this.label);
  }

  /**
   * Content type href of concept
   */
  get contenttypeHref(): Href | null {
    if (has(this.data._links, "contenttype")) {
      return new Href(this.data._links.contenttype.href);
    }

    return null;
  }

  /**
   * Children of link model in TOC
   */
  set items(items: Array<ContentLinkModel>) {
    this._items = items;
  }

  get items(): Array<ContentLinkModel> {
    return this._items;
  }
}
