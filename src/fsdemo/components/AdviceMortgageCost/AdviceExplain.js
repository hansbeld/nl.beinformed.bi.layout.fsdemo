// @flow
import React, { Component } from "react";
import { Message } from "beinformed/i18n";

import AttributeValue from "beinformed/components/AttributeList/AttributeValue";

import { getChoiceOptionLabel } from "beinformed/components/FormInput/_util";

import "./ResultWhatWillMyMortgageCost.scss";

import type { FormModel } from "beinformed/models";

import "./AdviceExplain.scss";

type AdviceExplainProps = {
  form: FormModel
};

class AdviceExplain extends Component<AdviceExplainProps, {}> {
  renderValue(attribute: AttributeType, givenAnswerContent) {
    if (attribute.type === "money") {
      return `${attribute.currencySymbol} ${attribute.readonlyvalue}`;
    } else if (attribute.type === "choice" && givenAnswerContent !== null) {
      return attribute.options.selected
        .map(option =>
          getChoiceOptionLabel(option, givenAnswerContent).toLowerCase()
        )
        .join(", ");
    }

    return attribute.readonlyvalue;
  }

  renderDescription(description) {
    let descr = description;

    const allObjectCollections = [
      ...this.props.form.completeObjects,
      this.props.form.missingObjects,
      this.props.form.allEndResultObjects
    ];

    allObjectCollections.forEach(objectCollection => {
      objectCollection.all.forEach(formObject => {
        formObject.attributeCollection.all.forEach(attribute => {
          const questionContentConfig =
            formObject.contentConfiguration.questions;

          let givenAnswerContent = null;
          if (questionContentConfig !== null && attribute.type === "choice") {
            givenAnswerContent =
              formObject.contentConfiguration.questions.options;
          }

          descr = descr.replace(
            `\${${attribute.key}}`,
            `<mark>${this.renderValue(attribute, givenAnswerContent)}</mark>`
          );
        });
      });
    });

    return descr;
  }

  getTotalCostBlock(formResult, totalCostOfMortgage) {
    const descriptionContentConfig = formResult.contentConfiguration.endResults.config.find(
      config =>
        config.layouthint.has(`render-description:${totalCostOfMortgage.key}`)
    );

    return (
      <div className="total-cost">
        <h3>
          <Message id="AdviceExplain.title" defaultMessage="Your situation" />
        </h3>
        {descriptionContentConfig && (
          <div
            className="mortgage-cost-description"
            dangerouslySetInnerHTML={{
              __html: this.renderDescription(
                descriptionContentConfig.description
              )
            }}
          />
        )}
        <h3 className="title">
          {totalCostOfMortgage.getContentConfiguredLabel(
            descriptionContentConfig.resultElements
          )}
        </h3>
        <AttributeValue className="result" attribute={totalCostOfMortgage} />
      </div>
    );
  }

  getMonthlyCostBlock(formResult, initialMonthlyCost) {
    const descriptionContentConfig = formResult.contentConfiguration.endResults.config.find(
      config =>
        config.layouthint.has(`render-description:${initialMonthlyCost.key}`)
    );

    return (
      <div className="monthly-cost">
        <h3 className="title">
          {initialMonthlyCost.getContentConfiguredLabel(
            descriptionContentConfig.resultElements
          )}
        </h3>
        <AttributeValue className="result" attribute={initialMonthlyCost} />
        {descriptionContentConfig && (
          <div
            className="mortgage-cost-description"
            dangerouslySetInnerHTML={{
              __html: this.renderDescription(
                descriptionContentConfig.description
              )
            }}
          />
        )}
      </div>
    );
  }

  getTotalCostAttribute(form: FormModel) {
    const formResult = form.allEndResultObjects.first;

    if (formResult) {
      return formResult.attributeCollection.all.find(attribute =>
        attribute.key.includes("TotalCostOf")
      );
    }

    return null;
  }

  /*
   * Update rendering of result only on change of total cost,
   * this way the result is only updated after a round trip to the server and not on user input
   */
  shouldComponentUpdate(nextProps: ResultWhatWillMyMortgageCostProps) {
    const totalCostOfMortgage = this.getTotalCostAttribute(this.props.form);
    const nextTotalCostOfMortgage = this.getTotalCostAttribute(nextProps.form);

    return totalCostOfMortgage.value !== nextTotalCostOfMortgage.value;
  }

  render() {
    const formResult = this.props.form.allEndResultObjects.first;

    if (formResult) {
      const totalCostOfMortgage = this.getTotalCostAttribute(this.props.form);
      const initialMonthlyCost = formResult.attributeCollection.all.find(
        attribute => attribute.key.includes("StartingMonthlyPayment")
      );

      if (totalCostOfMortgage && initialMonthlyCost) {
        return (
          <div className="advice-explain">
            {this.getTotalCostBlock(formResult, totalCostOfMortgage)}
            {this.getMonthlyCostBlock(formResult, initialMonthlyCost)}
          </div>
        );
      }
    }

    return null;
  }
}

export default AdviceExplain;
