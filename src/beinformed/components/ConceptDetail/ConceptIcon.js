// @flow
import React from "react";
import classNames from "classnames";

import { BASE } from "beinformed/constants/Constants";
import ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";

import "./ConceptIcon.scss";

import type ConceptLinkModel from "beinformed/models/concepts/ConceptLinkModel";
type ConceptIconProps = {
  concept: ConceptLinkModel | ConceptDetailModel
};

const ConceptIcon = ({ concept }: ConceptIconProps) => {
  const taxonomyType = concept.taxonomyType;

  const taxonomyTypeClass = classNames("taxonomy-type", {
    exhaustive: taxonomyType === "exhaustive",
    generic: taxonomyType === "generic",
    "generic-infer-completely": taxonomyType === "genericInferCompletely",
    partition: taxonomyType === "partition"
  });

  return (
    <span className="concept-icon-wrapper">
      <img
        className="concept-icon"
        src={`${BASE}${concept.conceptType.icon}`}
        alt={`Icon of ${concept.conceptType.label}`}
      />
      {taxonomyType !== "default" && (
        <span className={taxonomyTypeClass}>{taxonomyType.substr(0, 1)}</span>
      )}
    </span>
  );
};

export default ConceptIcon;
