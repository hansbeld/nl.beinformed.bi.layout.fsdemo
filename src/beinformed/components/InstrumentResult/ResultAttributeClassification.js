// @flow
import React from "react";
import classNames from "classnames";

import CheckIcon from "mdi-react/CheckIcon";
import CloseIcon from "mdi-react/CloseIcon";

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
            {option.selected ? (
              <CheckIcon className="textAfter" />
            ) : (
              <CloseIcon className="textAfter" />
            )}
            {option.label}
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
  </div>
);

export default ResultAttributeClassification;
