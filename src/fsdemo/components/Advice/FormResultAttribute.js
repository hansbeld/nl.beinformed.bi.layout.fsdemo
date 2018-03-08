// @flow
import React, { PureComponent } from "react";

import AlertOutlineIcon from "mdi-react/AlertOutlineIcon";
import CheckIcon from "mdi-react/CheckIcon";

import FormContentRenderer from "beinformed/components/FormContent/FormContentRenderer";

import type {
  ContentConfigurationResults,
  ContentConfigurationElements
} from "beinformed/models";

import "./FormResultAttribute.scss";

type FormResultAttributeProps = {
  id: string,
  attribute: AttributeType,
  contentConfiguration?: ?ContentConfigurationResults
};

class FormResultAttribute extends PureComponent<FormResultAttributeProps> {
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
    const { attribute, contentConfiguration } = this.props;
    const defaultContentConfiguration = this.getDefaultAttributeConfiguration();
    const showIcon = !attribute.key.includes("EligibleFor");

    return (
      <div>
        {showIcon &&
          attribute.value !== "true" && (
            <AlertOutlineIcon className="textAfter" />
          )}
        {showIcon &&
          attribute.value === "true" && <CheckIcon className="textAfter" />}
        {contentConfiguration && (
          <FormContentRenderer
            concept={attribute.concept}
            contentConfiguration={
              attribute.value === "true"
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
    );
  }
}

export default FormResultAttribute;
