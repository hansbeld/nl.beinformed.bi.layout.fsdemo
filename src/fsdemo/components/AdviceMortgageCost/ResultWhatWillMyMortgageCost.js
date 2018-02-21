// @flow
import React from "react";
import { Message } from "beinformed/containers/I18n/Message";

import MortgageAdviceResult from "fsdemo/components/Advice/MortgageAdviceResult";

import ApplyForMortgageLink from "fsdemo/containers/ApplyForMortgage/ApplyForMortgageLink";
import AdviceExplain from "fsdemo/components/AdviceMortgageCost/AdviceExplain";

import "./ResultWhatWillMyMortgageCost.scss";

import type FormModel from "beinformed/models/form/FormModel";

type ResultWhatWillMyMortgageCostProps = {
  form: FormModel,
  doComparison: () => void,
  isComparing: boolean
};

const ResultWhatWillMyMortgageCost = ({
  form,
  isComparing,
  doComparison
}: ResultWhatWillMyMortgageCostProps) => {
  const formResult = form.allEndResultObjects.first;

  if (formResult) {
    return (
      <MortgageAdviceResult>
        <AdviceExplain form={form} />

        <div className="whatsnext">
          <h3>
            <Message
              id="ResultMortgageCost.whatsNext"
              defaultMessage="What&apos;s next?"
            />
          </h3>
          <p>
            <Message
              id="ResultMortgageCost.apply.description"
              defaultMessage="You can apply for your mortgage online."
            />
            <ApplyForMortgageLink btnType="popout" form={form} />
          </p>
          {isComparing ? (
            <p>
              <Message
                id="ResultMortgageCost.comparison.description"
                defaultMessage="You can add this mortgage advice to your comparison"
              />
              <button
                className="btn btn-block btn-popout mt-2"
                onClick={doComparison}
              >
                <Message
                  id="ResultMortgageCost.comparison.button"
                  defaultMessage="Add to comparison"
                />
              </button>
            </p>
          ) : (
            <p>
              <Message
                id="ResultMortgageCost.comparison.descriptionRates"
                defaultMessage="You can compare your mortgage with other mortgage rates."
              />
              <button
                className="btn btn-block btn-popout mt-2"
                onClick={doComparison}
              >
                <Message
                  id="ResultMortgageCost.comparison.buttonRates"
                  defaultMessage="Compare available rates"
                />
              </button>
            </p>
          )}
        </div>
      </MortgageAdviceResult>
    );
  }

  return null;
};

export default ResultWhatWillMyMortgageCost;
