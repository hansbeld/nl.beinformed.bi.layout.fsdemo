// @flow
import type Href from "beinformed/models/href/Href";
import BaseCollection from "beinformed/models/base/BaseCollection";
import normalizeLinkJSON from "beinformed/models/links/normalizeLinkJSON";
import LinkModel from "beinformed/models/links/LinkModel";

export type LinkCollectionJSON = {
  self?: LinkJSON,
  api_doc?: LinkJSON,
  contributions?: LinkJSON,
  [linkKey: string]: LinkJSON
};
export type LinkCollectionContributionsJSON = {
  [linkKey: string]: LinkContributionsJSON
};

/**
 * Collection of links
 * @see {LinkModel}
 */
export default class LinkCollection extends BaseCollection<LinkModel> {
  /**
   * Constructs the link collection
   */
  constructor(
    linkData?: LinkCollectionJSON = {},
    linkContributions?: LinkCollectionContributionsJSON = {}
  ) {
    super();

    // There can be links in data and/or contributions (e.g. concept link is available through contributions)
    this.collection = normalizeLinkJSON(linkData, linkContributions).map(
      ({ data, contributions }) => new LinkModel(data, contributions)
    );
  }

  /**
   * Getting links
   */
  get links(): LinkModel[] {
    return this.collection;
  }

  /**
   * Set Link collection
   */
  set links(links: LinkModel[]) {
    this.collection = links;
  }

  /**
   * Get a link by it's key, handy for getting the self link
   */
  getLinkByKey(key: string): LinkModel | null {
    return this.links.find(link => link.key === key) || null;
  }

  /**
   * Get a link by it's Href
   */
  getLinkByHref(href: Href): LinkModel | null {
    return this.links.find(link => link.href.equals(href)) || null;
  }

  /**
   * Getting the links by group key. For instance getting all 'tab' links of the web application.
   */
  getLinksByGroup(...args: string[]): LinkCollection {
    const findGroups = args.length > 0 ? [...args] : [];
    const groupLinks = this.links.filter(link =>
      findGroups.includes(link.group)
    );

    const linkCollection = new LinkCollection();

    linkCollection.links = groupLinks;

    return linkCollection;
  }

  /**
   * Retrieve links by resource type
   */
  getLinkByResourceType(resourceType: string): LinkCollection {
    const linkCollection = new LinkCollection();

    linkCollection.collection = this.links.filter(
      link => link.resourcetype === resourceType
    );

    return linkCollection;
  }

  /**
   * Get all href of links in collection in an array of Href's
   */
  toHrefArray() {
    return this.links.map(link => link.href);
  }

  /**
   * Check if link exists in collection
   */
  hasLink(link: LinkModel): boolean {
    return typeof this.find(l => l.href.equals(link.href)) !== "undefined";
  }

  /**
   * Updates the collection with a new link, when the link to update does not exist, it is added to the collection
   */
  update(newLink: LinkModel): LinkCollection {
    const oldIndex = this.links.findIndex(link => link.key === newLink.key);

    if (oldIndex === -1) {
      this.collection = [...this.collection, newLink];

      return this;
    }

    this.collection = [
      ...this.links.slice(0, oldIndex),
      newLink,
      ...this.links.slice(oldIndex + 1)
    ];

    return this;
  }

  /**
   * Use as path regex for react router routes
   */
  get routePath(): string {
    if (this.length === 0) {
      return "__NON_EXISTING_ROUTE__";
    }

    const path = this.collection.map(link => link.href.path).join("|");
    return this.length > 1 ? `(${path})` : path;
  }
}
