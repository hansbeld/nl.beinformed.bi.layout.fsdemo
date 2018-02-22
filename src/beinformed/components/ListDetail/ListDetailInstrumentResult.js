// @flow
import React, { Component } from "react";

import { Message } from "beinformed/containers/I18n/Message";

import AttributeList from "beinformed/components/AttributeList/AttributeList";

import type ListDetailModel from "beinformed/models/list/ListDetailModel";

import EndResult from "beinformed/components/InstrumentResult/EndResult";

type ListDetailInstrumentResultProps = {
  detail: ListDetailModel
};

class ListDetailInstrumentResult extends Component<
  ListDetailInstrumentResultProps
> {
  renderResult() {
    const { detail } = this.props;

    if (detail.results) {
      return (
        <EndResult
          id={`result-${detail.key}-${detail.id}`}
          attributes={detail.results.children.all}
          contentConfiguration={detail.contentConfiguration}
        />
      );
    }

    return null;
  }

  renderGivenAnswers() {
    const { detail } = this.props;

    if (detail.givenAnswers) {
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

    return null;
  }

  render() {
    return (
      <div className="list-detail-instrument-result">
        {this.renderResult()}
        {this.renderGivenAnswers()}
      </div>
    );
  }
}
export default ListDetailInstrumentResult;
