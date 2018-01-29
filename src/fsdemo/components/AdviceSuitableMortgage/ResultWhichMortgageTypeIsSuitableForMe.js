// @flow
import React, { PureComponent } from "react";

import { Message, withMessage } from "beinformed/containers/I18n/Message";

import MortgageInstrumentLink from "fsdemo/components/MortgageInstruments/MortgageInstrumentLink";

import MortgageAdviceResult from "fsdemo/components/Advice/MortgageAdviceResult";
import SuitableMortgageOption from "fsdemo/components/AdviceSuitableMortgage/SuitableMortgageOption";

import type FormModel from "beinformed/models/form/FormModel";

type ResultWhichMortgageTypeIsSuitableForMeProps = {
  form: FormModel,
  message: messageFunctionType
};

const AMOUNT_TO_BORROW_INSTRUMENT_URI =
  "mortgage-calculators/calculators/calculate-possible-amount-to-borrow";
const TOTAL_COST_INSTRUMENT_URI =
  "mortgage-calculators/calculators/calculate-total-cost-of-mortgage";

class ResultWhichMortgageTypeIsSuitableForMe extends PureComponent<
  ResultWhichMortgageTypeIsSuitableForMeProps
> {
  getSuitableMortgagePackageId(suitableMortgage) {
    const firstSelectedOption = suitableMortgage.options.selected[0];
    const suitableMortageResult = firstSelectedOption.concept.getConceptPropertiesByIds(
      ["MortgageProductPackageId"]
    );

    return suitableMortageResult[0].value.replace("?", "=");
  }

  getAmountToBorrowLink(suitableMortgage) {
    if (suitableMortgage.options.selected.length === 1) {
      return `${AMOUNT_TO_BORROW_INSTRUMENT_URI}?${this.getSuitableMortgagePackageId(
        suitableMortgage
      )}`;
    }

    return AMOUNT_TO_BORROW_INSTRUMENT_URI;
  }

  getTotalCostLink(suitableMortgage) {
    if (suitableMortgage.options.selected.length === 1) {
      return `${TOTAL_COST_INSTRUMENT_URI}?${this.getSuitableMortgagePackageId(
        suitableMortgage
      )}`;
    }

    return TOTAL_COST_INSTRUMENT_URI;
  }

  render() {
    const whatWillItCostLabel = this.props.message(
      "Result.whatWillItCost",
      "What will it cost?"
    );
    const howMuchCanIBorrowLabel = this.props.message(
      "Result.howMuchCanIBorrowLabel",
      "How much can I borrow?"
    );

    const formResult = this.props.form.allEndResultObjects.get(
      "ClassifySuitableMortgage"
    );
    if (formResult) {
      const suitableMortgage = formResult.attributeCollection.getAttributeByKey(
        "SuitableMortgage"
      );

      return (
        <MortgageAdviceResult>
          <h3>{suitableMortgage.label}</h3>

          {suitableMortgage.options.selected.map(option => (
            <SuitableMortgageOption
              key={option.code}
              form={this.props.form}
              option={option}
            />
          ))}

          <div className="whatsnext">
            <h3>
              {" "}
              <Message id="Result.whatsNext" defaultMessage="What's next?" />
            </h3>

            <p>
              <Message
                id="Result.whatsNextBorrowDesccription"
                defaultMessage="Discover how much you could borrow based on your personal
            situation."
              />
              <MortgageInstrumentLink
                instrumentURI={this.getAmountToBorrowLink(suitableMortgage)}
                instrumentLabel={howMuchCanIBorrowLabel}
                dataId="howMuchCanIBorrow"
                btnType="popout"
              />
            </p>

            <p>
              <Message
                id="Result.whatsNextCostDescription"
                defaultMessage="Use our mortgage cost calculator to find out your monthly costs
            and compare rates."
              />
              <MortgageInstrumentLink
                instrumentURI={this.getTotalCostLink(suitableMortgage)}
                instrumentLabel={whatWillItCostLabel}
                dataId="whatWillItCost"
                btnType="popout"
              />
            </p>
          </div>
        </MortgageAdviceResult>
      );
    }

    return null;
  }
}

export default withMessage(ResultWhichMortgageTypeIsSuitableForMe);
