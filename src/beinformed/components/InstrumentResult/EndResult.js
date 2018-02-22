// @flow
import React from "react";

import InstrumentResult from "beinformed/components/InstrumentResult/InstrumentResult";

import type ContentConfiguration from "beinformed/models/contentconfiguration/ContentConfiguration";
import type ContentConfigurationResults from "beinformed/models/contentconfiguration/ContentConfigurationResults";

type EndResultProps = {
  id: string,
  attributes: Array<AttributeType>,
  contentConfiguration: ContentConfiguration,
  configuredElementsOnly?: boolean
};

export const getResults = (
  attributes: Array<AttributeType>,
  contentConfiguration: ContentConfiguration,
  configuredElementsOnly: boolean
): Array<{
  attributes: Array<AttributeType>,
  config: ContentConfigurationResults | null
}> => {
  const results = [];
  if (contentConfiguration.endResults) {
    contentConfiguration.endResults.config.forEach(config => {
      const attributesWithContent = attributes.filter(attribute => {
        if (config.attributes.includes(attribute.key)) {
          if (attribute.isBoolean) {
            return attribute.options.selected.length > 0;
          }

          return true;
        }

        return false;
      });

      if (attributesWithContent.length > 0) {
        results.push({
          attributes: attributesWithContent,
          config
        });
      }
    });
  }

  if (!configuredElementsOnly) {
    // Render result attributes that are not configured through content
    const attributesNoContent = attributes.filter(
      attribute =>
        !contentConfiguration.isConfiguredIntermediateResultAttribute(
          attribute.key
        ) && !contentConfiguration.isConfiguredEndResultAttribute(attribute.key)
    );

    if (attributesNoContent.length > 0) {
      results.push({
        attributes: attributesNoContent,
        config: null
      });
    }
  }

  return results;
};

/**
 * Render form results of a form
 */
const EndResult = ({
  id,
  attributes,
  contentConfiguration,
  configuredElementsOnly = true
}: EndResultProps) =>
  getResults(attributes, contentConfiguration, configuredElementsOnly).map(
    (result, j) => (
      <InstrumentResult
        key={`${id}-${j}`}
        id={id}
        attributes={result.attributes}
        contentConfiguration={result.config}
      />
    )
  );

export default EndResult;
