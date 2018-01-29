// @flow
import React, { Component } from "react";
import classNames from "classnames";

import Icon from "beinformed/components/Icon/Icon";

type propertyType = {
  type: string,
  label: string,
  value: string,
  mandatory: string
};

type FormContentPropertiesProps = {
  properties: propertyType[],
  renderEmpty: boolean,
  className: string
};

class FormContentProperties extends Component<FormContentPropertiesProps> {
  conceptPropertyValue(property: propertyType) {
    if (property.type === "boolean") {
      const icon =
        property.value && property.value === "true"
          ? "check-square-o"
          : "square-o";

      return <Icon name={icon} />;
    } else if (property.type === "hyperlink" && property.value) {
      return (
        <a href={property.value} target="_blank" rel="noopener noreferrer">
          {property.value}
        </a>
      );
    }

    return property.value || "-";
  }

  conceptPropertyLabel(property: propertyType) {
    if (property.mandatory === "true") {
      return `${property.label} *`;
    }

    return `${property.label}:`;
  }

  render() {
    const props = this.props.renderEmpty
      ? this.props.properties
      : this.props.properties.filter(
          (property: propertyType) =>
            typeof property.value !== "undefined" &&
            property.value !== null &&
            property.value !== ""
        );

    const propertyClassName = classNames(
      "property-elements concept-properties",
      this.props.className
    );
    return (
      <div className={propertyClassName}>
        {props.map((property, idx) => (
          <div key={`propery-${idx}`} className="row">
            <div className="col-sm-4 label">
              {this.conceptPropertyLabel(property)}
            </div>
            <div className="col-sm-8 value">
              {this.conceptPropertyValue(property)}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default FormContentProperties;
