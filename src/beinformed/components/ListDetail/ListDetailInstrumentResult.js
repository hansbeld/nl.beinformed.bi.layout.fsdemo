// @flow
import React, { Component } from "react";

import { Message } from "beinformed/containers/I18n/Message";

import AttributeList from "beinformed/components/AttributeList/AttributeList";

import type ListDetailModel from "beinformed/models/list/ListDetailModel";

import FormContentRenderer from "beinformed/components/FormContent/FormContentRenderer";

import FormattedText from "beinformed/components/FormattedText/FormattedText";

type ListDetailInstrumentResultProps = {
  detail: ListDetailModel
};

class ListDetailInstrumentResult extends Component<
  ListDetailInstrumentResultProps
> {
  renderResult() {
    const { detail } = this.props;

    return (
      <div className="instrument-result-result mt-2">
        <h5>
          <Message
            id="ListDetailInstrumentResult.ResultTitle"
            defaultMessage="Result"
          />
        </h5>

        {detail.contentConfiguration.endResults &&
          detail.contentConfiguration.endResults.config
            .filter(config => {
              const attributeKeys = config.attributes;
              const foundAttributes = detail.results.children.all.filter(
                attr => attr.value !== null && attributeKeys.includes(attr.name)
              );
              return foundAttributes.length > 0;
            })
            .map(config => {
              const attributes = detail.results.children.all.filter(attr =>
                config.attributes.includes(attr.name)
              );

              return (
                <div key={config.label}>
                  <h3>{config.label}</h3>
                  {config.description && (
                    <FormattedText text={config.description} />
                  )}
                  <AttributeList attributes={attributes} />
                  {this.renderContent(attributes)}
                </div>
              );
            })}
      </div>
    );
  }

  renderGivenAnswers() {
    const { detail } = this.props;
    return (
      <div className="instrument-result-given-answers mt-2">
        <h5>
          <Message
            id="ListDetailInstrumentResult.GivenAnswerTitle"
            defaultMessage="Given answers"
          />
        </h5>
        <AttributeList attributes={detail.givenAnswers.children.all} />
      </div>
    );
  }

  renderContent(attributes: Array<AttributeType>) {
    const { detail } = this.props;
    const endResults = detail.contentConfiguration.endResults;

    if (!endResults) {
      return null;
    }

    const positiveResultsRendering = attributes
      .filter(attribute => attribute.type === "choice")
      .map(attribute => {
        const contentConfig = endResults.getContentConfigurationElementsForAttribute(
          attribute.key
        );

        if (contentConfig) {
          const positiveContentConfig = contentConfig.positiveResultElements;

          return attribute.options.all
            .filter(
              option =>
                option.concept !== null && option.code === attribute.value
            )
            .map(option => (
              <FormContentRenderer
                key={option.code}
                concept={option.concept}
                contentConfiguration={positiveContentConfig}
                renderLabel={true}
              />
            ));
        }

        return null;
      });

    return (
      <div id="results" className="card-body">
        {positiveResultsRendering}
      </div>
    );
  }

  render() {
    const { detail } = this.props;
    return (
      <div className="list-detail-instrument-result">
        {detail.results && this.renderResult()}
        {this.renderGivenAnswers()}
      </div>
    );
  }
}
export default ListDetailInstrumentResult;
