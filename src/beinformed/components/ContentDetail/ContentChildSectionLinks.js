// @flow
import React from "react";

import ContentLink from "beinformed/components/ContentLink/ContentLink";
import type { ContentLinkModel } from "beinformed/models";

type ContentChildSectionLinksType = {
  childSectionLinks: Array<ContentLinkModel>
};

/**
 * Content child section links
 */
const ContentChildSectionLinks = ({
  childSectionLinks
}: ContentChildSectionLinksType) => (
  <div className="content-childsection">
    <ul className="nav flex-column">
      {childSectionLinks.map((childSection: ContentLinkModel, idx) => (
        <ContentLink key={`${childSection.key}-${idx}`} link={childSection} />
      ))}
    </ul>
  </div>
);

export default ContentChildSectionLinks;
