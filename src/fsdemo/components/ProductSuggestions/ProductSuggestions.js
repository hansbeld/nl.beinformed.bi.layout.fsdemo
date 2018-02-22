// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Message } from "beinformed/containers/I18n/Message";

import textile from "textilejs";

import { handleError } from "beinformed/containers/Error/actions";

import ModularUI from "beinformed/modularui/ModularUIRequest";
import Href from "beinformed/models/href/Href";

import NotImplementedLink from "fsdemo/components/Link/NotImplementedLink";
import MortgageInstrumentLink from "fsdemo/components/MortgageInstruments/MortgageInstrumentLink";

import "./ProductSuggestions.scss";

// const rootConcept = "/Advice/ClassifyPersonalAdviceAccountSummary";
// const rootConcept = "/accounts/account/{case-id}/advice/personaladvice";

type ProductSuggestionsProps = {
  formUrl: string,
  locale: string
};

type ProductSuggestionsState = {
  isFetching: boolean,
  form: any
};

class ProductSuggestions extends PureComponent<
  ProductSuggestionsProps,
  ProductSuggestionsState
> {
  constructor(props: ProductSuggestionsProps) {
    super(props);
    this.state = {
      isFetching: false,
      form: null
    };
  }

  componentDidMount() {
    this.retrieveForm(this.props.locale);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.retrieveForm(nextProps.locale);
    }
  }

  renderTextFragment(text: string = "") {
    return {
      __html: text ? textile(text) : ""
    };
  }

  retrieveForm(locale) {
    const formHref = new Href(this.props.formUrl);

    if (!this.state.isFetching) {
      this.setState({
        isFetching: true
      });

      const request = new ModularUI(formHref, {
        method: "post",
        data: {}
      });
      request.locale = locale;

      request
        .fetch()
        .then(formModel => {
          this.setState({
            form: formModel
          });
        })
        .catch(err => handleError(err));
    }
  }

  renderLink(concept: ConceptDetailModel) {
    const uri = concept.getConceptPropertiesByIds("ButtonURI_1")[0].value;
    const label = concept.getLabelElementByIds("ButtonLabel")[0].value;

    return (
      <div className="instrument-button">
        {uri === "#" ? (
          <NotImplementedLink className="btn btn-primary">
            <Message messageId={label} defaultMessage={label} />
          </NotImplementedLink>
        ) : (
          <MortgageInstrumentLink
            instrumentURI={uri}
            instrumentLabel={label}
            btnType="primary"
          />
        )}
      </div>
    );
  }

  renderFormResults() {
    if (this.state.form === null) {
      return null;
    }

    const NUMBER_OF_SUGGESTIONS = 3;

    return (
      <div>
        <div className="suggestion">
          <h2>
            <Message
              id="ProductSuggestions.title"
              defaultMessage="You may also be interested in ..."
            />
          </h2>
        </div>
        <div className="instruments row">
          {this.state.form.allEndResultObjects.length > 0 &&
            this.state.form.allEndResultObjects.first.attributeCollection.results.map(
              attribute =>
                attribute.options.selected
                  .slice(0, NUMBER_OF_SUGGESTIONS)
                  .map((option, j) => (
                    <div key={j} className="col">
                      <div className="instrument">
                        <h3>{option.label}</h3>
                        <div
                          dangerouslySetInnerHTML={this.renderTextFragment(
                            option.concept.getTextFragmentByKeys(
                              "Description"
                            )[0].text
                          )}
                        />
                        {this.renderLink(option.concept)}
                      </div>
                    </div>
                  ))
            )}
        </div>
      </div>
    );
  }

  render() {
    return <div className="productsuggestions">{this.renderFormResults()}</div>;
  }
}

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  locale: state.i18n.locale
});

export default connect(mapStateToProps, {})(ProductSuggestions);
