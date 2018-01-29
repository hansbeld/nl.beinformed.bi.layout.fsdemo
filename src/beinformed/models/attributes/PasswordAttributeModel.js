// @flow
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";

/**
 * Password attribute
 */
export default class PasswordAttributeModel extends StringAttributeModel {
  _confirmValue: string;
  _isConfirmPassword: boolean;

  /**
   * @overwrite
   */
  get type(): string {
    return "password";
  }

  /**
   * Update the attribute by name and value
   */
  update(value: string) {
    this.updateLastModification();
    this.inputvalue = value;

    return this;
  }

  get constraints(): Object {
    return this.contributions.constraints || {};
  }

  get hasConstraints(): boolean {
    return typeof this.contributions.constraints !== "undefined";
  }

  get upperAndLowerCaseMandatory(): boolean {
    return this.constraints.upperAndLowerCaseMandatory;
  }

  get maxSequenceOfIdenticalCharacters(): number {
    return this.constraints.maxSequenceOfIdenticalCharacters;
  }

  get maxSequenceOfUsernameCharacters(): number {
    return this.constraints.maxSequenceOfUsernameCharacters;
  }

  get minNumberOfNumericCharacters(): number {
    return this.constraints.minNumberOfNumericCharacters;
  }

  get minNumberOfSpecialCharacters(): number {
    return this.constraints.minNumberOfSpecialCharacters;
  }

  get regexConstraints(): Array<{
    regex: string,
    messageKey: string
  }> {
    return this.constraints.regexConstraint;
  }

  hasUpperAndLowerCharacters(value: string) {
    return /[a-z]/.test(value) && /[A-Z]/.test(value);
  }

  hasNoSequenceOfIdenticalCharacters(value: string) {
    return (
      typeof value
        .split("")
        .filter((char, i) => value.indexOf(char) === i)
        .find(char => {
          const sequence = char.repeat(
            this.maxSequenceOfIdenticalCharacters + 1
          );
          return value.includes(sequence);
        }) === "undefined"
    );
  }

  hasMinNumberOfNumbericCharacters(value: string): boolean {
    return (
      value.replace(/[^\d]/g, "").length >= this.minNumberOfNumericCharacters
    );
  }

  hasMinNumberOfSpecialCharacters(value: string): boolean {
    return (
      value.replace(/[a-z\d]/gi, "").length >= this.minNumberOfSpecialCharacters
    );
  }

  get isConfirmPassword(): boolean {
    return this._isConfirmPassword || false;
  }

  set isConfirmPassword(isConfirmPassword: boolean) {
    this._isConfirmPassword = isConfirmPassword;
  }

  get confirmValue(): string {
    return this._confirmValue || "";
  }

  set confirmValue(confirmValue: string) {
    this._confirmValue = confirmValue;

    this.validate(this.inputvalue);
  }

  confirmPassword(value: string) {
    return value === this.confirmValue;
  }

  get otherLabel(): string {
    return this._otherLabel;
  }

  set otherLabel(otherLabel: string) {
    this._otherLabel = otherLabel;
  }

  /**
   * Add password constraints
   */
  addConstraints() {
    const constraints = new ConstraintCollection();

    if (this.upperAndLowerCaseMandatory) {
      constraints.addConstraint(
        "Constraint.Password.LowerAndUpperCaseMandatory",
        this.hasUpperAndLowerCharacters.bind(this),
        { value: this.inputvalue }
      );
    }

    if (this.maxSequenceOfIdenticalCharacters) {
      constraints.addConstraint(
        "Constraint.Password.ThreeConsecutiveCharactersNotAllowed",
        this.hasNoSequenceOfIdenticalCharacters.bind(this),
        {
          value: this.inputvalue,
          "max-sequence": this.maxSequenceOfIdenticalCharacters
        }
      );
    }

    if (this.minNumberOfNumericCharacters) {
      constraints.addConstraint(
        "Constraint.Password.MinNumericCharactersMandatory",
        this.hasMinNumberOfNumbericCharacters.bind(this),
        {
          value: this.inputvalue,
          "min-numeric": this.minNumberOfNumericCharacters
        }
      );
    }

    if (this.minNumberOfSpecialCharacters) {
      constraints.addConstraint(
        "Constraint.Password.MinSpecialCharactersMandatory",
        this.hasMinNumberOfSpecialCharacters.bind(this),
        {
          value: this.inputvalue,
          "min-special": this.minNumberOfSpecialCharacters
        }
      );
    }

    if (this.regexConstraints && this.regexConstraints.length > 0) {
      this.regexConstraints.forEach(regexConstraint => {
        constraints.addConstraint(
          regexConstraint.messageKey,
          value => new RegExp(`${regexConstraint.regex}`).test(value),
          {
            value: this.inputvalue,
            regex: regexConstraint.regex
          }
        );
      });
    }

    if (this.layouthint.has("confirm-password")) {
      constraints.addConstraint(
        "Constraint.Password.ConfirmMismatch",
        this.confirmPassword.bind(this),
        {
          other: this.otherLabel
        }
      );
    }

    return constraints;
  }

  /**
   * Retrieve applicable constraint for this attribute
   */
  get constraintCollection(): ConstraintCollection {
    if (this.isConfirmPassword) {
      const constraints = new ConstraintCollection();

      constraints.addConstraint(
        "Constraint.Password.ConfirmMismatch",
        this.confirmPassword.bind(this),
        {
          other: this.otherLabel
        }
      );

      return constraints;
    }

    return super.constraintCollection;
  }

  /**
   * Validate input
   */
  validate(value: string) {
    if (this.isOptionalAndEmpty(value)) {
      this._isValid = true;
    } else if (this._validatedValue !== `${this.confirmValue}-${value}`) {
      this._isValid = this.constraintCollection.validate(value);
      this._validatedValue = `${this.confirmValue}-${value}`;
    }

    return this._isValid;
  }
}
