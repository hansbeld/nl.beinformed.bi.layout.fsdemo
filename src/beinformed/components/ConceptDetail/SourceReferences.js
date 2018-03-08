// @flow
import React from "react";

import ContentLink from "beinformed/components/ContentLink/ContentLink";
import ContentSections from "beinformed/components/ContentDetail/ContentSections";

import { Href } from "beinformed/models";
import { Message } from "beinformed/i18n";

import type {
  ContentModel,
  SourceReferenceCollection
} from "beinformed/models";
type SourceReferencesType = {
  sourceReferences: SourceReferenceCollection,
  sources: ContentModel[],
  onContentClick?: (href: Href) => void
};

/**
 * Source references
 */
const SourceReferences = ({
  sourceReferences,
  sources,
  onContentClick
}: SourceReferencesType) => {
  // remove duplicate sourcereferences (there can be multiple source references that point to differenct sections)
  const sourceRefs = sourceReferences.all.filter(
    (sourceReference, index, self) =>
      self.findIndex(selfRef =>
        selfRef.link.selfhref.equals(sourceReference.link.selfhref)
      ) === index
  );

  const getSourceReferences = sourceRef =>
    sourceReferences.all.filter(
      sourceReference =>
        sourceRef.link &&
        sourceReference.link.selfhref.equals(sourceRef.link.selfhref)
    );

  return (
    <div className="source-references mb-4">
      <h5>
        <Message
          id="SourceReferences.Header"
          defaultMessage="Content references"
        />
      </h5>
      {sourceRefs.map((sourceRef, refIdx) => (
        <div key={refIdx} className="sourceRef">
          <ul key={sourceRef.key} className="nav flex-column mb-1">
            {getSourceReferences(sourceRef).map((sourceReference, idx) => (
              <ContentLink
                key={`${sourceRef.key}-${idx}`}
                link={sourceReference.link}
              />
            ))}
          </ul>

          {sources
            .filter(source => source.selfhref.equals(sourceRef.link.selfhref))
            .map((content, idx) => (
              <ContentSections
                key={`contentsections-${idx}`}
                contentDetail={content}
                highlightSections={sourceReferences.all.map(
                  highlightSourceRef => highlightSourceRef.link
                )}
                highlightIntoview
                onContentClick={onContentClick}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default SourceReferences;
