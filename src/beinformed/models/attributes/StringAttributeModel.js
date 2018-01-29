// @flow
import AttributeModel from "beinformed/models/attributes/AttributeModel";
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";

/**
 * String attribute
 */
export default class StringAttributeModel extends AttributeModel {
  _placeholder: string;

  constructor(
    attribute: AttributeJSON,
    attributeContributions: AttributeContributionsJSON
  ) {
    super(attribute, attributeContributions);

    this._placeholder = this.contributions.placeholder || "";
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "string";
  }

  /**
   * Get Regexp pattern
   */
  get regexp(): string | null {
    return this.contributions.regexp || null;
  }

  get regexpvalidationmessage(): string | null {
    return this.contributions.regexpvalidationmessage || null;
  }

  /**
   * Get postfix text
   */
  get postfix(): string {
    return this.contributions.postfix || "";
  }

  /**
   * Get prefix text
   */
  get prefix(): string {
    return this.contributions.prefix || "";
  }

  /**
   * Get placeholder text
   */
  get placeholder(): string {
    return this._placeholder;
  }

  /**
   * Set placeholder text
   */
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
  }

  matchesRegExp(value: string) {
    return this.regexp && new RegExp(`${this.regexp}`, "gi").test(value);
  }

  /**
   * Add regex constraints
   */
  addConstraints() {
    const constraints = new ConstraintCollection();

    if (typeof this.regexp === "string") {
      if (this.layouthint.has("zipcode")) {
        constraints.addConstraint(
          "Constraint.ZipCode.InvalidFormat",
          this.matchesRegExp.bind(this),
          { value: this.inputvalue }
        );
      } else if (this.layouthint.has("email")) {
        constraints.addConstraint(
          "Constraint.Email.InvalidFormat",
          this.matchesRegExp.bind(this),
          { value: this.inputvalue }
        );
      } else {
        constraints.addConstraint(
          "Constraint.String.InvalidRegex",
          this.matchesRegExp.bind(this),
          { regexp: this.regexp, value: this.inputvalue }
        );
      }
    }

    return constraints;
  }

  /**
   * Reset attribute to empty string
   */
  reset() {
    this.inputvalue = "";
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
