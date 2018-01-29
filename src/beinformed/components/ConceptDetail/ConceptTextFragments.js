// @flow
import React from "react";

import { Message } from "beinformed/containers/I18n/Message";

declare var textfragmentType: {
  label: string,
  text: string
};
type ConceptTextFragmentsType = typeof textfragmentType[];

/**
 * Add newlines to text to render
 */
const renderText = text =>
  text
    ? text.split("\n").map((textLine, i) => (
        <span key={`line-${i}`}>
          {textLine}
          <br />
        </span>
      ))
    : "-";

/**
 * Concept text fragments
 */
const ConceptTextFragments = ({
  textfragments
}: {
  textfragments: ConceptTextFragmentsType
}) => (
  <div className="concept-textfragements mb-4">
    <h3>
      <Message
        id="ConceptTextFragments.Header"
        defaultMessage="Text fragments"
      />
    </h3>
    {textfragments.map((textfragment, idx) => (
      <div key={idx} className="row">
        <div className="col-sm-3 label">{textfragment.label}</div>
        <div className="col-sm-9 text">{renderText(textfragment.text)}</div>
      </div>
    ))}
  </div>
);

export default ConceptTextFragments;
