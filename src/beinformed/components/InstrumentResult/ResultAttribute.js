// @flow
import React from "react";
import classNames from "classnames";

import AttributeValue from "beinformed/components/AttributeList/AttributeValue";
import FormContentRenderer from "beinformed/components/FormContent/FormContentRenderer";

import { ContentConfiguration } from "beinformed/models";

type ResultAttributeProps = {
  attribute: AttributeType,
  contentConfig?: ContentConfiguration
};

/**
 * Renders a result attribute name value pairs
 */
const ResultAttribute = ({
  attribute,
  contentConfig
}: ResultAttributeProps) => (
  <div className="attribute" data-id={attribute.key}>
    <div
      className={classNames("attribute-label", {
        "text-right": attribute.alignment === "right",
        "text-center": attribute.alignment === "center"
      })}
    >
      {attribute.label}
    </div>
    <AttributeValue attribute={attribute} />
    {attribute.concept &&
      contentConfig && (
        <FormContentRenderer
          concept={attribute.concept}
          config={contentConfig}
        />
      )}
  </div>
);

export default ResultAttribute;
