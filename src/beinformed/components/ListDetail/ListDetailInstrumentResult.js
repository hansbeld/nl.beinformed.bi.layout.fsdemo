// @flow
import React from "react";

import { Message } from "beinformed/containers/I18n/Message";

import AttributeList from "beinformed/components/AttributeList/AttributeList";

import type ListDetailModel from "beinformed/models/list/ListDetailModel";

type ListDetailInstrumentResultProps = {
  detail: ListDetailModel
};

const ListDetailInstrumentResult = ({
  detail
}: ListDetailInstrumentResultProps) => (
  <div className="list-detail-instrument-result">
    {detail.results && (
      <div className="instrument-result-result mt-2">
        <h5>
          <Message
            id="ListDetailInstrumentResult.ResultTitle"
            defaultMessage="Result"
          />
        </h5>
        <AttributeList attributes={detail.results.children.all} />
      </div>
    )}

    {detail.givenAnswers && (
      <div className="instrument-result-given-answers mt-2">
        <h5>
          <Message
            id="ListDetailInstrumentResult.GivenAnswerTitle"
            defaultMessage="Given answers"
          />
        </h5>
        <AttributeList attributes={detail.givenAnswers.children.all} />
      </div>
    )}
  </div>
);

export default ListDetailInstrumentResult;
