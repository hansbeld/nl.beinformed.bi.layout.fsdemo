// @flow
import React from "react";

import { BASE } from "beinformed/constants/Constants";

import "./ContentTOCHeader.scss";

import type ContentTOCModel from "beinformed/models/content/ContentTOCModel";

/**
 * Content header
 */
const ContentHeader = ({ contentTOC }: { contentTOC: ContentTOCModel }) => (
  <div className="content-header mb-1">
    {contentTOC.contentType &&
      contentTOC.contentType.icon && (
        <img
          className="content-icon"
          src={`${BASE}${contentTOC.contentType.icon}`}
          alt={`Icon of ${contentTOC.contentType.label}`}
        />
      )}
    <div>
      {contentTOC.contentType && (
        <small className="content-type">{contentTOC.contentType.label}</small>
      )}
      <h1 className="content-label">{contentTOC.label}</h1>
    </div>
  </div>
);

export default ContentHeader;
