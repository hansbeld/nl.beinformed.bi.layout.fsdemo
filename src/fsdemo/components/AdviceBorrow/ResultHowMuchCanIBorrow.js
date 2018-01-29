// @flow
import React from "react";

import { Message, withMessage } from "beinformed/containers/I18n/Message";

import AttributeValue from "beinformed/components/AttributeList/AttributeValue";
import MortgageInstrumentLink from "fsdemo/components/MortgageInstruments/MortgageInstrumentLink";

import MortgageAdviceResult from "fsdemo/components/Advice/MortgageAdviceResult";

import type FormModel from "beinformed/models/form/FormModel";

const ResultHowMuchCanIBorrow = ({
  form,
  message
}: {
  form: FormModel,
  message: messageFunctionType
}) => {
  const formResult = form.allEndResultObjects.first;

  const whatWillItCostLabel = message(
    "Result.whatWillItCost",
    "What will it cost?"
  );

  if (formResult) {
    const PossibleAmountToBorrow = formResult.attributeCollection.all.find(
      attribute => attribute.key.includes("AmountToBorrow")
    );
    const TotalPropertyBudget = formResult.attributeCollection.all.find(
      attribute => attribute.key.includes("TotalPropertyBudget")
    );

    if (!form.completeObjects) {
      throw new Error("No complete objects avalable for form");
    }

    const whatWillItCostBaseLink =
      "mortgage-calculators/calculators/calculate-total-cost-of-mortgage";

    if (form.completeObjects.length === 0) {
      throw new Error(
        "No completed objects found, can not resolve MortgageProductPackage attribute"
      );
    }

    const mortgageProductPackage = form.completeObjects[0]
      .get("Mortgage")
      .attributeCollection.all.find(attribute =>
        attribute.key.includes("MortgageProductPackage")
      );
    const whatWillItCostLink = (() => {
      if (mortgageProductPackage.options.selected.length === 1) {
        return `${whatWillItCostBaseLink}?MortgageProductPackage=${
          mortgageProductPackage.value
        }`;
      }
      return whatWillItCostBaseLink;
    })();

    if (PossibleAmountToBorrow && TotalPropertyBudget) {
      return (
        <MortgageAdviceResult>
          <h3>
            {
              PossibleAmountToBorrow.concept.getLabelElementByIds(
                "ResultLabel"
              )[0].value
            }
          </h3>
          <AttributeValue
            className="result"
            attribute={PossibleAmountToBorrow}
          />

          <h3>
            {
              TotalPropertyBudget.concept.getLabelElementByIds("ResultLabel")[0]
                .value
            }
          </h3>
          <AttributeValue className="result" attribute={TotalPropertyBudget} />

          <div className="whatsnext">
            <h3>
              <Message id="Result.whatsNext" defaultMessage="What's next?" />
            </h3>
            <p>
              <Message
                id="Result.whatsNextCostDescription"
                defaultMessage="Use our mortgage cost calculator to find out your monthly costs
              and compare rates."
              />
              <MortgageInstrumentLink
                instrumentURI={whatWillItCostLink}
                instrumentLabel={whatWillItCostLabel}
                dataId="whatWillItCost"
                btnType="popout"
              />
            </p>
          </div>
        </MortgageAdviceResult>
      );
    }
  }

  return null;
};

export default withMessage(ResultHowMuchCanIBorrow);
