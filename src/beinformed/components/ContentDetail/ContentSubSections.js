// @flow
import React from "react";

import ContentSubSection from "beinformed/components/ContentDetail/ContentSubSection";

import "./ContentSubSections.scss";

import type {
  Href,
  ContentLinkModel,
  SubSectionModel
} from "beinformed/models";

type ContentSubSectionsType = {
  highlightIntoview?: boolean,
  highlightSections: ContentLinkModel[],
  renderSectionLabel?: boolean,
  sourceHref: Href,
  subSections: SubSectionModel[],
  onContentClick?: Function
};

/**
 * Content sub sections, recursevily
 */
const ContentSubSections = ({
  subSections,
  sourceHref,
  highlightSections,
  highlightIntoview = false,
  renderSectionLabel,
  onContentClick
}: ContentSubSectionsType) => {
  /**
   * Check if sub section is active / focused
   */
  const checkActive = subSectionHref =>
    highlightSections &&
    typeof highlightSections.find(
      sectionLink =>
        subSectionHref !== null &&
        sectionLink.selfhref.equals(subSectionHref) &&
        sectionLink.selfhref.hash === subSectionHref.hash
    ) !== "undefined";

  let isFirstActive = false;

  /**
   * Check if active section is the first active section
   */
  const checkIsFirstActive = subSectionHref => {
    if (!isFirstActive && checkActive(subSectionHref)) {
      isFirstActive = true;
    }

    return isFirstActive;
  };

  return (
    <div className="subsections">
      {subSections.map(subSection => (
        <ContentSubSection
          key={subSection.key}
          highlightSections={highlightSections}
          highlightIntoview={highlightIntoview}
          isActive={checkActive(subSection.selfhref)}
          isFirst={checkIsFirstActive(subSection.selfhref)}
          renderSectionLabel={renderSectionLabel}
          scrollIntoView={highlightIntoview}
          sourceHref={sourceHref}
          subSection={subSection}
          onContentClick={onContentClick}
        />
      ))}
    </div>
  );
};

export default ContentSubSections;
