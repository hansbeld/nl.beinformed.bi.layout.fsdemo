// @flow
import BaseFilterModel from "beinformed/models/filters/BaseFilterModel";

/**
 * Range filter, for instance a date range filter or a number range filter
 */
export default class RangeFilterModel extends BaseFilterModel<> {
  /**
   * @override
   */
  get params(): Array<{
    name: string,
    value: string | null
  }> {
    return this.attribute.children.all.map(child => {
      const param = this.data[child.name].param;
      return {
        name: param,
        value: child.value
      };
    });
  }

  /**
   * Update range attribute
   */
  update(attribute: AttributeType, inputvalue: string) {
    this.attribute.updateChild(attribute, inputvalue);
  }
}
