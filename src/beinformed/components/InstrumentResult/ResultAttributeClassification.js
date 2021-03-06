// @flow
import React from "react";
import classNames from "classnames";

import CheckIcon from "mdi-react/CheckIcon";
import CloseIcon from "mdi-react/CloseIcon";

import FormContentRenderer from "beinformed/components/FormContent/FormContentRenderer";

import "./ResultAttributeClassification.scss";

import type {
  ContentConfigurationElements,
  ContentConfigurationResults
} from "beinformed/models";

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
    {attribute.options
      .filter(
        option =>
          !contentConfiguration ||
          (!contentConfiguration.positiveResultElements.hasConfig() &&
            !contentConfiguration.negativeResultElements.hasConfig()) ||
          (contentConfiguration.positiveResultElements.hasConfig() &&
            option.selected) ||
          (contentConfiguration.negativeResultElements.hasConfig() &&
            !option.selected)
      )
      .map((option, i) => (
        <div
          key={`${id}-${i}`}
          className={classNames("form-result-option", {
            active: option.selected
          })}
        >
          <div key={i} className="form-result-option-label">
            {option.selected ? (
              <CheckIcon className="textAfter" />
            ) : (
              <CloseIcon className="textAfter" />
            )}
            {option.getContentConfiguredLabel(
              option.selected
                ? contentConfiguration.positiveResultElements
                : contentConfiguration.negativeResultElements
            )}
          </div>
          {option.concept &&
            contentConfiguration && (
              <FormContentRenderer
                concept={option.concept}
                contentConfiguration={
                  option.selected
                    ? contentConfiguration.positiveResultElements
                    : contentConfiguration.negativeResultElements
                }
              />
            )}
          {attribute.concept &&
            defaultContentConfiguration && (
              <FormContentRenderer
                concept={attribute.concept}
                contentConfiguration={defaultContentConfiguration}
              />
            )}
        </div>
      ))}
  </div>
);

export default ResultAttributeClassification;
