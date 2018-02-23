// @flow
import React, { Component } from "react";
import { withMessage } from "beinformed/containers/I18n/Message";

import AlertOutlineIcon from "mdi-react/AlertOutlineIcon";

import ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";
import { getResults } from "beinformed/components/InstrumentResult/EndResult";
import FormResult from "fsdemo/components/Advice/FormResult";

import MortgageInstrumentLink from "fsdemo/components/MortgageInstruments/MortgageInstrumentLink";

import "./SuitableMortgageOption.scss";

import type FormModel from "beinformed/models/form/FormModel";

type SuitableMortgageExplainProps = {
  form: FormModel,
  user?: UserModel,
  option: ChoiceAttributeOptionModel,
  message: messageFunctionType
};

type SuitableMortgageExplainState = {
  showExplain: boolean
};

class SuitableMortgageOption extends Component<
  SuitableMortgageExplainProps,
  SuitableMortgageExplainState
> {
  constructor(props: SuitableMortgageExplainProps) {
    super(props);

    this.state = {
      showExplain: false
    };
  }

  renderOptionWithExplain(formResult, showIcon: boolean) {
    const { option } = this.props;

    return (
      <div className="attribute-value suitable-mortgage-option">
        {showIcon && (
          <span
            className="result-explain-icon"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onClick={() => {
              this.setState({
                showExplain: !this.state.showExplain
              });
            }}
            onKeyDown={() => {
              this.setState({
                showExplain: !this.state.showExplain
              });
            }}
            tabIndex="0"
            role="button"
            aria-haspopup="true"
            aria-expanded={this.state.popoverVisible}
          >
            <AlertOutlineIcon />
          </span>
        )}

        <span className="result">
          {option.concept.getLabelElementByIds("ResultLabel")[0].value}
        </span>

        {this.state.showExplain &&
          formResult
            .filter(
              result =>
                result.attributes.length > 0 &&
                result.attributes[0].value === "false"
            )
            .map((result, i) => (
              <FormResult
                key={`${result.key}-${i}`}
                className="suitable-mortgage-explain"
                id={result.key}
                attributes={result.attributes}
                contentConfiguration={result.config}
              />
            ))}
      </div>
    );
  }

  renderOptionWithLink() {
    const { option } = this.props;
    if (!option || !option.concept) {
      throw new Error("No suitable mortgage option or concept found");
    }

    const eligibilityQuickScanURIProp = option.concept.getConceptPropertiesByIds(
      ["EligibilityQuickScanURI"]
    );

    if (
      !eligibilityQuickScanURIProp ||
      eligibilityQuickScanURIProp.length === 0
    ) {
      throw new Error(
        `No property with id EligibilityQuickScanURI found on concept with label ${
          option.concept.label
        }`
      );
    }

    const formUri = eligibilityQuickScanURIProp[0].value;

    return (
      <div className="attribute-value suitable-mortgage-option">
        <span className="result">
          {option.concept.getLabelElementByIds("ResultLabel")[0].value}
        </span>

        <MortgageInstrumentLink
          instrumentURI={`mortgage-calculators/calculators/${formUri}`}
          instrumentLabel={this.props.message(
            "SuitableMortgageOptions.Eligible",
            "Eligible ?"
          )}
          className="eligibility-link"
          dataId={option.concept.key}
          showEllipsis
          hideOtherForms={false}
          isModal
        />
      </div>
    );
  }

  render() {
    const { form, option } = this.props;
    const explainObject = form.allEndResultObjects.all.find(formObject =>
      formObject.layouthint.has(`explains:${option.code}`)
    );

    const hasExplain = typeof explainObject !== "undefined";

    if (hasExplain) {
      const attributes = explainObject.attributeCollection.all;
      const contentConfig = explainObject.contentConfiguration;

      const formResults = getResults(attributes, contentConfig);

      const isEligiableGroup = formResults.find(
        formResult =>
          formResult.attributes.length > 0 &&
          formResult.attributes[0].key.includes("EligibleFor")
      );

      if (typeof isEligiableGroup !== "undefined") {
        const renderExplainIcon =
          isEligiableGroup.attributes[0].value.toString() === "false";

        return this.renderOptionWithExplain(formResults, renderExplainIcon);
      }
    }

    return this.renderOptionWithLink();
  }
}

export default withMessage(SuitableMortgageOption);
