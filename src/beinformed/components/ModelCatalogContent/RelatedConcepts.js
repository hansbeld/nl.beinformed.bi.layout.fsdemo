// @flow
import React from "react";

import ConceptLink from "beinformed/components/ConceptLink/ConceptLink";

import { Message } from "beinformed/containers/I18n/Message";
import type ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
type RelatedConceptsType = {
  concepts: ConceptDetailModel[]
};

/**
 * Related concepts
 */
const RelatedConcepts = ({ concepts }: RelatedConceptsType) => (
  <div className="concept-relations">
    <h3>
      <Message id="RelatedConcepts.Header" defaultMessage="Related concepts" />
    </h3>
    <ul className="nav flex-column">
      {concepts.map(relatedConcept => (
        <li key={relatedConcept.key} className="nav-item concept-relation">
          <ConceptLink concept={relatedConcept} />
        </li>
      ))}
    </ul>
  </div>
);

export default RelatedConcepts;
