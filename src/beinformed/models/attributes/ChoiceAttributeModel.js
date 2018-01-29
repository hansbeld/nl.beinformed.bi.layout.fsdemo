// @flow
import type LinkModel from "beinformed/models/links/LinkModel";
import AttributeModel from "beinformed/models/attributes/AttributeModel";
import ChoiceAttributeOptionCollection from "beinformed/models/attributes/ChoiceAttributeOptionCollection";
import ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";
import { RENDER_SECTION_LABEL } from "beinformed/constants/LayoutHints";
import { isDependentAttributeControl } from "beinformed/models/attributes/attributeVisibilityUtil";
import { DateUtil } from "beinformed/utils/datetime/DateTimeUtil";

/**
 * Model for a choice attribute
 */
export default class ChoiceAttributeModel extends AttributeModel {
  _options: ChoiceAttributeOptionCollection;
  _referenceDate: string;

  /**
   * Constructs a choice attribute
   */
  constructor(
    attribute: AttributeJSON,
    attributeContributions: ChoiceAttributeContributionsJSON
  ) {
    super(attribute, attributeContributions);

    this._referenceDate = this.data.referenceDate || DateUtil.now();

    this._options = ChoiceAttributeOptionCollection.create(
      attribute,
      attributeContributions,
      this.referenceDate
    );
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "choice";
  }

  get isBoolean(): boolean {
    return this.contributions.type === "boolean";
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): Array<LinkModel> {
    if (this.conceptLink) {
      return [this.conceptLink, ...this.options.getInitialChildModelLinks()];
    }

    return this.options.getInitialChildModelLinks();
  }

  /**
   * @override
   */
  setChildModels(models: ResolvableModels[]) {
    this.concept = null;

    const conceptLink = this.conceptLink;
    if (conceptLink !== null) {
      const conceptModel = models.find(
        model =>
          model.type === "ConceptDetail" &&
          model.selfhref.equalsWithParameters(conceptLink.href)
      );
      if (conceptModel) {
        this.concept = conceptModel;
      }
    }

    this.options.setChildModels(models);
  }

  /**
   * Retrieve reference date of attribute which can be used as entryDate for content
   */
  get referenceDate(): string {
    return this._referenceDate;
  }

  /**
   * Set reference date for concepts and content
   */
  set referenceDate(date: string) {
    this._referenceDate = date;

    this.options.referenceDate = date;
  }

  /**
   * Retrieve available choice options
   */
  get options(): ChoiceAttributeOptionCollection {
    return this._options;
  }

  /**
   * Getting all enabled options
   */
  get selected(): string[] {
    return this.options.selected.map(option => option.code);
  }

  /**
   * Flatten options and filter out the options that are not selected
   */
  get readonlyvalue(): string {
    return this.options.selected.map(option => option.label).join(",");
  }

  /**
   * Retrieve list of selected options, joined with comma
   */
  getValue(): string | null {
    return this.options.selected.length > 0
      ? this.options.selected.map(option => option.code).join(",")
      : null;
  }

  /**
   * Get input value of attribute
   */
  getInputValue(): string {
    return this.selected.join(",");
  }

  /**
   * Setting an option selected or unselected based on the current state
   */
  toggleOption(code: string) {
    if (this.selected.includes(code)) {
      this.disableOption(code);
    } else {
      this.enableOption(code);
    }
  }

  /**
   * Enable a option
   */
  enableOption(code: string) {
    if (!this.isMultiple) {
      this.options.deselectAll();
    }

    this.options.select(code);
    this.inputvalue = this.getInputValue();
  }

  /**
   * Disable a option
   */
  disableOption(code: string) {
    this.options.deselect(code);
    this.inputvalue = this.getInputValue();
  }

  /**
   * Getting the type of choice filter. For instance checkbox, radiobutton, combobox.
   */
  get choicetype():
    | "checkbox"
    | "radiobutton"
    | "combobox"
    | "listview"
    | "table"
    | "longlist" {
    return (
      [
        "checkbox",
        "radiobutton",
        "combobox",
        "listview",
        "table",
        "longlist"
      ].find(hint => this.layouthint.has(hint)) || "checkbox"
    );
  }

  /**
   * Can multiple options be selected
   */
  get isMultiple(): boolean {
    return this.contributions.multiplechoice || this.choicetype === "checkbox";
  }

  /**
   * Check if options need to be rendered as tree
   */
  get isTree(): boolean {
    return (
      this.contributions.options &&
      typeof this.contributions.options.find(option =>
        option.hasOwnProperty("children")
      ) !== "undefined"
    );
  }

  /**
   * Reset choice attribute to unselected list
   */
  reset() {
    this.options.deselectAll();
  }

  /**
   * Update attribute by name and value
   */
  update(value: string) {
    this.updateLastModification();
    this.toggleOption(value);

    return this;
  }

  /**
   * Retrieve if attribute is a dependen attribute control which is used in the dependent question layout hint pattern.
   */
  get isDependentControl(): boolean {
    return isDependentAttributeControl(this);
  }

  /**
   * Get content configuration configured on the attribute. Only applicable for taxonomy element and knowledge codemaps,
   * content configuration for instrument questions is available on the form object
   */
  get contentConfiguration(): ContentConfigurationElements | null {
    if (
      !this.contributions.content ||
      !this.contributions.content.optionElements
    ) {
      return null;
    }

    // Add RENDER_SECTION_LABEL to all content configuration to make sure the label of a section is always rendered on taxonomy and knowlege codemaps
    const optionElementConfig = this.contributions.content.optionElements.map(
      optionElement => {
        if ("contentElement" in optionElement) {
          return {
            contentElement: {
              ...optionElement.contentElement,
              layouthint: [RENDER_SECTION_LABEL]
            }
          };
        }

        return optionElement;
      }
    );

    return new ContentConfigurationElements(optionElementConfig);
  }

  /**
   * Get placeholder text
   */
  get placeholder(): string {
    return this.contributions.placeholder || "";
  }
}
