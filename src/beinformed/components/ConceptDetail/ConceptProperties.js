// @flow
import React from "react";
import CheckboxMarkedOutlineIcon from "mdi-react/CheckboxMarkedOutlineIcon";
import CheckboxBlankOutlineIcon from "mdi-react/CheckboxBlankOutlineIcon";

import { Message } from "beinformed/containers/I18n/Message";

declare var propertyType: {
  label: string,
  value: string
};

type ConceptPropertiesType = typeof propertyType[];

/**
 * Concept property value
 */
const conceptPropertyValue = (property: typeof propertyType) => {
  if (property.type === "boolean") {
    return property.value && property.value === "true" ? (
      <CheckboxMarkedOutlineIcon />
    ) : (
      <CheckboxBlankOutlineIcon />
    );
  } else if (property.type === "hyperlink" && property.value) {
    return (
      <a href={property.value} target="_blank" rel="noopener noreferrer">
        {property.value}
      </a>
    );
  }

  return property.value || "-";
};

/**
 * Concept property label
 */
const conceptPropertyLabel = (property: typeof propertyType) => {
  if (property.mandatory === "true") {
    return `${property.label} *`;
  }

  return property.label;
};

/**
 * Concept properties
 */
const ConceptProperties = ({
  properties
}: {
  properties: ConceptPropertiesType
}) => (
  <div className="concept-properties mb-4">
    <h3>
      <Message id="ConceptProperties.Header" defaultMessage="Properties" />
    </h3>
    {properties.map((property, idx) => (
      <div key={idx} className="row">
        <div className="col-sm-3 label">{conceptPropertyLabel(property)}</div>
        <div className="col-sm-9 value">{conceptPropertyValue(property)}</div>
      </div>
    ))}
  </div>
);

export default ConceptProperties;
