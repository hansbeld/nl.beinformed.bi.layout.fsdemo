// @flow
import {
  PARAMETER_SEPARATOR,
  UI_PARAMETERS
} from "beinformed/constants/Constants";

/**
 * Querystring parameter
 */
class Parameter {
  _prefix: string | null;
  _name: string;
  _value: string;
  _isModUIParameter: boolean;

  /**
   * constructor
   */
  constructor(prefix: string | null, name: string, value: string) {
    this._prefix = prefix;
    this._name = name;
    this._value = value;
    this._isModUIParameter = !UI_PARAMETERS.includes(name);
  }

  /**
   * Getting prefix
   */
  get prefix(): string | null {
    return this._prefix;
  }

  /**
   * Getting name
   */
  get name(): string {
    return this._name;
  }

  /**
   * Getting value
   */
  get value(): string {
    return this._value;
  }

  /**
   * Create parameter from string input
   */
  static fromString(parameter: string): Parameter | null {
    if (
      !parameter ||
      parameter === null ||
      parameter === "null" ||
      parameter === ""
    ) {
      return null;
    }

    // parameter has the structure prefix~name=value
    const regex = new RegExp(`(.*${PARAMETER_SEPARATOR})?(.*)=(.*)`);
    const param = decodeURIComponent(parameter).match(regex);

    if (param) {
      const prefix = param[1]
        ? param[1].replace(PARAMETER_SEPARATOR, "")
        : null;

      const PARAM_NAME = 2;
      const PARAM_VALUE = 3;
      return new Parameter(prefix, param[PARAM_NAME], param[PARAM_VALUE]);
    }

    return null;
  }

  /**
   * Convert parameter to string
   */
  toString(withPrefix: boolean = true): string {
    if (!this.name) {
      return "";
    }
    const value = this.value === null || !this.value ? "" : this.value;

    return withPrefix && this.prefix
      ? `${this.prefix}${PARAMETER_SEPARATOR}${this.name}=${value}`
      : `${this.name}=${value}`;
  }

  /**
   * Indicates if parameter can be send to the Be Informed modular UI
   */
  get isModUIParameter(): boolean {
    return this._isModUIParameter;
  }
}

export default Parameter;
