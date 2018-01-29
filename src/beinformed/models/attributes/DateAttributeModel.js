// @flow
import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";

/**
 * Date attribute
 */
export default class DateAttributeModel extends StringAttributeModel {
  /**
   * Get initial user input value
   */
  getInitialInputValue(value: string | null) {
    return !value || value === null
      ? ""
      : DateUtil.toFormat(value, this.format);
  }

  /**
   * Set type to date
   */
  get type(): string {
    return "date";
  }

  /**
   * Returns the value as entered by the user. This can differ from the internal iso value that is stored
   * @return {string} value
   */
  getInputValue() {
    const inputvalue = this._value.inputvalue;

    return !inputvalue || inputvalue === null ? "" : inputvalue.toString();
  }

  /**
   * Get input value
   */
  get inputvalue(): string {
    return this.getInputValue();
  }

  /**
   * Sets the input value to the value entered by the user
   * @param {string} value - value as entered by the user
   */
  set inputvalue(value: string) {
    this.validate(value);

    this._value.inputvalue = value;

    this.value =
      value && value !== null && value !== ""
        ? DateUtil.toISO(value, this.format)
        : null;
  }

  /**
   * Get date format
   */
  get format(): string {
    return DateUtil.convertFormat(this.contributions.format);
  }

  get formatLabel(): string {
    return this.format;
  }

  /**
   * Retrieve readonly value, the date in the configurated format
   */
  get readonlyvalue(): string {
    if (this.value && this.value !== null) {
      return this.renderDate(this.value);
    }

    return "";
  }

  /**
   * Render date in correct format
   */
  renderDate(date: string) {
    return DateUtil.toFormat(date, this.format);
  }

  /**
   * Get minimum date
   */
  get mindate(): string | null {
    return this.contributions.mindate || null;
  }

  /**
   * Get maximum date
   */
  get maxdate(): string | null {
    return this.contributions.maxdate || null;
  }

  isValidDateFormat(value: string) {
    return DateUtil.hasFormat(value, this.format);
  }

  isExactDate(value: string) {
    if (typeof value !== "string") {
      throw new TypeError("isBetweenDates: Not comparing to string");
    }

    if (this.mindate === null) {
      throw new Error("isExactDate: Min and max date not set");
    }

    return value === this.mindate;
  }

  isBetweenDates(value: string) {
    if (typeof value !== "string") {
      throw new TypeError("isBetweenDates: Not comparing to string");
    }

    if (this.mindate === null || this.maxdate === null) {
      throw new Error("isBetweenDate: Min or max date not set");
    }

    return (
      this.isSameOrAfterMinDate(value) && this.isSameOrBeforeMaxDate(value)
    );
  }

  isSameOrAfterMinDate(value: string) {
    if (typeof value !== "string") {
      throw new TypeError("isSameOrAfterMinDate: Not comparing to string");
    }

    if (this.mindate === null) {
      throw new Error("isSameOrAfterMinDate: Min date not set");
    }

    return (
      this.mindate === null ||
      DateUtil.isSameOrAfter(value, this.mindate, this.format)
    );
  }

  isSameOrBeforeMaxDate(value: string) {
    if (typeof value !== "string") {
      throw new TypeError("isSameOrBeforeMaxDate: Not comparing to string");
    }

    if (this.maxdate === null) {
      throw new Error("isSameOrBeforeMaxDate: Max date not set");
    }

    return (
      this.maxdate === null ||
      DateUtil.isSameOrBefore(value, this.maxdate, this.format)
    );
  }

  /**
   * Add Date constraints for attribute
   */
  addConstraints() {
    const constraints = new ConstraintCollection();

    const mindate = this.mindate;
    const maxdate = this.maxdate;

    constraints.addConstraint(
      "Constraint.Date.InvalidFormat",
      this.isValidDateFormat.bind(this),
      { format: this.formatLabel, value: this.inputvalue }
    );

    if (mindate !== null && maxdate !== null && this.mindate === this.maxdate) {
      constraints.addConstraint(
        "Constraint.Date.InexactDate",
        this.isExactDate.bind(this),
        { date: this.renderDate(mindate) }
      );
    } else if (mindate !== null && maxdate !== null) {
      constraints.addConstraint(
        "Constraint.Date.OutOfRange",
        this.isBetweenDates.bind(this),
        {
          "min-date": this.renderDate(mindate),
          "max-date": this.renderDate(maxdate),
          value: this.inputvalue
        }
      );
    } else if (mindate !== null) {
      constraints.addConstraint(
        "Constraint.Date.BelowMinimum",
        this.isSameOrAfterMinDate.bind(this),
        { "min-date": this.renderDate(mindate), value: this.inputvalue }
      );
    } else if (maxdate !== null) {
      constraints.addConstraint(
        "Constraint.Date.AboveMaximum",
        this.isSameOrBeforeMaxDate.bind(this),
        { "max-date": this.renderDate(maxdate), value: this.inputvalue }
      );
    }

    return constraints;
  }
}
