// @flow
import React, { Component } from "react";
import { Message } from "beinformed/containers/I18n/Message";

import MortgageOption from "fsdemo/components/AdviceComparison/MortgageOption";

import FormModel from "beinformed/models/form/FormModel";

import type { MortgageData } from "../AdviceMortgageCost/AdviceMortgageCost";

import "./MortgageComparison.scss";

type MortgageComparisonProps = {
  comparison: Array<MortgageData>,
  onPinClick: Function
};

class MortgageComparison extends Component<MortgageComparisonProps> {
  _panel: HTMLDivElement;
  _options: HTMLDivElement;

  getTotalCostAttribute(form: FormModel) {
    const formResult = form.allEndResultObjects.first;

    if (formResult) {
      return formResult.attributeCollection.all.find(attribute =>
        attribute.key.includes("TotalCostOf")
      );
    }

    return null;
  }

  scroll() {
    if (this._panel) {
      this._panel.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  scrollToDetail(detailPosition) {
    if (this._options) {
      const scroll =
        detailPosition - this._options.getBoundingClientRect().left;
      this._options.scrollLeft = scroll;
    }
  }

  renderMortgageOption(mortgage: MortgageData, i: number) {
    return (
      <MortgageOption
        key={`${mortgage.key}-${i}`}
        mortgage={mortgage}
        onPinClick={() => this.props.onPinClick(mortgage)}
        onDetailClick={detailPosition => this.scrollToDetail(detailPosition)}
      />
    );
  }

  render() {
    if (this.props.comparison.length === 0) {
      return null;
    }

    return (
      <div
        className="mortgage-comparison"
        ref={c => {
          this._panel = c;
        }}
      >
        <h3>
          <Message
            id="MortgageComparison.MortgageOptions"
            defaultMessage="Mortgage options"
          />
        </h3>
        <div className="mortgage-comparison-table">
          <div className="mortgage-col mortgage-heading-fixed">
            <div className="mortgage-headings">
              <div className="mortgage-header">
                <Message
                  id="MortgageComparison.Details"
                  defaultMessage="Details"
                />
              </div>
              <div>
                <Message
                  id="MortgageComparison.MortgageType"
                  defaultMessage="Mortgage type"
                />
              </div>
              <div>
                <Message
                  id="MortgageComparison.MortgageRate"
                  defaultMessage="Rate type"
                />
              </div>
              <div>
                <Message
                  id="MortgageComparison.MortgageInitialRate"
                  defaultMessage="Initial rate"
                />
              </div>
              <div>
                <Message
                  id="MortgageComparison.MortgageInitialPayment"
                  defaultMessage="Initial monthly payment"
                />
              </div>
              <div>
                <Message
                  id="MortgageComparison.MortgageFollowonPayment"
                  defaultMessage="Follow-on montly payment"
                />
              </div>
              <div>
                <Message
                  id="MortgageComparison.MortgageTerm"
                  defaultMessage="Mortgage term"
                />
              </div>
              <div>
                <Message
                  id="MortgageComparison.MortgageFee"
                  defaultMessage="Total mortgage fee"
                />
              </div>
              <div>
                <Message
                  id="MortgageComparison.MortgageAmount"
                  defaultMessage="Total mortgage amount"
                />
              </div>
              <div>
                <Message
                  id="MortgageComparison.MortgageCost"
                  defaultMessage="Total mortgage cost"
                />
              </div>
              <div className="mortgage-footer">&nbsp;</div>
            </div>
          </div>

          <div
            className="mortgage-options"
            ref={c => {
              this._options = c;
            }}
          >
            {this.props.comparison
              // .filter(mortgage => mortgage.isComplete)
              .map((mortgage, i) => this.renderMortgageOption(mortgage, i))}
          </div>
        </div>
      </div>
    );
  }
}

export default MortgageComparison;
