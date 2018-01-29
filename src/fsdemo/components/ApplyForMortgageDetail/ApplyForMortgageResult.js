import React, { Component } from "react";

import AttributeValue from "beinformed/components/AttributeList/AttributeValue";

import { getResults } from "beinformed/components/InstrumentResult/EndResult";

class ApplyForMortgageResult extends Component {
  renderValue(attribute, config) {
    if (attribute.type === "choice") {
      return (
        <div className="attribute-value">
          {attribute.options.selected.map(option =>
            option.getContentConfiguredLabel(config.positiveResultElements)
          )}
        </div>
      );
    }

    return <AttributeValue attribute={attribute} />;
  }

  render() {
    return (
      <div className="attributelist">
        {getResults(
          this.props.attributes,
          this.props.contentConfiguration,
          true
        ).map((result, j) => {
          const attribute = result.attributes[0];
          const config = result.config;

          return (
            <div key={`${attribute.name}-${j}`} className="attribute">
              <div className="attribute-label">{config.label}</div>
              {this.renderValue(attribute, config)}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ApplyForMortgageResult;
