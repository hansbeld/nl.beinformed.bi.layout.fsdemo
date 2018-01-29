// @flow
import React from "react";

import { Message } from "beinformed/containers/I18n/Message";

type ConceptLabelsType = {
  labels: {
    label: string,
    value: string
  }[]
};

/**
 * Concept labels
 */
const ConceptLabels = ({ labels }: ConceptLabelsType) => (
  <div className="concept-labels mb-4">
    <h3>
      <Message id="ConceptLabels.Header" defaultMessage="Alternative labels" />
    </h3>

    {labels.map((label, idx) => (
      <div key={idx} className="row">
        <div className="col-sm-3">{label.label}</div>
        <div className="col-sm-9">{label.value}</div>
      </div>
    ))}
  </div>
);

export default ConceptLabels;
