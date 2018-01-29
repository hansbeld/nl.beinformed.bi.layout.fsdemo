// @flow
import type LinkModel from "beinformed/models/links/LinkModel";
import ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";

/**
 * Model for attribute that get's it's allowed values from a lookup service
 */
export default class LookupAttributeModel extends ChoiceAttributeModel {
  /**
   * @overwrite
   */
  get type(): string {
    return "lookup";
  }

  /**
   * Retrieve lookup service link
   */
  get lookupLink(): LinkModel | null {
    return this.links.getLinkByKey("lookupservice");
  }

  /**
   * Add a new option to the collection of lookup options
   */
  addOption(option: OptionType) {
    if (!this.isMultiple) {
      this.options.deselectAll();
    }

    if (this.options.find(opt => opt.code === option.code) === null) {
      this.options.addOption(option);
    }
  }

  /**
   * Update attribute by name and value
   */
  update(value: string) {
    this.updateLastModification();
    if (this.options.find(option => option.code === value) === null) {
      this.addOption({
        code: value,
        label: value,
        selected: true
      });
    } else {
      this.toggleOption(value);
    }

    return this;
  }
}
