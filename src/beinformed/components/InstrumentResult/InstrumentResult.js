// @flow
import React from "react";
import classNames from "classnames";

import ResultAttributeRenderer from "beinformed/components/InstrumentResult/ResultAttributeRenderer";
import FormattedText from "beinformed/components/FormattedText/FormattedText";

import type { ContentConfigurationResults } from "beinformed/models";

import "./InstrumentResult.scss";

type InstrumentResultProps = {
  className?: string,
  attributes: Array<AttributeType>,
  id: string,
  contentConfiguration?: ?ContentConfigurationResults
};

/**
 * Render form result objects of a form
 */
const InstrumentResult = ({
  className,
  attributes,
  contentConfiguration,
  id
}: InstrumentResultProps) => (
  <div className={classNames("instrument-result", className)}>
    {contentConfiguration && (
      <div className="form-result-header">
        <h3 className="form-result-title">{contentConfiguration.label}</h3>
        {contentConfiguration.description && (
          <FormattedText
            className="form-result-description"
            text={contentConfiguration.description}
          />
        )}
      </div>
    )}

    {attributes &&
      attributes.map((attribute, i) => (
        <ResultAttributeRenderer
          key={`${id}-${attribute.name}-${i}`}
          id={`${id}-${attribute.name}`}
          attribute={attribute}
          contentConfiguration={contentConfiguration}
        />
      ))}
  </div>
);

export default InstrumentResult;
