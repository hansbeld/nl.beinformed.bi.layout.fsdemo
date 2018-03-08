// @flow
import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";
import ResourceCollection from "beinformed/models/base/ResourceCollection";
import ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";

/**
 * Collection of choice attribute options
 */
class ChoiceAttributeOptionCollection extends ResourceCollection<
  ChoiceAttributeOptionModel
> {
  static create(
    data: AttributeJSON,
    contributions: ChoiceAttributeContributionsJSON,
    referenceDate: string = DateUtil.now()
  ): ChoiceAttributeOptionCollection {
    if (!data && !contributions) {
      return new ChoiceAttributeOptionCollection();
    }

    if (contributions && contributions.type === "boolean") {
      const isSelectedValue =
        data.value === null || typeof data.value === "undefined"
          ? null
          : data.value.toString() === "true";

      return ChoiceAttributeOptionCollection.createWithBooleanOptions(
        isSelectedValue,
        referenceDate
      );
    }

    if (data.dynamicschema) {
      return ChoiceAttributeOptionCollection.createFromDynamicSchema(
        data,
        contributions,
        referenceDate
      );
    }

    if (data && contributions) {
      return ChoiceAttributeOptionCollection.createFromOptions(
        data,
        contributions,
        referenceDate
      );
    }

    return new ChoiceAttributeOptionCollection();
  }

  static createWithBooleanOptions(
    isSelected: ?boolean,
    referenceDate: ?string
  ) {
    const collection = new ChoiceAttributeOptionCollection();

    collection.addOption(
      {
        code: "true",
        label: "Yes",
        isBooleanType: true,
        selected: isSelected
      },
      referenceDate
    );

    collection.addOption(
      {
        code: "false",
        label: "No",
        isBooleanType: true,
        selected: isSelected === null ? null : !isSelected
      },
      referenceDate
    );

    return collection;
  }

  static createFromDynamicSchema(
    data: AttributeJSON,
    contributions: ChoiceAttributeContributionsJSON,
    referenceDate: string
  ) {
    const collection = new ChoiceAttributeOptionCollection();

    if (Array.isArray(data.dynamicschema)) {
      data.dynamicschema.forEach(option => {
        collection.addOption(
          {
            code: option.code,
            label: option.label,
            selected: Array.isArray(data.value)
              ? data.value.includes(option.code)
              : data.value === option.code,
            _links: option._links,
            children: option.children
          },
          referenceDate
        );
      });
    }

    return collection;
  }

  static getCount(data: AttributeJSON, key?: string = "") {
    if (Array.isArray(data.options)) {
      const foundOption = data.options.find(option => option.key === key);
      if (foundOption) {
        return foundOption.count;
      }
    }

    return null;
  }

  static createFromOptions(
    data: AttributeJSON,
    contributions: ChoiceAttributeContributionsJSON,
    referenceDate: string
  ) {
    const collection = new ChoiceAttributeOptionCollection();

    if (contributions.options && Array.isArray(contributions.options)) {
      const selectedOptions = [];

      if (Array.isArray(data.options)) {
        selectedOptions.push(
          ...data.options
            .filter(option => option.selected)
            .map(option => option.key)
        );
      } else if (Array.isArray(data.value)) {
        selectedOptions.push(...data.value);
      } else {
        selectedOptions.push(data.value);
      }

      contributions.options.forEach(option => {
        const optionKey = option.key || option.code;

        collection.addOption(
          {
            code: optionKey,
            label: option.label,
            selected: selectedOptions.includes(optionKey),
            count: ChoiceAttributeOptionCollection.getCount(data, optionKey),
            _links: option._links,
            children: option.children
              ? option.children.map(child => ({
                  ...child,
                  selected: selectedOptions.includes(child.code),
                  count: ChoiceAttributeOptionCollection.getCount(
                    data,
                    child.key || child.code
                  )
                }))
              : void 0
          },
          referenceDate
        );
      });
    }

    return collection;
  }

  /**
   * Add a choice attribute option based on json data structure
   */
  addOption(option: OptionType, referenceDate: string = DateUtil.now()) {
    const optionModel = new ChoiceAttributeOptionModel(option, referenceDate);

    this.add(optionModel);
  }

  /**
   * Get all options that have selected property true
   */
  get selected(): ChoiceAttributeOptionModel[] {
    const selectedOptions = [];

    this.collection.forEach(option => {
      if (option.selected && option.selected === true) {
        selectedOptions.push(option);
      }

      if (option.children) {
        selectedOptions.push(...option.children.selected);
      }
    });

    return selectedOptions;
  }

  /**
   * Deselect all options
   */
  deselectAll() {
    this.collection = this.collection.map(option => {
      const newOption = option.clone();

      newOption.selected = false;

      if (newOption.children) {
        newOption.children.deselectAll();
      }

      return newOption;
    });
  }

  /**
   * Select an option by it's code
   */
  select(optionCode: string) {
    return this.toggle(optionCode, "select");
  }

  /**
   * Deselect an option by it's code
   */
  deselect(optionCode: string) {
    return this.toggle(optionCode, "deselect");
  }

  /**
   * Toggle an option by it's code
   */
  toggle(optionCode: string, action: "select" | "deselect") {
    this.collection = this.collection.map(option => {
      const newOption = option.clone();

      if (newOption.code === optionCode) {
        newOption.selected = action === "select";
      } else if (newOption.children) {
        newOption.children.toggle(optionCode, action);
      }

      return newOption;
    });
  }

  set referenceDate(date: string) {
    const collection = this.collection;

    collection.map(option => {
      option.referenceDate = date;

      if (option.children) {
        option.children.referenceDate = date;
      }

      return option;
    });

    this.collection = collection;
  }
}

export default ChoiceAttributeOptionCollection;
