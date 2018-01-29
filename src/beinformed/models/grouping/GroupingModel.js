// @flow
import AttributeCollection from "beinformed/models/attributes/AttributeCollection";

/**
 * Group information model
 */
class GroupModel {
  _type: string;
  _id: string;
  _attributeCollection: AttributeCollection;
  _grouping: GroupingModel;
  _reference: number[];

  /**
   * Construct group model
   */
  constructor(
    group: GroupJSON,
    context: ContextContributionsJSON,
    contributions: Array<ContextContributionsJSON>
  ) {
    this._type = group.type;
    this._id = group._id || "unknown";

    this._attributeCollection = new AttributeCollection(
      group,
      context.attributes
    );

    if (group.grouping) {
      this._grouping = new GroupingModel(group.grouping, contributions);
    }

    this._reference = group.reference || [];
  }

  /**
   * Retrieve group type
   * @return {string}
   */
  get type() {
    return this._type;
  }

  /**
   * Retrieve group id
   * @return {string}
   */
  get id() {
    return this._id;
  }

  /**
   * Retrieve attribute collection
   * @return {Attribute[]}
   */
  get attributeCollection() {
    return this._attributeCollection;
  }

  /**
   * Retrieve grouping of group
   */
  get grouping() {
    return this._grouping;
  }

  /**
   * Retrieve array of reference id's
   */
  get reference(): Array<number> {
    return this._reference;
  }
}

/**
 * Grouping model to group lists
 */
class GroupingModel {
  _prefix: string | null;
  _context: Object;
  _groups: GroupModel[];

  /**
   * Constructor
   */
  constructor(data: GroupingJSON, contexts: Array<ContextContributionsJSON>) {
    this._prefix = data && data.prefix ? data.prefix : null;
    this._context = this.getContextFromContributionsByPrefix(
      contexts,
      this._prefix
    );
    this._groups =
      data && data.group
        ? data.group.map(group => new GroupModel(group, this.context, contexts))
        : [];
  }

  /**
   * Retrieve groups of grouping
   */
  get groups(): GroupModel[] {
    return this._groups;
  }

  /**
   * Inidicates if Grouping has one or more groups
   */
  hasGroups() {
    return this._groups.length > 0;
  }

  /**
   * Retrieve context of grouping
   */
  get context(): Object {
    return this._context;
  }

  /**
   * Get context of grouping
   */
  getContextFromContributionsByPrefix(
    contexts: Array<ContextContributionsJSON>,
    prefix: string | null
  ) {
    if (contexts && prefix !== null) {
      return contexts.find(context => context.prefix === prefix) || {};
    }

    return {};
  }
}

export default GroupingModel;
