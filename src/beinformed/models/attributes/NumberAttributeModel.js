// @flow
import { get } from "lodash";

import AttributeModel from "beinformed/models/attributes/AttributeModel";
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";

import DecimalFormat from "beinformed/utils/number/DecimalFormat";

/**
 * Number attribute
 */
export default class NumberAttributeModel extends AttributeModel<
  NumberAttributeContributionsJSON
> {
  /**
   * @overwrite
   */
  get type(): string {
    return "number";
  }

  /**
   * Get initial value
   */
  getInitialInputValue(value: string | null) {
    if (typeof value === "undefined" || value === null) {
      return "";
    }

    return value.toString();
  }

  /**
   * Get grouping separator
   */
  get groupingSeparator(): string {
    return this.contributions.groupingSeparator || "";
  }

  /**
   * Get decimal separator
   */
  get decimalSeparator(): string {
    return this.contributions.decimalSeparator || "";
  }

  /**
   * Get minimum value
   */
  get minValue(): ?number {
    return this.contributions.minimum;
  }

  /**
   * Get maximum value
   */
  get maxValue(): ?number {
    return this.contributions.maximum;
  }

  /**
   * Gets the maximum digits based on the format
   */
  get maxDigits(): number {
    return this.format && this.format.includes(".")
      ? this.format.split(".")[1].length
      : 0;
  }

  /**
   * Get postfix text
   */
  get postfix(): string {
    return get(this.contributions, "postfix", "");
  }

  /**
   * Parses input into a number, removes the grouping separator from the input and
   * replaces the decimapseparator with a dot to make it a JavaScript parseable number
   */
  parseToNumber(input: string | number | null) {
    if (typeof input === "undefined" || input === null || input === "") {
      return NaN;
    }

    const parsedNumber =
      this.decimalSeparator === ""
        ? input.toString()
        : input.toString().replace(this.decimalSeparator, ".");

    return Number(parsedNumber);
  }

  isInteger(value: string) {
    const number = this.parseToNumber(value);
    return Number.isInteger(number);
  }

  isValidDecimal(value: string) {
    const number = this.parseToNumber(value);
    if (isNaN(number)) {
      return false;
    }

    const numberOfDigits =
      Math.floor(number) === number
        ? 0
        : number.toString().split(".")[1].length || 0;

    return (
      !isNaN(parseFloat(number)) &&
      isFinite(number) &&
      numberOfDigits <= this.maxDigits
    );
  }

  isExactNumber(value: string) {
    return this.parseToNumber(value) === this.minValue;
  }

  isSameOrAboveMinNumber(value: string) {
    const parsedNumber = this.parseToNumber(value);

    return this.minValue && parsedNumber >= this.minValue;
  }

  isSameOrBelowMaxNumber(value: string) {
    const parsedNumber = this.parseToNumber(value);
    return this.maxValue && parsedNumber <= this.maxValue;
  }

  isBetweenNumbers(value: string) {
    return (
      this.isSameOrAboveMinNumber(value) && this.isSameOrBelowMaxNumber(value)
    );
  }

  /**
   * Add number constraints
   */
  addConstraints() {
    const constraints = new ConstraintCollection();

    const minValue = this.minValue;
    const maxValue = this.maxValue;

    if (this.maxDigits === 0) {
      constraints.addConstraint(
        "Constraint.Number.InvalidInteger",
        this.isInteger.bind(this),
        { value: this.inputvalue }
      );
    } else {
      constraints.addConstraint(
        "Constraint.Number.InvalidDecimal",
        this.isValidDecimal.bind(this),
        { "max-digits": this.maxDigits, value: this.inputvalue }
      );
    }

    if (minValue && maxValue && minValue === maxValue) {
      constraints.addConstraint(
        "Constraint.Number.InexactNumber",
        this.isExactNumber.bind(this),
        { number: this.formatValue(minValue) }
      );
    } else if (minValue && maxValue) {
      constraints.addConstraint(
        "Constraint.Number.OutOfRange",
        this.isBetweenNumbers.bind(this),
        {
          "min-number": this.formatValue(minValue),
          "max-number": this.formatValue(maxValue),
          value: this.inputvalue
        }
      );
    } else if (minValue) {
      constraints.addConstraint(
        "Constraint.Number.BelowMinimum",
        this.isSameOrAboveMinNumber.bind(this),
        { "min-value": this.formatValue(minValue), value: this.inputvalue }
      );
    } else if (maxValue) {
      constraints.addConstraint(
        "Constraint.Number.AboveMaximum",
        this.isSameOrBelowMaxNumber.bind(this),
        { "max-value": this.formatValue(maxValue), value: this.inputvalue }
      );
    }

    return constraints;
  }

  /**
   * Reset attribute to empty string
   */
  reset() {
    this.inputvalue = "";
  }

  formatValue(value: string | number | null): string {
    if (this.format !== null) {
      return new DecimalFormat(this.format).format(value);
    }

    if (value) {
      return value.toString();
    }

    return "";
  }

  get readonlyvalue(): string {
    return this.formatValue(this.value);
  }

  /**
   * Returns the value as entered by the user. This can differ from the internal iso value that is stored
   */
  get inputvalue(): string {
    return this.getInputValue();
  }

  /**
   * Sets the input value to the value entered by the user
   */
  set inputvalue(value: string) {
    this._value.inputvalue = value;
    this.validate(value);

    const outputNumber = this.parseToNumber(value);
    this.value = isNaN(outputNumber) ? null : outputNumber.toString();
  }

  /**
   * Getting the value of the attribute
   */
  getValue(): number | null {
    const value = this._value.value;

    return typeof value === "undefined" || value === null || value === ""
      ? null
      : Number(value);
  }

  /**
   * Update the attribute by name and value
   */
  update(value: string) {
    this.updateLastModification();
    this.inputvalue = value;

    return this;
  }
}
