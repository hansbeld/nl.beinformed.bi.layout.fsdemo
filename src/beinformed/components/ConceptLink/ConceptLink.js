// @flow
import React from "react";

import Link from "beinformed/components/Link/Link";
import ConceptIcon from "beinformed/components/ConceptDetail/ConceptIcon";
import { Href } from "beinformed/models";

import "./ConceptLink.scss";

import type { ConceptLinkModel, ConceptDetailModel } from "beinformed/models";

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
