// @flow
import LayoutHintCollection from "beinformed/models/layouthint/LayoutHintCollection";

/**
 * Get element configuration of instrument questions
 */
class ContentConfigurationElements {
  _elementConfiguration: ContentElement;

  /**
   * Construct
   */
  constructor(elementConfiguration: ContentElement = []) {
    this._elementConfiguration = elementConfiguration;
  }

  includeLayoutHints(hints: Array<string>) {
    const contentIncludeLayoutHint = this._elementConfiguration.filter(
      elementConfig => {
        const key = Object.keys(elementConfig)[0];
        const config = elementConfig[key];

        if (!config || !config.layouthint) {
          return false;
        }

        return (
          typeof config.layouthint.find(hint => hints.includes(hint)) !==
          "undefined"
        );
      }
    );

    return new ContentConfigurationElements(contentIncludeLayoutHint);
  }

  excludeLayoutHints(hints: Array<string>) {
    const contentExcludeLayoutHint = this._elementConfiguration.filter(
      elementConfig => {
        const key = Object.keys(elementConfig)[0];
        const config = elementConfig[key];

        if (!config) {
          return false;
        } else if (!config.layouthint) {
          return true;
        }

        return (
          typeof config.layouthint.find(hint => hints.includes(hint)) ===
          "undefined"
        );
      }
    );

    return new ContentConfigurationElements(contentExcludeLayoutHint);
  }

  /**
   * Get config
   */
  get config(): Object[] {
    return this._elementConfiguration.map(elementConfig => {
      const key = Object.keys(elementConfig)[0];
      const config = elementConfig[key];

      if (!config) {
        return {};
      }

      return {
        type: key,
        label: config.label,
        types:
          config.labelTypes ||
          config.propertyTypes ||
          config.sectionReferenceTypes ||
          config.textFragmentTypes,
        layouthint: new LayoutHintCollection(config.layouthint),
        icon: config.icon || ""
      };
    });
  }

  hasConfig(): boolean {
    return this.config.length > 0;
  }

  hasContent(): boolean {
    return (
      typeof this.config.find(
        configElement => configElement.type === "contentElement"
      ) !== "undefined"
    );
  }

  /**
   * Retrieve if the configuration has an element that has a specific layouthint,
   * makes it easy to indicate that the content needs to be presented in a certain way.
   */
  hasLayoutHint(hint: string): boolean {
    return (
      typeof this.config.find(configElement =>
        configElement.layouthint.has(hint)
      ) !== "undefined"
    );
  }

  /**
   * Returns config elements by given types
   */
  byTypes(types: Array<string> = []): Object[] {
    if (!types || types.length === 0) {
      return this.config;
    }

    return this.config.filter(config => types.includes(config.type));
  }

  /**
   * Get label config elements
   */
  get labelConfig(): Object[] {
    return this.config.filter(config => config.type === "labelElement");
  }

  /**
   * Get all section reference types
   */
  getAllSectionReferenceTypes() {
    const sectionReferences = [];

    this.config.filter(item => item.type === "contentElement").forEach(item => {
      sectionReferences.push(...item.types);
    });

    return sectionReferences;
  }

  /**
   * Retrieve all content element configuration by content type
   */
  getContentElementConfigBySectionReferenceType(type: string) {
    return this.config.filter(
      config => config.type === "contentElement" && config.types.includes(type)
    );
  }
}

export default ContentConfigurationElements;
