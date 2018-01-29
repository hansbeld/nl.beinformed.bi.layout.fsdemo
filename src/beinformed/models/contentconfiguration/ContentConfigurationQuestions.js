// @flow
import ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

class ContentConfigurationQuestions {
  _configuration: ContentQuestionElementJSON | null;

  constructor(configuration?: ContentQuestionElementJSON) {
    this._configuration = configuration || null;
  }

  get question(): ContentConfigurationElements {
    if (this._configuration === null) {
      return new ContentConfigurationElements([]);
    }

    return new ContentConfigurationElements(
      this._configuration.questionElements
    );
  }

  get options(): ContentConfigurationElements {
    if (this._configuration === null) {
      return new ContentConfigurationElements([]);
    }

    return new ContentConfigurationElements(this._configuration.optionElements);
  }

  get answers(): ContentConfigurationElements {
    if (this._configuration === null) {
      return new ContentConfigurationElements([]);
    }

    return new ContentConfigurationElements(
      this._configuration.givenAnswerElements
    );
  }
}

export default ContentConfigurationQuestions;
