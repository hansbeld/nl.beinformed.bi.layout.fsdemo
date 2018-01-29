// @flow
import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";

/**
 * XML attribute
 */
export default class XMLAttributeModel extends StringAttributeModel {
  /**
   * @overwrite
   */
  get type(): string {
    return "xml";
  }

  /**
   * Retrieve number of rows to render
   */
  get rows(): number {
    const DEFAULT_ROWS_TO_RENDER = 10;
    return DEFAULT_ROWS_TO_RENDER;
  }

  isValidXML(value: string) {
    const oParser = new DOMParser();

    try {
      const oDom = oParser.parseFromString(value, "text/xml");

      if (oDom.getElementsByTagName("parsererror").length > 0) {
        return false;
      }
    } catch (err) {
      return false;
    }

    return true;
  }

  /**
   * Add constraints
   */
  addConstraints() {
    const constraints = new ConstraintCollection();

    constraints.addConstraint(
      "Constraint.XML.InvalidFormat",
      this.isValidXML.bind(this)
    );

    return constraints;
  }
}
