// @flow
import React, { Component } from "react";
import textile from "textilejs";
import withModularUI from "beinformed/utils/modularui/withModularUI";

import FormBody from "beinformed/containers/Form/FormBody";

import FormModel from "beinformed/models/form/FormModel";
import Href from "beinformed/models/href/Href";

import "./ApplyForMortgageSubmitRequest.scss";

type ApplyForMortgageSubmitRequestProps = {
  panel: PanelType,
  modularui: any
};

type ApplyForMortgageSubmitRequestState = {
  form: FormModel | null,
  whatsnext: any
};

class ApplyForMortgageSubmitRequest extends Component<
  ApplyForMortgageSubmitRequestProps,
  ApplyForMortgageSubmitRequestState
> {
  constructor(props: ApplyForMortgageSubmitRequestProps) {
    super(props);

    this.state = {
      form: null,
      whatsnext: null
    };
  }

  componentDidMount() {
    if (this.state.form === null) {
      this.retrievePanelForm();
    }

    if (this.state.whatsnext === null) {
      this.retrieveWhatsNextConcept();
    }
  }

  retrievePanelForm() {
    const { panel } = this.props;

    const formAction = panel.listItemCollection.isEmpty
      ? panel.actionCollection.getActionsByType("create").first
      : panel.listItemCollection.first.actionCollection.getActionsByType(
          "update"
        ).first;

    if (formAction) {
      this.props
        .modularui(formAction.selfhref, {
          method: "post"
        })
        .fetch()
        .then(riskForm => {
          this.setState({
            form: riskForm
          });
        });
    }
  }

  retrieveWhatsNextConcept() {
    this.props
      .modularui(
        new Href(
          "/concepts/Mortgage - Request primary residence mortgage/Business design/Model catalog/Next submit mortgage request.bixml/NextSubmitMortgageRequest"
        )
      )
      .fetchFromCache()
      .then(concept => {
        this.setState({
          whatsnext: concept
        });
      });
  }

  renderTextFragment(text: string = "") {
    return {
      __html: text ? textile(text) : ""
    };
  }

  render() {
    return (
      <div className="submit-request mb-4">
        {this.state.whatsnext !== null && (
          <div
            dangerouslySetInnerHTML={this.renderTextFragment(
              this.state.whatsnext.getTextFragmentByKeys("Description")[0].text
            )}
          />
        )}

        {this.state.form !== null && (
          <FormBody
            form={this.state.form}
            fullPageForms={true}
            autosubmit={true}
          />
        )}
      </div>
    );
  }
}

export default withModularUI(ApplyForMortgageSubmitRequest);
