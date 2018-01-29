// @flow
import React from "react";

import ConceptIcon from "beinformed/components/ConceptDetail/ConceptIcon";
import type ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";

import "./ConceptHeader.scss";

/**
 * Concept header
 */
const ConceptHeader = ({ concept }: { concept: ConceptDetailModel }) => {
  const headerStyle = {
    backgroundColor: concept.conceptType.backgroundColor,
    color: concept.conceptType.textColor,
    borderColor: concept.conceptType.lineColor
  };

  return (
    <div className="concept-header" style={headerStyle}>
      {concept.conceptType.icon && <ConceptIcon concept={concept} />}
      <div>
        <small className="concept-type">{concept.conceptType.label}</small>
        <h1 className="concept-label">{concept.label}</h1>
      </div>
    </div>
  );
};

export default ConceptHeader;
