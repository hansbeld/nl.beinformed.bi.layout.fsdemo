// @flow
import React, { Component } from "react";

import ContentLink from "beinformed/components/ContentLink/ContentLink";

import "./ContentTOC.scss";

import type ContentTOCModel from "beinformed/models/content/ContentTOCModel";
import type ContentLinkModel from "beinformed/models/content/ContentLinkModel";

type ContentTOCProps = {
  contentTOC: ContentTOCModel
};

class ContentTOC extends Component<ContentTOCProps> {
  renderTree(items: Array<ContentLinkModel>) {
    return (
      <ul className="nav content-toc flex-column">
        {items.map((link: ContentLinkModel, idx: number) => (
          <ContentLink key={`${link.key}-${idx}`} link={link}>
            {link.items && this.renderTree(link.items)}
          </ContentLink>
        ))}
      </ul>
    );
  }

  render() {
    return this.renderTree(this.props.contentTOC.items);
  }
}

export default ContentTOC;
