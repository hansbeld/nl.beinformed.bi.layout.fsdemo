// @flow
import React, { Component } from "react";
import Helmet from "react-helmet";

import ContentSections from "beinformed/components/ContentDetail/ContentSections";
import RelatedConcepts from "beinformed/containers/RelatedConcepts/RelatedConcepts";

import type { ContentModel, ContentLinkModel } from "beinformed/models";

type ContentDetailSectionProps = {
  entryDate: string,
  availableLanguages: Array<string>,
  content: ContentModel
};

type ContentDetailSectionState = {
  highlightSections: ContentLinkModel[]
};

class ContentDetailSection extends Component<
  ContentDetailSectionProps,
  ContentDetailSectionState
> {
  constructor(props: ContentDetailSectionProps) {
    super(props);

    this.state = {
      highlightSections: []
    };
  }

  /**
   * Save highlighted sections when a related concept is hovered
   */
  handleConceptEnter(relatedConcept: ConceptDetailModel) {
    this.setState({
      highlightSections: relatedConcept
        .getSourceReferenceCollection(this.props.availableLanguages)
        .all.map(sourceRef => sourceRef.link)
    });
  }

  /**
   * Remove highlighted sections when a related concept is no longer hovered
   */
  handleConceptLeave() {
    this.setState({
      highlightSections: []
    });
  }

  render() {
    const { content } = this.props;

    if (content) {
      const elements = [
        <div key="content-sections" className="col">
          <Helmet>
            <title>{content.label}</title>
          </Helmet>
          <ContentSections
            contentDetail={content}
            highlightSections={this.state.highlightSections}
          />
        </div>
      ];

      if (content.relatedConceptsHref) {
        elements.push(
          <div key="related-concepts" className="col-md-3">
            <RelatedConcepts
              content={content}
              entryDate={this.props.entryDate}
            />
          </div>
        );
      }

      return elements;
    }

    return null;
  }
}

export default ContentDetailSection;
