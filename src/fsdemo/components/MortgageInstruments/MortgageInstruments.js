// @flow
import React, { PureComponent } from "react";
import { Message } from "beinformed/containers/I18n/Message";
import { Switch, Route, Link } from "react-router-dom";
import textile from "textilejs";

import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";
import { handleError } from "beinformed/containers/Error/actions";

import ModularUI from "beinformed/modularui/ModularUIRequest";
import Href from "beinformed/models/href/Href";

import MortgageInstrumentLink from "fsdemo/components/MortgageInstruments/MortgageInstrumentLink";

import MortgageAdvice from "fsdemo/containers/Advice/MortgageAdvice";
import ApplyForMortgageInformation from "fsdemo/components/ApplyForMortgage/ApplyForMortgageInformation";

import "./MortgageInstruments.scss";

const rootConcept =
  "/concepts/Mortgage%20-%20Overall%20advice/Business%20design/Model%20catalog/Mortgage%20calculators.bixml/MortgageCalculators";

type MortgageInstrumentsState = {
  isFetching: boolean,
  rootConcept: any,
  instruments: []
};

type MortgageInstrumentsProps = {
  locale: string
};

class MortgageInstruments extends PureComponent<
  MortgageInstrumentsProps,
  MortgageInstrumentsState
> {
  constructor(props: MortgageInstrumentsProps) {
    super(props);

    this.state = {
      isFetching: false,
      rootConcept: null,
      instruments: []
    };
  }

  componentDidMount() {
    this.retrieveConcepts(this.props.locale);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.retrieveConcepts(nextProps.locale);
    }
  }

  retrieveConcepts(locale) {
    const rootConceptHref = new Href(rootConcept);

    if (!this.state.isFetching) {
      this.setState({
        isFetching: true
      });

      const request = new ModularUI(rootConceptHref);
      request.locale = locale;

      startProgress();
      request
        .fetchFromCache()
        .then(rootConceptModel => {
          this.setState({
            rootConcept: rootConceptModel
          });

          const instrumentRequests = rootConceptModel.relationsCollection.all.map(
            relation => {
              const childReq = new ModularUI(relation.concept.selfhref);
              childReq.locale = locale;
              return childReq.fetchFromCache();
            }
          );
          return Promise.all(instrumentRequests);
        })
        .then(instrumentConcepts => {
          this.setState({
            isFetching: false,
            instruments: instrumentConcepts
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

  renderInstrumentRoutes() {
    return this.state.instruments.map(
      instrument =>
        instrument.key === "ApplyForAMortgage" ? (
          <Route
            key={instrument.key}
            path="/apply-for-mortgage-information"
            component={ApplyForMortgageInformation}
          />
        ) : (
          <Route
            key={instrument.key}
            path={`/${
              instrument.getConceptPropertiesByIds("ButtonURI_1")[0].value
            }`}
            component={MortgageAdvice}
          />
        )
    );
  }

  renderHeader() {
    return (
      this.state.rootConcept && (
        <div className="mortgage-calculators-header">
          <h2>{this.state.rootConcept.label}</h2>
          <div
            dangerouslySetInnerHTML={this.renderTextFragment(
              this.state.rootConcept.getTextFragmentByKeys("Description")[0]
                .text
            )}
          />
        </div>
      )
    );
  }

  renderInstruments() {
    return (
      this.state.instruments.length > 0 && (
        <div className="instruments row">
          {this.state.instruments.map((instrument, i) => (
            <div key={i} className="col">
              <div className="instrument">
                <h3>
                  {instrument.getLabelElementByIds("ButtonLabel")[0].value}
                </h3>
                <div
                  dangerouslySetInnerHTML={this.renderTextFragment(
                    instrument.getTextFragmentByKeys("Description")[0].text
                  )}
                />
                <div className="instrument-button">
                  {instrument.key === "ApplyForAMortgage" ? (
                    <Link
                      to="/apply-for-mortgage-information"
                      className="btn btn-primary"
                      data-id="ApplyForMortgageInformation"
                    >
                      {instrument.getLabelElementByIds("ButtonLabel")[0].value}
                    </Link>
                  ) : (
                    <MortgageInstrumentLink
                      instrumentURI={
                        instrument.getConceptPropertiesByIds("ButtonURI_1")[0]
                          .value
                      }
                      instrumentLabel={
                        instrument.getLabelElementByIds("ButtonLabel")[0].value
                      }
                      dataId={instrument.key}
                      btnType="primary"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    );
  }

  render() {
    if (this.state.isFetching) {
      return null;
    }

    return (
      <Switch>
        {this.renderInstrumentRoutes()}
        <Route>
          <div className="mortgage-instruments">
            {this.renderHeader()}

            {this.renderInstruments()}

            <div className="font-weight-bold mt-4">
              <Message
                id="MortgageInstruments.repossessed.warning"
                defaultMessage="Your home may be repossessed if you do not keep up repayments on your mortgage"
              />
            </div>
          </div>
        </Route>
      </Switch>
    );
  }
}

export default MortgageInstruments;
