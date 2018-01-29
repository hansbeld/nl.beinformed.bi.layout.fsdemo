// @flow
import AttributeModel from "beinformed/models/attributes/AttributeModel";
import CompositeAttributeChildCollection from "beinformed/models/attributes/CompositeAttributeChildCollection";
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";

import type LinkModel from "beinformed/models/links/LinkModel";

class CompositeAttributeModel extends AttributeModel {
  _children: CompositeAttributeChildCollection;

  constructor(
    data: AttributeJSON,
    contributions: CompositeAttributeContributionsJSON
  ) {
    super(data, contributions);

    this._children = CompositeAttributeChildCollection.create(
      data,
      contributions
    );
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): Array<LinkModel> {
    return this.children.getInitialChildModelLinks();
  }

  /**
   * @override
   */
  setChildModels(models: ResolvableModels[]) {
    this.children.setChildModels(models);
  }

  /**
   * @override
   */
  get type(): string {
    // temp fix for results and given answers on list result detail panel
    if (this.key === "results" || this.key === "givenAnswers") {
      return "composite";
    }

    return this.contributions.type === "range" ? "range" : "composite";
  }

  get children(): CompositeAttributeChildCollection {
    return this._children;
  }

  set children(children: CompositeAttributeChildCollection) {
    this._children = children;
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }

  get start(): AttributeType {
    return this.children.first;
  }

  get end(): AttributeType {
    return this.children.last;
  }

  /**
   * Get input value of attribute
   */
  getInputValue(): string {
    return this.children.getInputValue();
  }

  /**
   * Constraints of a range attribute exist on it's childs
   * @returns {ConstraintCollection}
   */
  get constraintCollection(): ConstraintCollection {
    return new ConstraintCollection();
  }

  /**
   * Validate input
   */
  validate() {
    return this.children.validate();
  }

  /**
   * Indicates if attribute input is valid
   */
  get isValid(): boolean {
    return this.validate();
  }

  /**
   * Reset attribute to empty string
   */
  reset() {
    this.children.reset();
  }

  getChildByKey(key: string): AttributeType | null {
    return (
      this.children.find(child => {
        if (child.key === key) {
          return true;
        } else if (child.children) {
          return child.getChildByKey(key);
        }

        return false;
      }) || null
    );
  }

  updateChild(childAttribute: AttributeType, value: string) {
    this.children.all.forEach(child => {
      if (child.children) {
        child.updateChild(childAttribute, value);
      } else if (child.key === childAttribute.key) {
        child.update(value);
      }
    });
  }

  getValue(): any {
    const children = {};

    this.children.all.forEach(child => {
      children[child.name] = child.value;
    });

    return children;
  }

  get isResult(): boolean {
    return this._isResult;
  }

  set isResult(isResult: boolean) {
    this._isResult = isResult;

    this.children.all.forEach(child => {
      child.isResult = isResult;
    });
  }
}

export default CompositeAttributeModel;
