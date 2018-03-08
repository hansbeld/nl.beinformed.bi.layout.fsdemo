// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";

import textile from "textilejs";

import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";
import { handleError } from "beinformed/containers/Error/actions";

import ModularUI from "beinformed/modularui/ModularUIRequest";
import { Href } from "beinformed/models";

import MortgageInstrumentLink from "fsdemo/components/MortgageInstruments/MortgageInstrumentLink";

import "./ApplyForMortgageInformation.scss";

const rootConcept =
  "/concepts/Mortgage%20-%20Overall%20advice/Business%20design/Model%20catalog/Apply%20for%20a%20mortgage.bixml/ApplyForAMortgage";

type ApplyForMortgageInformationProps = {
  locale: string
};

class ApplyForMortgageInformation extends PureComponent<
  ApplyForMortgageInformationProps
> {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      rootConcept: null,
      information: []
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
          const informationRequests = rootConceptModel.relationsCollection.outgoing.map(
            relation => {
              const relationReq = new ModularUI(relation.concept.selfhref);
              relationReq.locale = locale;
              return relationReq.fetchFromCache();
            }
          );

          return Promise.all(informationRequests);
        })
        .then(informationConcepts => {
          this.setState({
            isFetching: false,
            information: informationConcepts
          });

          return finishProgress();
        })
        .catch(err => handleError(err));
    }
  }

  renderTextFragment(concept, id, item) {
    const fragment = concept.getTextFragmentByKeys(id);

    if (fragment.length >= item) {
      return {
        __html: fragment[item].text ? textile(fragment[item].text) : ""
      };
    }

    return {
      __html: ""
    };
  }

  render() {
    if (this.state.isFetching || this.state.information.length === 0) {
      return null;
    }

    return (
      <div className="apply-for-mortgage-information">
        <h3>{this.state.rootConcept.label}</h3>
        <div
          key={this.state.rootConcept.key}
          dangerouslySetInnerHTML={this.renderTextFragment(
            this.state.rootConcept,
            "Instruction",
            0
          )}
        />
        {this.state.information.map(information => [
          <h4 key={`${information.key}-label`}>
            {information.getLabelElementByIds("ActionLabel")[0].value}
          </h4>,
          <div
            key={`${information.key}-descr`}
            dangerouslySetInnerHTML={this.renderTextFragment(
              information,
              "Instruction",
              0
            )}
          />,
          information.key === "ApplyOnline" ? (
            <p key={`${information.key}-button`}>
              <MortgageInstrumentLink
                instrumentURI={
                  information.getConceptPropertiesByIds("ButtonURI")[0].value
                }
                instrumentLabel={
                  information.getLabelElementByIds("ButtonLabel")[0].value
                }
                btnType="primary"
              />
            </p>
          ) : (
            <div
              className="font-weight-bold mt-4"
              key={`${information.key}-descr2`}
              dangerouslySetInnerHTML={this.renderTextFragment(
                information,
                "Instruction",
                1
              )}
            />
          )
        ])}
      </div>
    );
  }
}

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  locale: state.i18n.locale
});

export default connect(mapStateToProps, {})(ApplyForMortgageInformation);
