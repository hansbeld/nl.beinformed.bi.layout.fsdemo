// @flow
import ContentConfigurationResults from "beinformed/models/contentconfiguration/ContentConfigurationResults";

class ContentConfigurationEndResults {
  _configuration: ContentEndResultElementJSON | [];

  constructor(configuration: ContentEndResultElementJSON) {
    this._configuration = configuration || [];
  }

  get config(): Array<ContentConfigurationResults> {
    return this._configuration.map(configElement => {
      const key = Object.keys(configElement)[0];
      return new ContentConfigurationResults(configElement[key]);
    });
  }

  getContentConfigurationElementsForAttribute(attributeKey: string) {
    return (
      this.config.find(item => item.attributes.includes(attributeKey)) || null
    );
  }
}

export default ContentConfigurationEndResults;
