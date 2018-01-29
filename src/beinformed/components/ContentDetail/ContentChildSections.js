// @flow
import React from "react";

import ContentBody from "beinformed/components/ContentDetail/ContentBody";
import type ContentModel from "beinformed/models/content/ContentModel";

type ContentChildSectionsType = {
  childSections: ContentModel[],
  renderSectionLabel?: boolean
};

/**
 * Content child section links
 */
const ContentChildSections = ({
  childSections,
  renderSectionLabel
}: ContentChildSectionsType) => (
  <ul className="nav flex-column content-childsection">
    {childSections.map(childSection => (
      <li key={childSection.key}>
        {(childSection.body || childSection.label || childSection.number) && (
          <ContentBody
            body={childSection.body}
            label={childSection.label}
            number={childSection.number}
            sourceHref={childSection.selfhref}
            renderSectionLabel={renderSectionLabel}
          />
        )}

        {childSection.childSections.length > 0 && (
          <ContentChildSections childSections={childSection.childSections} />
        )}
      </li>
    ))}
  </ul>
);

export default ContentChildSections;
