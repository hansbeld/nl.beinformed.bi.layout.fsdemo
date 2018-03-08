// @flow
import React from "react";

import ContentLink from "beinformed/components/ContentLink/ContentLink";

import type { ContentTOCModel, ContentModel } from "beinformed/models";
type ContentCategoriesType = {
  contentDetail?: ContentModel,
  contentTOC: ContentTOCModel
};

/**
 * Content categories
 */
const ContentCategories = ({
  contentDetail,
  contentTOC
}: ContentCategoriesType) => {
  /**
   * Check if category is acteive
   */
  const isActiveHref = (itemHref, detail) =>
    detail && detail.selfhref ? itemHref.equals(detail.selfhref) : false;

  return (
    <ul className="nav flex-column content-toc">
      {contentTOC.categories.map((content, idx) => (
        <ContentLink
          key={`${content.key}-${idx}`}
          link={content}
          isActive={isActiveHref(content.selfhref, contentDetail)}
        />
      ))}
    </ul>
  );
};

export default ContentCategories;
