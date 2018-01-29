// @flow
import React, { PureComponent } from "react";
import textile from "textilejs";
import withModularUI from "beinformed/utils/modularui/withModularUI";

import Icon from "beinformed/components/Icon/Icon";

import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";
import { handleError } from "beinformed/containers/Error/actions";

import Href from "beinformed/models/href/Href";

import ProductSuggestions from "fsdemo/components/ProductSuggestions/ProductSuggestions";
import "./ApplyForMortgageSubmitted.scss";

const rootConcept =
  "/concepts/Mortgage - Request primary residence mortgage/Business design/Model catalog/Mortgage application submitted.bixml/MortgageApplicationSubmitted";

type ApplyForMortgageSubmittedState = {
  isFetching: boolean,
  rootConcept: any
};

type ApplyForMortgageSubmittedProps = {
  modularui: any
};

class ApplyForMortgageSubmitted extends PureComponent<
  ApplyForMortgageSubmittedProps,
  ApplyForMortgageSubmittedState
> {
  constructor(props: ApplyForMortgageSubmittedProps) {
    super(props);

    this.state = {
      isFetching: false,
      rootConcept: null
    };
  }

  componentDidMount() {
    this.retrieveConcepts();
  }

  retrieveConcepts() {
    const rootConceptHref = new Href(rootConcept);

    if (!this.state.isFetching) {
      this.setState({
        isFetching: true
      });

      const request = this.props.modularui(rootConceptHref);

      startProgress();

      request
        .fetchFromCache()
        .then(rootConceptModel => {
          this.setState({
            isFetching: false,
            rootConcept: rootConceptModel
          });

          return finishProgress();
        })
        .catch(err => handleError(err));
    }
  }

  renderTextFragment(text: string = "") {
    return {
      __html: text ? textile(text) : ""
    };
  }

  renderSuccessText(text: string = "") {
    const LOAN_NUMBER_CUTOFF = 4;
    const newText = textile(text);
    const textWithNumber = newText.replace(
      "$MortgageLoanNumber",
      `<strong>${Date.now()
        .toString()
        .substring(LOAN_NUMBER_CUTOFF)}</strong>`
    );

    return this.renderTextFragment(textWithNumber);
  }

  render() {
    if (this.state.isFetching) {
      return null;
    }

    return (
      this.state.rootConcept && (
        <div className="apply-for-mortgage-submitted">
          <h2>{this.state.rootConcept.label}</h2>
          <div className="row pt-3">
            <div className="col-1 checkmark">
              <Icon name="check" size="4x" />
            </div>
            <div
              className="col"
              dangerouslySetInnerHTML={this.renderSuccessText(
                this.state.rootConcept.getTextFragmentByKeys("Description")[0]
                  .text
              )}
            />
          </div>
          <div
            className="pt-3"
            dangerouslySetInnerHTML={this.renderTextFragment(
              this.state.rootConcept.getTextFragmentByKeys("Description")[1]
                .text
            )}
          />
          <ProductSuggestions formUrl="/applications/advice/personaladvice" />
        </div>
      )
    );
  }
}

export default withModularUI(ApplyForMortgageSubmitted);
