// @flow
import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";

import type ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

import type { Connector } from "react-redux";

import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";
import { handleError } from "beinformed/containers/Error/actions";

import FormContentProperties from "beinformed/components/FormContent/FormContentProperties";
import FormContentTextFragments from "beinformed/components/FormContent/FormContentTextFragments";
import FormContentSections from "beinformed/components/FormContent/FormContentSections";

import withModularUI from "beinformed/utils/modularui/withModularUI";

import {
  RENDER_CHILD_SECTIONS,
  RENDER_SECTION_LABEL,
  EMPHASIS,
  HALF_WIDTH,
  PROPERTY_SHOW_WHEN_EMPTY
} from "beinformed/constants/LayoutHints";

type FormContentRendererProps = {
  availableLanguages: Array<string>,
  concept: ConceptDetailModel | null,
  contentConfiguration?: ContentConfigurationElements | null,
  types: Array<string>,
  modularui: any,
  ContentWrapperComponent?: any,
  onError: (err: Error) => void,
  onFinish: () => void,
  onStart: () => void
};

type FormContentRendererState = {
  isFetching: boolean,
  content: Array<{
    type: string,
    contentModel: ContentModel
  }>
};

/**
 * Fetches content from a concept based on the content configuration received through
 * the contentConfiguration property and the concept model received trough the concept property
 *
 * With the types property specific types can be rendered.
 */
class FormContentRenderer extends Component<
  FormContentRendererProps,
  FormContentRendererState
> {
  static defaultProps = {
    types: ["contentElement", "textFragmentElement", "propertyElement"]
  };

  constructor(props: FormContentRendererProps) {
    super(props);

    this.state = {
      isFetching: false,
      content: []
    };
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.types.includes("contentElement");
  }

  componentDidMount() {
    this.fetchContent();
  }

  fetchContent() {
    const concept = this.props.concept;
    const contentConfig = this.props.contentConfiguration;

    if (
      !this.state.isFetching &&
      this.props.types.includes("contentElement") &&
      concept &&
      contentConfig &&
      contentConfig.hasContent()
    ) {
      const contentElementConfigs = contentConfig.byTypes(["contentElement"]);

      const sourceReferences = [];
      if (contentElementConfigs.length > 0) {
        this.setState({
          isFetching: true
        });

        contentElementConfigs.forEach(contentElementConfig => {
          const withChildSections = contentElementConfig.layouthint.has(
            RENDER_CHILD_SECTIONS
          );

          const sourceReferenceRequests = concept
            .getSourceReferenceCollection(this.props.availableLanguages)
            .byTypes(contentElementConfig.types)
            .map(sourceReference => {
              const request = this.props.modularui(
                sourceReference.link.selfhref
              );

              return request
                .fetchContent(withChildSections)
                .then(contentModel => ({
                  type: sourceReference.type,
                  contentModel
                }));
            });

          sourceReferences.push(...sourceReferenceRequests);
        });

        this.props.onStart();
        Promise.all(sourceReferences)
          .then(content => {
            this.setState({
              isFetching: false,
              content
            });

            return this.props.onFinish();
          })
          .catch(err => this.props.onError(err));
      }
    }
  }

  configClass(config) {
    return classNames({
      emphasis: config.layouthint.has(EMPHASIS),
      "col-6": config.layouthint.has(HALF_WIDTH)
    });
  }

  renderContentElement(config, index) {
    if (this.state.content.length > 0) {
      return (
        <FormContentSections
          key={`${config.type}-${index}`}
          className={this.configClass(config)}
          content={this.state.content
            .filter(contentItem => config.types.includes(contentItem.type))
            .map(contentItem => contentItem.contentModel)}
          renderChildSections={config.layouthint.has(RENDER_CHILD_SECTIONS)}
          renderSectionLabel={config.layouthint.has(RENDER_SECTION_LABEL)}
        />
      );
    }
    return null;
  }

  renderTextFragmentElement(
    config: Object,
    concept: ConceptDetailModel,
    index: number
  ) {
    const textFragments = concept.getTextFragmentByKeys(config.types);
    if (textFragments.length > 0) {
      return (
        <FormContentTextFragments
          key={`${config.type}-${index}`}
          className={this.configClass(config)}
          textfragments={textFragments}
        />
      );
    }
    return null;
  }

  renderPropertiesElement(
    config: Object,
    concept: ConceptDetailModel,
    index: number
  ) {
    const properties = concept.getConceptPropertiesByIds(config.types);

    if (properties.length > 0) {
      return (
        <FormContentProperties
          key={`${config.type}-${index}`}
          className={this.configClass(config)}
          properties={concept.getConceptPropertiesByIds(config.types)}
          renderEmpty={config.layouthint.has(PROPERTY_SHOW_WHEN_EMPTY)}
        />
      );
    }

    return null;
  }

  contentRender(config: Object, concept: ConceptDetailModel, index: number) {
    switch (config.type) {
      case "contentElement":
        return this.renderContentElement(config, index);

      case "textFragmentElement":
        return this.renderTextFragmentElement(config, concept, index);

      case "propertyElement":
        return this.renderPropertiesElement(config, concept, index);

      default:
        return null;
    }
  }

  render() {
    const contentConfig = this.props.contentConfiguration;
    const concept = this.props.concept;

    if (!contentConfig || !concept) {
      return null;
    }

    const content = contentConfig
      .byTypes(this.props.types)
      .map((config, i) => this.contentRender(config, concept, i))
      .filter(renderedContent => renderedContent !== null);

    if (content.length === 0) {
      return null;
    }

    const ContentWrapperComponent = this.props.ContentWrapperComponent;
    if (ContentWrapperComponent) {
      return React.cloneElement(ContentWrapperComponent, {
        children: <div className="content">{content}</div>
      });
    }

    return <div className="content">{content}</div>;
  }
}

/**
 * Map state to props
 */
type ownPropsProps = {
  concept: ConceptDetailModel | null,
  contentConfiguration?: ContentConfigurationElements | null,
  types?: Array<string>,
  ContentWrapperComponent?: any
};

const mapStateToProps = (state: State, ownProps: ownPropsProps) => ({
  availableLanguages: state.i18n.locales.availableLocaleCodes,
  ...ownProps
});

const connector: Connector<ownPropsProps, FormContentRendererProps> = connect(
  mapStateToProps,
  {
    onStart: startProgress,
    onFinish: finishProgress,
    onError: handleError
  }
);

export default connector(withModularUI(FormContentRenderer));
