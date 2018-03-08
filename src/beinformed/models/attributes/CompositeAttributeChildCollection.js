// @flow
import { get } from "lodash";

import ResourceCollection from "beinformed/models/base/ResourceCollection";
import AttributeFactory from "beinformed/models/attributes/AttributeFactory";
import ErrorCollection from "beinformed/models/error/ErrorCollection";

/**
 * Collection of choice attribute options
 */
class CompositeAttributeChildCollection extends ResourceCollection<
  AttributeType
> {
  static create(
    data: AttributeJSON,
    contributions: CompositeAttributeContributionsJSON
  ): CompositeAttributeChildCollection {
    const compositeAttributeChildCollection = new CompositeAttributeChildCollection();

    if (
      data &&
      contributions &&
      Array.isArray(contributions.children) &&
      Array.isArray(data.children)
    ) {
      compositeAttributeChildCollection.collection = contributions.children.map(
        contribution => {
          const key = Object.keys(contribution)[0];

          const attributeData = Array.isArray(data.children)
            ? data.children.find(attr => attr.key === key)
            : {};

          const attributeType = contributions.type.includes("range")
            ? contributions.type.replace("range", "")
            : null;

          const attribute = AttributeFactory.createAttribute(
            attributeType,
            key,
            {
              ...attributeData,
              dynamicschema: get(attributeData, "dynamicschema")
            },
            contribution[key]
          );

          return attribute;
        }
      );
    }

    return compositeAttributeChildCollection;
  }

  /**
   * Get input value of contributions
   */
  getInputValue(): string {
    return this.collection.map(child => child.inputvalue).join(",");
  }

  /**
   * Validate input
   */
  validate() {
    return this.collection.every(child => child.isValid);
  }

  /**
   * Retrieve error messages of this attribute
   */
  get errorCollection(): ErrorCollection {
    const collection = new ErrorCollection("compositechildren");

    return collection;
  }

  /**
   * Reset attribute to empty string
   */
  reset() {
    this.collection.forEach(child => {
      child.reset();
    });
  }
}

export default CompositeAttributeChildCollection;
