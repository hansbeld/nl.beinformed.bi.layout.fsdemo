// @flow
import ResourceCollection from "beinformed/models/base/ResourceCollection";

import AttributeFactory from "beinformed/models/attributes/AttributeFactory";

import { isVisibleAttribute } from "beinformed/models/attributes/attributeVisibilityUtil";
import { DEPENDENT_INPUT_CONTROL } from "beinformed/constants/LayoutHints";

class AttributeCollection extends ResourceCollection<AttributeType> {
  constructor(
    data?: AttributeCollectionData,
    contributions?: AttributeCollectionContributions,
    isReadonly?: boolean
  ) {
    super();

    if (contributions) {
      contributions.forEach(contribution => {
        const key = Object.keys(contribution)[0];

        const attribute = AttributeFactory.createAttribute(
          null,
          key,
          data,
          contribution[key]
        );

        // when readonly is not explicitly set in the contributions, follow argument
        if (isReadonly && !contribution[key].hasOwnProperty("readonly")) {
          attribute.readonly = true;
        }

        this.collection.push(attribute);
      });
    }
  }

  /**
   * Retrieve only visible attributes from the collection
   */
  get visible(): AttributeType[] {
    // Let flow now that this is a AttributeCollection
    if (this instanceof AttributeCollection) {
      return this.all.filter(attribute => isVisibleAttribute(this, attribute));
    }

    return [];
  }

  get questions(): AttributeType[] {
    return this.visible.filter(attribute => !attribute.isResult);
  }

  get results(): AttributeType[] {
    return this.visible.filter(attribute => attribute.isResult);
  }

  /**
   * Replace attributes with a new array of attributes
   */
  set attributes(attributes: AttributeType[]) {
    this.collection = attributes;
  }

  /**
   * Get a single attribute by it's key
   */
  getAttributeByKey(key: string): AttributeType | null {
    return (
      this.all.find(attribute => {
        if (attribute.key === key) {
          return true;
        } else if (attribute.children) {
          return attribute.getChildByKey(key);
        }

        return false;
      }) || null
    );
  }

  /**
   * Inidicates if attribute with key exists in collection
   */
  hasAttributeByKey(key: string) {
    return this.getAttributeByKey(key) !== null;
  }

  /**
   * Getting the first attribute having the supplied layout hint
   */
  getAttributeByLayoutHint(layoutHint: string): AttributeType | null {
    return (
      this.all.find(attribute => attribute.layouthint.has(layoutHint)) || null
    );
  }

  /**
   * Getting a choice attribute by layouthint, returns null when not found or not a choice attribute
   */
  getChoiceAttributeByLayoutHint(
    layoutHint: string
  ): ChoiceAttributeModel | null {
    const attribute = this.getAttributeByLayoutHint(layoutHint);

    if (attribute && attribute.type === "choice") {
      return attribute;
    }

    return null;
  }

  /**
   * Getting all attributes having the supplied layout hint
   */
  getAttributesByLayoutHint(layoutHint: string) {
    return this.all.filter(attribute => attribute.layouthint.has(layoutHint));
  }

  /**
   * Replace an attribute instance in the collection with a new attribute instance
   */
  replace(oldAttribute: AttributeType, newAttribute: AttributeType) {
    this.replaceByKey(oldAttribute.key, newAttribute);
  }

  /**
   * Replace an attribute by the key of the attribute
   */
  replaceByKey(key: string, newAttribute: AttributeType) {
    this.all.forEach((attribute, index) => {
      if (attribute.key === key) {
        this.collection[index] = newAttribute;
      }
    });
  }

  /**
   * Set reference date by replacing an old attribute with a new attribute with a reference Date
   * Date is a string in ISO format YYYY-MM-DD
   */
  setReferenceDate(date: string) {
    this.all.forEach(attribute => {
      const newAttribute = attribute.clone();

      newAttribute.referenceDate = date;

      this.replace(attribute, newAttribute);
    });
  }

  /**
   * Retrieves a dependent choice attribute from this collection
   */
  getDependentChoiceAttribute(controlAttributeId: string) {
    const attribute = this.getAttributeByLayoutHint(
      `${DEPENDENT_INPUT_CONTROL}: ${controlAttributeId}`
    );

    if (attribute && attribute.type === "choice") {
      return attribute;
    }

    return null;
  }

  hasServerErrors(): boolean {
    return (
      typeof this.collection.find(attribute => attribute.hasServerErrors()) !==
      "undefined"
    );
  }
}

export default AttributeCollection;
