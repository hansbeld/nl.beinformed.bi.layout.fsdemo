// @flow
import React from "react";
import classNames from "classnames";

import AttributeValue from "beinformed/components/AttributeList/AttributeValue";
import FormContentRenderer from "beinformed/components/FormContent/FormContentRenderer";

import ContentConfiguration from "beinformed/models/contentconfiguration/ContentConfiguration";

type AttributeProps = {
  attribute: AttributeType,
  contentConfig?: ContentConfiguration
};

/**
 * Renders a standard attribute name value pairs
 */
const Attribute = ({ attribute, contentConfig }: AttributeProps) => (
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

export default Attribute;

// <FormContentRenderer concept={attribute.concept} config={...
