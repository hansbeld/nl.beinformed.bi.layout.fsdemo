// @flow
import React from "react";
import classNames from "classnames";
import CheckIcon from "mdi-react/CheckIcon";
import CloseIcon from "mdi-react/CloseIcon";

import FormContentRenderer from "beinformed/components/FormContent/FormContentRenderer";

import "./ResultAttributeDecision.scss";

import type {
  ContentConfigurationElements,
  ContentConfigurationResults
} from "beinformed/models";

type ResultAttributeProps = {
  attribute: AttributeType,
  contentConfiguration?: ?ContentConfigurationResults,
  defaultContentConfiguration?: ?ContentConfigurationElements
};

const ResultAttributeDecision = ({
  contentConfiguration,
  defaultContentConfiguration,
  attribute
}: ResultAttributeProps) => {
  const isSelected =
    attribute.options.selected.length > 0 &&
    attribute.options.selected[0].code === "true";

  return (
    <div
      className={classNames("form-result-decision form-group", {
        active: isSelected
      })}
      data-name={attribute.name}
    >
      <div className="form-label">
        {isSelected ? <CheckIcon /> : <CloseIcon />}
        {attribute.getContentConfiguredLabel(
          isSelected
            ? contentConfiguration.positiveResultElements
            : contentConfiguration.negativeResultElements
        )}
      </div>
      {attribute.concept &&
        contentConfiguration && (
          <FormContentRenderer
            concept={attribute.concept}
            contentConfiguration={
              isSelected
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
  );
};

export default ResultAttributeDecision;
