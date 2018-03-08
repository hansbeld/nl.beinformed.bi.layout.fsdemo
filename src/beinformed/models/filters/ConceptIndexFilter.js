import BaseFilterModel from "beinformed/models/filters/BaseFilterModel";

/**
 * The concept index model is a special filter used to index all first concept label letters in de modelcatalog.
 */
export default class ConceptIndexFilterModel extends BaseFilterModel<> {
  /**
   * Construct a filter
   */
  constructor(data, contributions) {
    super(data, contributions);

    if (data.options) {
      data.options.forEach(option => {
        this.attribute.options.addOption({
          code: option.key,
          label: option.key,
          selected: option.selected
        });
      });
    }
  }
}
