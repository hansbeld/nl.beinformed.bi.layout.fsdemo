// @flow
import React from "react";

import ConceptLink from "beinformed/components/ConceptLink/ConceptLink";

import { Message } from "beinformed/containers/I18n/Message";
import { loadModel } from "beinformed/containers/ModularUI/actions";
import { modelSelector } from "beinformed/containers/ModularUI/selectors";
import connectModularUI from "beinformed/utils/modularui/connectModularUI";

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

/**
 * Map state to props
 */
const mapStateToProps = (state: State, { content }) => ({
  relatedConcepts: modelSelector(state, content.relatedConceptsHref)
});

const modularUIConfig = {
  load: ({ content }) => loadModel(content.relatedConceptsHref),
  shouldLoad: ({ relatedConcepts }) => !relatedConcepts,
  shouldReload: ({ relatedConcepts }) => !relatedConcepts
};

export default connectModularUI(modularUIConfig, mapStateToProps)(
  RelatedConcepts
);
