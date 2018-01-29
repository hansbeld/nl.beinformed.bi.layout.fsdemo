// @flow
import { TimestampUtil } from "beinformed/utils/datetime/DateTimeUtil";
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";

/**
 * Timestamp attribute
 */
export default class TimestampAttributeModel extends StringAttributeModel {
  _format: string;

  /**
   * Get initial value
   */
  getInitialInputValue(value: string | null) {
    return !value || value === null
      ? ""
      : TimestampUtil.toFormat(value, this.format);
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "timestamp";
  }

  /**
   * Get date format
   */
  get format(): string {
    return TimestampUtil.convertFormat(this.contributions.format);
  }

  /**
   * Set the value of the attribute
   */
  set inputvalue(value: string) {
    if (value && value !== "") {
      if (this.validate(value)) {
        this.value = TimestampUtil.toISO(value, this.format);
      }
    } else {
      this.value = null;
    }

    this._value = {
      ...this._value,
      inputvalue: value
    };
  }

  /**
   * Get input value
   * @return {string}
   */
  getInputValue() {
    const inputvalue = this._value.inputvalue;

    return !inputvalue || inputvalue === null ? "" : inputvalue.toString();
  }

  /**
   * Get inputvalue
   */
  get inputvalue(): string {
    return this.getInputValue();
  }

  /**
   * Retrieve readonly value, the date in the configurated format
   */
  get readonlyvalue(): string {
    if (this.value && this.value !== null) {
      return this.renderTimestamp(this.value);
    }

    return "";
  }

  /**
   * Render date in correct format
   */
  renderTimestamp(date: string) {
    return TimestampUtil.toFormat(date, this.format);
  }

  isTimestamp(value: string) {
    return TimestampUtil.hasFormat(value, this.format);
  }

  /**
   * Add time constraints
   */
  addConstraints() {
    const constraints = new ConstraintCollection();

    constraints.addConstraint(
      "Constraint.Timestamp.InvalidFormat",
      this.isTimestamp.bind(this),
      { format: this.format, value: this.inputvalue }
    );

    return constraints;
  }
}
