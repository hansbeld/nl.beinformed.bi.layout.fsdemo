// @flow
import React from "react";
import classNames from "classnames";

import ContentSections from "beinformed/components/ContentDetail/ContentSections";

import type { ContentModel } from "beinformed/models";
type FormContentSectionsProps = {
  content: ContentModel[],
  renderChildSections: boolean,
  renderSectionLabel: boolean,
  className: string
};

/**
 * Concept text fragments
 */
const FormContentSections = ({
  content,
  renderChildSections,
  renderSectionLabel,
  className
}: FormContentSectionsProps) => (
  <div className={classNames("concept-content content-elements", className)}>
    {content.map((contentItem, idx) => (
      <ContentSections
        key={`${contentItem.key}-${idx}`}
        contentDetail={contentItem}
        renderChildSections={renderChildSections}
        renderSectionLabel={renderSectionLabel}
      />
    ))}
  </div>
);

export default FormContentSections;
