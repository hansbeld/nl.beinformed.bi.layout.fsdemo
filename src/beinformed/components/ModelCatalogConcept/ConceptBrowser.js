// @flow
import React from "react";

import { Message } from "beinformed/i18n";

import ConceptBrowserSearch from "beinformed/components/ModelCatalogConcept/ConceptBrowserSearch";

import CharIndex from "beinformed/components/CharIndex/CharIndex";
import ConceptLink from "beinformed/components/ConceptLink/ConceptLink";

import {
  Href,
  StringAttributeModel,
  ChoiceAttributeModel
} from "beinformed/models";

import ModelOverview from "beinformed/components/ModelOverview/ModelOverview";

import "./ConceptBrowser.scss";

import type { ConceptIndexModel } from "beinformed/models";

type ConceptBrowserProps = {
  conceptindex: ConceptIndexModel
};

const ConceptBrowser = ({ conceptindex }: ConceptBrowserProps) => {
  if (conceptindex) {
    const indexFilterAttribute =
      conceptindex.indexfilter &&
      conceptindex.indexfilter.attribute instanceof ChoiceAttributeModel &&
      conceptindex.indexfilter.attribute;

    const searchTermFilterAttribute =
      conceptindex.searchtermfilter &&
      conceptindex.searchtermfilter.attribute instanceof StringAttributeModel &&
      conceptindex.searchtermfilter.attribute;

    return (
      <div className="concept-browser catalog-index">
        <ModelOverview conceptIndex={conceptindex} />

        {searchTermFilterAttribute && (
          <ConceptBrowserSearch conceptIndex={conceptindex} />
        )}

        <h3>
          <Message id="ConceptIndex.Header" defaultMessage="Concept index" />
        </h3>

        {indexFilterAttribute && (
          <div className="char-index">
            <CharIndex
              active={indexFilterAttribute.selected}
              enabled={indexFilterAttribute.options.all.map(
                option => option.code
              )}
              href={
                new Href(`/modelcatalog${conceptindex.selfhref.toString()}`)
              }
            />
          </div>
        )}

        {conceptindex.items.hasItems && (
          <ul className="nav flex-column mb-1 concept-index-concepts">
            {conceptindex.items.all.map((concept, idx) => (
              <li key={`${concept.key}-${idx}`} className="nav-item">
                <ConceptLink concept={concept} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return null;
};

export default ConceptBrowser;
