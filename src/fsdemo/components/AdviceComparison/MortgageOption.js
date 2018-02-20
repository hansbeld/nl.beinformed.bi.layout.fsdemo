// @flow
import React, { Component } from "react";
import classNames from "classnames";

import ChevronLeftIcon from "mdi-react/ChevronLeftIcon";
import ChevronRightIcon from "mdi-react/ChevronRightIcon";
import CheckboxBlankOutlineIcon from "mdi-react/CheckboxBlankOutlineIcon";
import CheckboxMarkedOutlineIcon from "mdi-react/CheckboxMarkedOutlineIcon";

import { Message } from "beinformed/containers/I18n/Message";

import { getChoiceOptionLabel } from "beinformed/components/FormInput/_util";

import MortgageOptionDetail from "fsdemo/components/AdviceComparison/MortgageOptionDetail";

import "./MortgageOption.scss";

import type { MortgageData } from "fsdemo/components/AdviceMortgageCost/AdviceMortgageCost";

type MortgageOptionProps = {
  mortgage: MortgageData,
  onPinClick: Function,
  onDetailClick: (detailPosition: number) => void
};

type MortgageOptionState = {
  isOpen: boolean
};

class MortgageOption extends Component<
  MortgageOptionProps,
  MortgageOptionState
> {
  _detail: HTMLDivElement;

  constructor(props: MortgageOptionProps) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  renderValue(attribute: AttributeType) {
    if (!attribute) {
      return "---";
    } else if (attribute.type === "money") {
      return `${attribute.currencySymbol} ${attribute.readonlyvalue}`;
    } else if (attribute.type === "choice") {
      const questionContentConfig = this.props.mortgage.mortgageForm
        .allEndResultObjects.first.contentConfiguration.questions;

      let givenAnswerContent = null;
      if (questionContentConfig !== null) {
        givenAnswerContent = questionContentConfig.answers;

        return attribute.options.selected
          .map(option => getChoiceOptionLabel(option, givenAnswerContent))
          .join(", ");
      }
    }

    return attribute.readonlyvalue;
  }

  getOptionLabel(attributeKey: string) {
    const choiceAttribute = this.props.mortgage.mortgageForm.findAttribute(
      attribute => attribute.key === attributeKey
    );

    if (!choiceAttribute) {
      throw new Error(`Cannot find attribute with key ${attributeKey}`);
    }

    const questionContentConfig = this.props.mortgage.mortgageForm
      .allEndResultObjects.first.contentConfiguration.questions;

    if (questionContentConfig !== null) {
      const optionsContent = questionContentConfig.options;

      return getChoiceOptionLabel(
        choiceAttribute.options.selected[0],
        optionsContent
      );
    }

    return `${choiceAttribute.options.selected[0].label} years`;
  }

  renderHeader() {
    return (
      <div className="mortgage-header">
        {`${this.getOptionLabel("PeriodOfInterestRate")} ${this.getOptionLabel(
          "InterestRateType"
        ).toLowerCase()} `}
        {this.state.isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </div>
    );
  }

  toggleDetail() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const mortgage = this.props.mortgage;
    const endResultAttributes =
      mortgage.mortgageForm.allEndResultObjects.first.attributeCollection;

    return [
      <div
        key="column"
        className={classNames("mortgage-col mortgage-option", {
          active: this.state.isOpen
        })}
        ref={c => {
          this._detail = c;
        }}
      >
        <div
          className="mortgage-details"
          onClick={() => this.toggleDetail()}
          onKeyPress={e => {
            if (e.key === "Enter" || e.key === "Space") {
              this.toggleDetail();
            }
          }}
          role="button"
          tabIndex="0"
        >
          {this.renderHeader()}
          <div>{this.getOptionLabel("MortgageProductPackage")}</div>
          <div>{this.getOptionLabel("InterestRateType")}</div>
          <div>
            {this.renderValue(
              endResultAttributes.getAttributeByKey("InitialInterestRate")
            )}%
          </div>
          <div>
            {this.renderValue(
              endResultAttributes.getAttributeByKey("StartingMonthlyPayment")
            )}
          </div>
          <div>
            {this.renderValue(
              endResultAttributes.getAttributeByKey("PaymentForASpecificMonth")
            )}
          </div>
          <div>{this.getOptionLabel("PeriodOfInterestRate")}</div>
          <div>
            {this.renderValue(
              endResultAttributes.getAttributeByKey("TotalMortgageFee")
            )}
          </div>
          <div>
            {this.renderValue(
              endResultAttributes.getAttributeByKey("TotalMortgageAmount")
            )}
          </div>
          <div>
            {this.renderValue(
              endResultAttributes.getAttributeByKey("TotalCostOfMortgage")
            )}
          </div>
        </div>
        <div className="mortgage-footer">
          {mortgage.isPinned ? (
            <button
              className="btn btn-dark btn-sm"
              onClick={this.props.onPinClick}
            >
              <CheckboxMarkedOutlineIcon className="textAfter" />
              <Message id="MortgageOption.unpin" defaultMessage="Unpin" />
            </button>
          ) : (
            <button
              className="btn btn-light btn-sm"
              onClick={this.props.onPinClick}
            >
              <CheckboxBlankOutlineIcon className="textAfter" />
              <Message
                id="MortgageOption.pin"
                defaultMessage="Pin for compare"
              />
            </button>
          )}
        </div>
      </div>,
      <MortgageOptionDetail
        key="detail"
        show={this.state.isOpen}
        mortgage={mortgage}
      />
    ];
  }
}

export default MortgageOption;
