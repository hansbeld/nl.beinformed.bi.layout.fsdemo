// @flow
import React, { Component } from "react";

import FormAttribute from "beinformed/components/FormAttribute/AttributeRenderer";
import ResultAttributeClassification from "beinformed/components/InstrumentResult/ResultAttributeClassification";
import ResultAttributeDecision from "beinformed/components/InstrumentResult/ResultAttributeDecision";

import type ContentConfigurationResults from "beinformed/models/contentconfiguration/ContentConfigurationResults";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type ResultAttributeRendererProps = {
  id: string,
  attribute: AttributeType,
  contentConfiguration?: ?ContentConfigurationResults
};

class ResultAttributeRenderer extends Component<ResultAttributeRendererProps> {
  getDefaultAttributeConfiguration(): ContentConfigurationElements | null {
    const contentConfiguration = this.props.contentConfiguration;

    if (
      contentConfiguration &&
      contentConfiguration.calculatedResultElements &&
      contentConfiguration.calculatedResultElements.hasConfig()
    ) {
      return contentConfiguration.calculatedResultElements;
    }

    if (
      contentConfiguration &&
      contentConfiguration.resultElements &&
      contentConfiguration.resultElements.hasConfig()
    ) {
      return contentConfiguration.resultElements;
    }

    return null;
  }

  render() {
    const { attribute, id, contentConfiguration } = this.props;

    const defaultContentConfiguration = this.getDefaultAttributeConfiguration();

    if (attribute.type === "choice" && attribute.isBoolean) {
      return (
        <ResultAttributeDecision
          id={id}
          attribute={attribute}
          contentConfiguration={contentConfiguration}
          defaultContentConfiguration={defaultContentConfiguration}
        />
      );
    }

    if (attribute.type === "choice") {
      return (
        <ResultAttributeClassification
          id={id}
          attribute={attribute}
          contentConfiguration={contentConfiguration}
          defaultContentConfiguration={defaultContentConfiguration}
        />
      );
    }

    return (
      <FormAttribute
        id={id}
        name={attribute.name}
        attribute={attribute}
        questionContentConfiguration={defaultContentConfiguration}
      />
    );
  }
}

export default ResultAttributeRenderer;
