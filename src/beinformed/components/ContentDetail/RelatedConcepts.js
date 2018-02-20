// @flow
import React from "react";

import ConceptLink from "beinformed/components/ConceptLink/ConceptLink";

import { Message } from "beinformed/containers/I18n/Message";

import type RelatedConceptsModel from "beinformed/models/content/RelatedConceptsModel";

type RelatedConceptsType = {
  relatedConcepts: RelatedConceptsModel
};

/**
 * Related concepts
 */
const RelatedConcepts = ({ relatedConcepts }: RelatedConceptsType) =>
  relatedConcepts ? (
    <div className="concept-relations">
      <h3>
        <Message
          id="RelatedConcepts.Header"
          defaultMessage="Related concepts"
        />
      </h3>
      <ul className="nav flex-column">
        {relatedConcepts.concepts.map(relatedConcept => (
          <li key={relatedConcept.key} className="nav-item concept-relation">
            <ConceptLink concept={relatedConcept} />
          </li>
        ))}
      </ul>
    </div>
  ) : null;

export default RelatedConcepts;
