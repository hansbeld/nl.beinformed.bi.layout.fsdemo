// @flow
import ContentConfigurationQuestions from "beinformed/models/contentconfiguration/ContentConfigurationQuestions";
import ContentConfigurationResults from "beinformed/models/contentconfiguration/ContentConfigurationResults";
import ContentConfigurationEndResults from "beinformed/models/contentconfiguration/ContentConfigurationEndResults";

/**
 * Content definition for questions, results, given answers etc.
 * Mostly maps to the Instrument questions configuration of Be Informed
 */
export default class ContentConfiguration {
  _config: FormObjectContributionsContentJSON | null;

  /**
   * Construct ContentConfiguration
   */
  constructor(contentConfiguration?: FormObjectContributionsContentJSON) {
    this._config = contentConfiguration || null;
  }

  get questions(): ContentConfigurationQuestions | null {
    if (this._config === null || !this._config.questions) {
      return null;
    }

    return new ContentConfigurationQuestions(this._config.questions);
  }

  isConfiguredIntermediateResultAttribute(attributeKey: string) {
    if (this.intermediateResults === null) {
      return false;
    }

    return this.intermediateResults.attributes.includes(attributeKey);
  }

  get intermediateResults(): ContentConfigurationResults | null {
    if (this._config === null || !this._config.intermediateResults) {
      return null;
    }

    return new ContentConfigurationResults(this._config.intermediateResults);
  }

  isConfiguredEndResultAttribute(attributeKey: string) {
    if (this.endResults === null) {
      return false;
    }

    return (
      typeof this.endResults.config.find(item =>
        item.attributes.includes(attributeKey)
      ) !== "undefined"
    );
  }

  get endResults(): ContentConfigurationEndResults | null {
    if (this._config === null || !this._config.results) {
      return null;
    }

    return new ContentConfigurationEndResults(this._config.results);
  }
}
