// @flow
import ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";
import LayoutHintCollection from "beinformed/models/layouthint/LayoutHintCollection";

type ContentConfigurationResultsTypes =
  | ContentIntermediateResultElementJSON
  | ContentDecisionResultJSON
  | ContentClassificationResultJSON
  | ContentCalculatorResultJSON;

class ContentConfigurationResults {
  _configuration: ContentConfigurationResultsTypes | null;
  _layouthint: LayoutHintCollection;

  constructor(configuration: ContentConfigurationResultsTypes) {
    this._configuration = configuration || null;

    this._layouthint = new LayoutHintCollection(configuration.layouthint);
  }

  get label(): ?string {
    if (this._configuration === null) {
      return null;
    }

    return this._configuration.label;
  }

  get description(): ?string {
    if (this._configuration === null) {
      return null;
    }

    return this._configuration.description;
  }

  get attributes(): Array<string> {
    if (this._configuration === null) {
      return [];
    }

    // An issue with mapped attributes is giving us the wrong attribute keys in the attributes property
    // as a temporary fix a layouthint with the correct mapped attribute key can be set in the configuration of the end results
    return [
      ...this._configuration.attributes,
      ...this.layouthint.all
        .filter(hint => hint.includes("attribute:"))
        .map(hint => hint.substring("attribute:".length))
    ];
  }

  getFormConfigElement(
    elementKey: string
  ): ContentConfigurationElements | null {
    if (this._configuration === null) {
      return null;
    }

    const configElement = this._configuration[elementKey];

    return new ContentConfigurationElements(configElement);
  }

  get calculatedResultElements(): ?ContentConfigurationElements {
    return this.getFormConfigElement("calculatedResultElements");
  }

  get positiveResultElements(): ?ContentConfigurationElements {
    return this.getFormConfigElement("positiveResultElements");
  }

  get negativeResultElements(): ?ContentConfigurationElements {
    return this.getFormConfigElement("negativeResultElements");
  }

  get resultElements(): ?ContentConfigurationElements {
    return this.getFormConfigElement("resultElements");
  }

  get layouthint(): LayoutHintCollection {
    return this._layouthint;
  }
}

export default ContentConfigurationResults;
