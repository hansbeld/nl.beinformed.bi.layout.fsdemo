// @flow
import React from "react";

import Link from "beinformed/components/Link/Link";
import ConceptIcon from "beinformed/components/ConceptDetail/ConceptIcon";
import Href from "beinformed/models/href/Href";

import "./ConceptLink.scss";

import type ConceptLinkModel from "beinformed/models/concepts/ConceptLinkModel";
import type ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";

type ConceptLinkType = {
  concept: ConceptLinkModel | ConceptDetailModel
};

/**
 * Concept link
 */
const ConceptLink = ({ concept }: ConceptLinkType) => (
  <Link
    className="concept-link"
    dataId={concept.key}
    href={new Href(`/modelcatalog${concept.selfhref.toString()}`)}
  >
    {concept.conceptType &&
      concept.conceptType.icon && <ConceptIcon concept={concept} />}
    {concept.label}
  </Link>
);

export default ConceptLink;
