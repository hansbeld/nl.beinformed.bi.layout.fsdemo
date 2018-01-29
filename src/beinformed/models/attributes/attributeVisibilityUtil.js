// @flow
import type AttributeCollection from "beinformed/models/attributes/AttributeCollection";
import {
  DEPENDENT_INPUT_CONTROL,
  DEPENDENT_INPUT_ACTION_SHOW,
  DEPENDENT_INPUT_ACTION_HIDE,
  DEPENDENT_INPUT_OPERATOR_EQUALS,
  DEPENDENT_INPUT_OPERATOR_INCLUDES,
  DEPENDENT_INPUT_OPERATOR_NOT_EQUALS,
  DEPENDENT_INPUT_OPERATOR_NOT_INCLUDES,
  DEPENDENT_INPUT_OPTIONS_SEPARATOR
} from "beinformed/constants/LayoutHints";

/**
 * Retrieve dependent attribute formatted layout hint
 */
const getDependentAttributeHint = (attribute: AttributeType) =>
  attribute.layouthint.find(
    hint =>
      hint.includes(
        `${DEPENDENT_INPUT_ACTION_SHOW} when ${DEPENDENT_INPUT_CONTROL}`
      ) ||
      hint.includes(
        `${DEPENDENT_INPUT_ACTION_HIDE} when ${DEPENDENT_INPUT_CONTROL}`
      )
  ) || null;

/**
 * Check if an attribute is an attribute that acts as control element for the dependent attributes
 */
const isDependentAttributeControl = (attribute: AttributeType) =>
  attribute.layouthint.has(DEPENDENT_INPUT_CONTROL);

/**
 * Parse the dependent attribute layout hint for use in other methods
 */
const parseDependentHint = hint => {
  if (hint === null) {
    throw new Error("Cannot parse hint that is null");
  }

  /*
   * regex being constructed:
   * pattern = /(show|hide) when dependent-control:\s(.*)(\s(equals|includes|notEquals|notIncludes)\s)(.*)/gi;
   */

  const ACTIONS = `${DEPENDENT_INPUT_ACTION_SHOW}|${DEPENDENT_INPUT_ACTION_HIDE}`;
  const OPERATORS = `${DEPENDENT_INPUT_OPERATOR_EQUALS}|${DEPENDENT_INPUT_OPERATOR_INCLUDES}|${DEPENDENT_INPUT_OPERATOR_NOT_EQUALS}|${DEPENDENT_INPUT_OPERATOR_NOT_INCLUDES}`;
  const pattern = `(${ACTIONS}) when ${DEPENDENT_INPUT_CONTROL}:\\s(.*)(\\s(${OPERATORS})\\s)(.*)`;

  const result = hint.match(new RegExp(pattern));

  if (result) {
    const ACTION_POSITION = 1;
    const CONTROL_POSITION = 2;
    const OPERATOR_POSITION = 4;
    const OPTIONS_POSITION = 5;

    return {
      action: result[ACTION_POSITION],
      control: result[CONTROL_POSITION],
      operator: result[OPERATOR_POSITION],
      options: result[OPTIONS_POSITION].split(DEPENDENT_INPUT_OPTIONS_SEPARATOR)
    };
  }

  throw new Error(`No dependent information found on layouthint: ${hint}`);
};

/**
 * Retrieve if depending control is enabled for a dependent attribute
 */
const hasOtherDependentAttribute = (
  attributes: AttributeCollection,
  attribute: AttributeType
) => {
  const dependentAttributeHint = getDependentAttributeHint(attribute);
  const hint = parseDependentHint(dependentAttributeHint);

  const controlAttribute = attributes.getDependentChoiceAttribute(hint.control);

  // control attribute does not exist
  if (controlAttribute === null) {
    return true;
  }

  if (!isVisibleAttribute(attributes, controlAttribute)) {
    return false;
  }

  /**
   * Retrieve controls that have the hint 'control equals option'
   */
  const dependentControlEqualsOptions = (hintOptions = []) =>
    hintOptions.every(
      option =>
        controlAttribute.selected &&
        Array.isArray(controlAttribute.selected) &&
        controlAttribute.selected.includes(option)
    );

  /**
   * Retrieve controls that have the hint 'control includes option'
   */
  const dependentControlIncludesOptions = (hintOptions = []) =>
    typeof hintOptions.find(option =>
      controlAttribute.selected.includes(option)
    ) !== "undefined";

  const actions = {
    [`${DEPENDENT_INPUT_ACTION_SHOW}#${DEPENDENT_INPUT_OPERATOR_EQUALS}`]: dependentControlEqualsOptions(
      hint.options
    ),
    [`${DEPENDENT_INPUT_ACTION_SHOW}#${DEPENDENT_INPUT_OPERATOR_INCLUDES}`]: dependentControlIncludesOptions(
      hint.options
    ),
    [`${DEPENDENT_INPUT_ACTION_SHOW}#${DEPENDENT_INPUT_OPERATOR_NOT_EQUALS}`]: !dependentControlEqualsOptions(
      hint.options
    ),
    [`${DEPENDENT_INPUT_ACTION_SHOW}#${DEPENDENT_INPUT_OPERATOR_NOT_INCLUDES}`]: !dependentControlIncludesOptions(
      hint.options
    ),
    [`${DEPENDENT_INPUT_ACTION_HIDE}#${DEPENDENT_INPUT_OPERATOR_EQUALS}`]: !dependentControlEqualsOptions(
      hint.options
    ),
    [`${DEPENDENT_INPUT_ACTION_HIDE}#${DEPENDENT_INPUT_OPERATOR_INCLUDES}`]: !dependentControlIncludesOptions(
      hint.options
    ),
    [`${DEPENDENT_INPUT_ACTION_HIDE}#${DEPENDENT_INPUT_OPERATOR_NOT_EQUALS}`]: dependentControlEqualsOptions(
      hint.options
    ),
    [`${DEPENDENT_INPUT_ACTION_HIDE}#${DEPENDENT_INPUT_OPERATOR_NOT_INCLUDES}`]: dependentControlIncludesOptions(
      hint.options
    )
  };

  return actions.hasOwnProperty(`${hint.action}#${hint.operator}`)
    ? actions[`${hint.action}#${hint.operator}`]
    : false;
};

/**
 * Checks if an attribute should be visible based on layout hints
 */
const isVisibleAttribute = (
  attributes: AttributeCollection,
  attribute: AttributeType
) => {
  // if attribute is explicitly hidden and has no value, then hide attribute
  if (attribute.isHidden && attribute.value === null) {
    return false;
  }

  // check if other attributes depend on this attribute
  if (attribute.isDependentAttribute) {
    return hasOtherDependentAttribute(attributes, attribute);
  }

  return true;
};

export {
  getDependentAttributeHint,
  isDependentAttributeControl,
  isVisibleAttribute
};
