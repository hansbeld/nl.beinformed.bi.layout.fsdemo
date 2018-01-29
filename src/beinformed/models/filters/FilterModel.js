// @flow
import BaseModel from "beinformed/models/base/BaseModel";
import AttributeFactory from "beinformed/models/attributes/AttributeFactory";
import { PARAMETER_SEPARATOR } from "beinformed/constants/Constants";

/**
 * Base class for filters
 */
export default class FilterModel extends BaseModel {
  _attribute: AttributeType;
  _context: ContextContributionsJSON;
  _listKey: string;
  _type: string;

  /**
   * Construct a filter
   */
  constructor(data: FilterJSON, contributions: FilterContributionsJSON) {
    super(data, contributions);

    this._attribute = this.createAttribute();

    if (this.contributions.listKey) {
      this.listkey = this.contributions.listKey;
    }
  }

  /**
   * Get the type of a filter.
   */
  get type(): string {
    return this.contributions.type
      ? this.contributions.type.replace("filter", "")
      : "string";
  }

  /**
   * Create attribute through the attribute factory. Create type based on filter key without the filter suffix
   */
  createAttribute() {
    return AttributeFactory.createAttribute(
      this.type,
      this.data.name || this.data.param,
      this.data,
      {
        ...this.contributions,
        type: this.type
      }
    );
  }

  /**
   * Getting context data
   */
  get context(): ContextContributionsJSON {
    return this._context;
  }

  /**
   * Set context of filter
   */
  set context(context: ContextContributionsJSON) {
    this._context = context;

    if (this.contextLabel !== "") {
      this.attribute.label = `${this.attribute.label} (${this.contextLabel})`;
    }
  }

  /**
   * Getting the context label
   */
  get contextLabel(): string {
    return this.context.label || "";
  }

  /**
   * Getting key of the list these filters apply to
   */
  get listkey(): string {
    return this._listKey;
  }

  /**
   * Set key of list this filter belongs to
   */
  set listkey(key: string) {
    this._listKey = key;
  }

  /**
   * Getting the label of the filter
   */
  get label(): string {
    return this.contributions.label || "";
  }

  /**
   * Getting the name of the filter
   */
  get name(): string {
    if (this.listkey) {
      return this.listkey + PARAMETER_SEPARATOR + this.param;
    }

    return this.param;
  }

  /**
   * Getting the param name of the filter
   */
  get param(): string {
    return this.data.param || this.data.name;
  }

  /**
   * Get attribute of filter
   */
  get attribute(): AttributeType {
    return this._attribute;
  }

  /**
   * Retrieve the parameters with it's value for this filter
   * @return {Array.<{name: String, value: *}>}
   */
  get params(): Array<{
    name: string,
    value: string | null
  }> {
    if (!this.param) {
      throw new Error("Name of filter is undefined");
    }

    return [
      {
        name: this.param,
        value: this.attribute.value
      }
    ];
  }

  /**
   * Reset the value of this filter to undefined
   * @return {FilterModel}
   */
  reset() {
    this.attribute.reset();

    return this;
  }

  /**
   * Update this filter with input name and value
   */
  update(attribute: AttributeType, value: string) {
    if (this.attribute.children) {
      this.attribute.updateChild(attribute, value);
    } else {
      this.attribute.update(value);
    }
  }

  /**
   * Inidicates if filter is a quick search filter
   */
  isQuickSearch() {
    return this.contributions.quicksearch === true;
  }

  /**
   * Inidiates if filter is active
   */
  isActive() {
    return this.attribute.value !== null;
  }
}
