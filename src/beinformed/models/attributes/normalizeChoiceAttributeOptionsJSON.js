// @flow
/**
 * Retrieve boolean options, true and false
 */
const getBooleanOptions = () => [
  {
    code: "true",
    label: "Yes",
    isBooleanType: true
  },
  {
    code: "false",
    label: "No",
    isBooleanType: true
  }
];

/**
 * Get options from dynamicschema
 */
const getOptionsFromDynamicSchema = data => data.dynamicschema;

/**
 * Get options from combination of service and contributions
 * Contributions contain available options, service contains selected options
 */
const getOptionsFromContributions = (data, contributions) => {
  const options = data.options || [];
  const optionsContributions = contributions.options || [];

  if (options.length === 0 && optionsContributions.length === 0) {
    return [];
  }

  return optionsContributions.map(contribution => {
    const optionData = options.find(
      opt =>
        (opt.hasOwnProperty("code") && opt.code === contribution.code) ||
        opt.key === contribution.key
    );
    const mergedOption = Object.assign({}, optionData, contribution);

    if (mergedOption.hasOwnProperty("key")) {
      mergedOption.code = mergedOption.key;
      delete mergedOption.key;
      delete mergedOption.selected;
    }

    return mergedOption;
  });
};

/**
 * Retrieve array of selected options, in case of a filter these are the selected options, else it is the value of the property.
 */
const getSelected = (data): string[] => {
  if (data.hasOwnProperty("value") && Array.isArray(data.value)) {
    return data.value;
  } else if (data.value) {
    return [data.value];
  }

  if (data.hasOwnProperty("options")) {
    return data.options
      .filter(
        option => option.hasOwnProperty("selected") && option.selected === true
      )
      .map(option => option.key);
  }

  return [];
};

/**
 * Retrieve available choice options
 */
const getOptions = (data, contributions): OptionType[] => {
  if (contributions.type === "boolean") {
    return getBooleanOptions();
  }

  if (data.dynamicschema) {
    return getOptionsFromDynamicSchema(data);
  }

  return getOptionsFromContributions(data, contributions);
};

/**
 * Recursevily retrieve options list or tree
 */
const setSelectedOptions = (options: OptionType[], selected) =>
  options.map(option => {
    const optionChildren = option.children
      ? setSelectedOptions(option.children, selected)
      : null;

    const newOption = {
      selected: selected.includes(option.code),
      children: optionChildren
    };

    return Object.assign({}, option, newOption);
  });

/**
 * Normalize various json formats for choice and choice like attributes into one consistent structure.
 *
 * Filter contributions:
 * {
 *  options: [
 *    {
 *      "key": "Hardcover",
 *      "label": "Hardcover"
 *    }
 *
 * Form from dynamicschema:
 * "element": [
 *  {
 *    "elementid": "Person",
 *      "dynamicschema": [
 *        {
 *          "code": "1",
 *          "label": "Stephen King"
 *        }
 *
 * Form from contributions:
 * {
 *  "options": [
 *    {
 *      "code": "Hardcover",
 *      "label": "Hardcover"
 *    },
 */
const normalizeChoiceAttributeOptionsJSON = (
  data: any = {},
  contributions: any = []
): OptionType[] => {
  const options = getOptions(data, contributions);

  const selected = getSelected(data);

  return setSelectedOptions(options, selected);
};

export default normalizeChoiceAttributeOptionsJSON;
