// @flow
import BaseModel from "beinformed/models/base/BaseModel";
import AttributeCollection from "beinformed/models/attributes/AttributeCollection";

export default class AttributeSetModel extends BaseModel<
  AttributeSetAttributeData,
  AttributeSetContributions
> {
  _attributeCollection: AttributeCollection;
  _key: string;

  constructor(
    key: string,
    data: AttributeSetAttributeData,
    contributions: AttributeSetContributions
  ) {
    super(data, contributions);

    this.attributeCollection = new AttributeCollection(
      this.data,
      this.contributions.attributes,
      true
    );

    this.key = key;
  }

  get key(): string {
    return this._key;
  }

  set key(key: string) {
    this._key = key;
  }

  get label(): string {
    return this.contributions.label;
  }

  /**
   * Retrieve attribute collection
   */
  get attributeCollection(): AttributeCollection {
    return this._attributeCollection;
  }

  /**
   * Set the attributes with a new AttributeCollection
   */
  set attributeCollection(collection: AttributeCollection) {
    this._attributeCollection = collection;
  }
}
