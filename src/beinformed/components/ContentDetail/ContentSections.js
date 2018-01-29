// @flow
import React from "react";
import classNames from "classnames";

import ContentBody from "beinformed/components/ContentDetail/ContentBody";
import ContentSubSections from "beinformed/components/ContentDetail/ContentSubSections";
import ContentChildSections from "beinformed/components/ContentDetail/ContentChildSections";
import ContentChildSectionLinks from "beinformed/components/ContentDetail/ContentChildSectionLinks";
import type ContentModel from "beinformed/models/content/ContentModel";
import type ContentLinkModel from "beinformed/models/content/ContentLinkModel";
type ContentSectionsType = {
  className?: string,
  contentDetail: ContentModel,
  highlightIntoview?: boolean,
  highlightSections?: ContentLinkModel[],
  renderChildSections?: boolean,
  renderSectionLabel?: boolean,
  onContentClick?: Function
};

/**
 * Render content sections and bodies
 */
const ContentSections = ({
  className,
  contentDetail,
  highlightSections = [],
  highlightIntoview,
  renderChildSections = true,
  renderSectionLabel = true,
  onContentClick
}: ContentSectionsType) => (
  <div className={classNames("content-sections", className)}>
    {(contentDetail.body || contentDetail.label || contentDetail.number) && (
      <ContentBody
        body={contentDetail.body}
        label={contentDetail.label}
        number={contentDetail.number}
        sourceHref={contentDetail.selfhref}
        renderSectionLabel={renderSectionLabel}
        onContentClick={onContentClick}
      />
    )}

    {contentDetail.subSections.length > 0 && (
      <ContentSubSections
        subSections={contentDetail.subSections}
        sourceHref={contentDetail.selfhref}
        highlightSections={highlightSections}
        highlightIntoview={highlightIntoview}
        renderSectionLabel={renderSectionLabel}
        onContentClick={onContentClick}
      />
    )}

    {renderChildSections &&
      contentDetail.childSections.length > 0 && (
        <ContentChildSections
          childSections={contentDetail.childSections}
          renderSectionLabel={renderSectionLabel}
        />
      )}

    {renderChildSections &&
      contentDetail.childSectionLinks.length > 0 && (
        <ContentChildSectionLinks
          childSectionLinks={contentDetail.childSectionLinks}
          onContentClick={onContentClick}
        />
      )}
  </div>
);

export default ContentSections;
