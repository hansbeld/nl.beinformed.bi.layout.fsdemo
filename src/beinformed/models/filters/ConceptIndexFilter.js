import FilterModel from "beinformed/models/filters/FilterModel";

/**
 * The concept index model is a special filter used to index all first concept label letters in de modelcatalog.
 */
export default class ConceptIndexFilterModel extends FilterModel {
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
