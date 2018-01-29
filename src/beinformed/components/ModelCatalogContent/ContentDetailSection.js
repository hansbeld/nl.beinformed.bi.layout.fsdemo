// @flow
import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import ContentSections from "beinformed/components/ContentDetail/ContentSections";
import RelatedConcepts from "beinformed/components/ContentDetail/RelatedConcepts";

import type ContentModel from "beinformed/models/content/ContentModel";
import type ContentLinkModel from "beinformed/models/content/ContentLinkModel";

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
      return (
        <Fragment>
          <div className="col">
            <Helmet>
              <title>{content.label}</title>
            </Helmet>
            <ContentSections
              contentDetail={content}
              highlightSections={this.state.highlightSections}
            />
          </div>
          {content.relatedConceptsHref && (
            <div className="col-md-3">
              <RelatedConcepts
                content={content}
                entryDate={this.props.entryDate}
              />
            </div>
          )}
        </Fragment>
      );
    }

    return null;
  }
}

export default ContentDetailSection;
