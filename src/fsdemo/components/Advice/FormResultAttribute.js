// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";

import FormContentRenderer from "beinformed/components/FormContent/FormContentRenderer";

import type ContentConfigurationResults from "beinformed/models/contentconfiguration/ContentConfigurationResults";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

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
      <div
        className={classNames({
          "icon-exclamation-triangle": showIcon && attribute.value !== "true",
          "icon-check": showIcon && attribute.value === "true"
        })}
      >
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
