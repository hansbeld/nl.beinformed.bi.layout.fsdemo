// @flow
import React from "react";
import Helmet from "react-helmet";

import ConceptHeader from "beinformed/components/ConceptDetail/ConceptHeader";
import ConceptRelations from "beinformed/components/ConceptDetail/ConceptRelations";
import ConceptLabels from "beinformed/components/ConceptDetail/ConceptLabels";
import ConceptFormula from "beinformed/components/ConceptDetail/ConceptFormula";
import ConceptProperties from "beinformed/components/ConceptDetail/ConceptProperties";
import ConceptTextFragments from "beinformed/components/ConceptDetail/ConceptTextFragments";
import SourceReferences from "beinformed/components/ConceptDetail/SourceReferences";

import BusinessScenario from "beinformed/components/BusinessScenario/BusinessScenario";

import type ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";

type ConceptDetailProps = {
  conceptDetail: ConceptDetailModel,
  availableLocales: Array<string>
};

const BUSINESS_SCENARIO_CONCEPT_TYPE =
  "/concepttypes/Library/KMTs/Business scenarios.bixml/BusinessScenario";

const ConceptDetail = ({
  conceptDetail,
  availableLocales
}: ConceptDetailProps) =>
  conceptDetail ? (
    <div className="concept-detail">
      <Helmet>
        <title>{conceptDetail.label}</title>
      </Helmet>

      <ConceptHeader concept={conceptDetail} />

      <div className="row">
        {conceptDetail.relationsCollection.hasItems && (
          <div className="col-lg-2">
            <ConceptRelations relations={conceptDetail.relationsCollection} />
          </div>
        )}

        <div className="col-lg-10">
          {conceptDetail.conceptType.selfhref.path ===
            BUSINESS_SCENARIO_CONCEPT_TYPE && (
            <BusinessScenario concept={conceptDetail} />
          )}
          {conceptDetail.labels.length > 0 && (
            <ConceptLabels labels={conceptDetail.labels} />
          )}
          {conceptDetail.formula && (
            <ConceptFormula formula={conceptDetail.formula} />
          )}
          {conceptDetail.conceptProperties.length > 0 && (
            <ConceptProperties properties={conceptDetail.conceptProperties} />
          )}
          {conceptDetail.textfragments.length > 0 && (
            <ConceptTextFragments textfragments={conceptDetail.textfragments} />
          )}
          {conceptDetail.getSourceReferenceCollection(availableLocales)
            .hasItems && (
            <SourceReferences
              sourceReferences={conceptDetail.getSourceReferenceCollection(
                availableLocales
              )}
              sources={conceptDetail.content}
            />
          )}
        </div>
      </div>
    </div>
  ) : null;

export default ConceptDetail;
