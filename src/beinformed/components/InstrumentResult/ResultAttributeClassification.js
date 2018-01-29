// @flow
import React from "react";
import classNames from "classnames";

import Icon from "beinformed/components/Icon/Icon";
import FormContentRenderer from "beinformed/components/FormContent/FormContentRenderer";

import "./ResultAttributeClassification.scss";

import type ContentConfigurationResults from "beinformed/models/contentconfiguration/ContentConfigurationResults";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type ResultAttributeProps = {
  id: string,
  attribute: AttributeType,
  contentConfiguration?: ?ContentConfigurationResults,
  defaultContentConfiguration?: ?ContentConfigurationElements
};

const ResultAttributeClassification = ({
  contentConfiguration,
  defaultContentConfiguration,
  attribute,
  id
}: ResultAttributeProps) => (
  <div className="form-result-taxonomy form-group" data-name={attribute.name}>
    <div className="form-label" id={`${id}-label`}>
      {attribute.label}
    </div>
    <div role="group" aria-label={attribute.label}>
      {attribute.options.all.map((option, i) => (
        <div
          key={i}
          className={classNames("form-result-option", {
            active: option.selected
          })}
        >
          <div key={i} className="form-result-option-label">
            <Icon name={option.selected ? "check" : "times"} textAfter />
            {option.label}
          </div>
          {contentConfiguration && (
            <FormContentRenderer
              concept={option.concept}
              contentConfiguration={
                option.selected
                  ? contentConfiguration.positiveResultElements
                  : contentConfiguration.negativeResultElements
              }
            />
          )}
          {defaultContentConfiguration && (
            <FormContentRenderer
              concept={attribute.concept}
              contentConfiguration={defaultContentConfiguration}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default ResultAttributeClassification;
