// @flow
import React, { Component } from "react";
import withModularUI from "beinformed/utils/modularui/withModularUI";

import FormBody from "beinformed/containers/Form/FormBody";

import FormModel from "beinformed/models/form/FormModel";

type ApplyForMortgageRiskProfileProps = {
  panel: PanelType,
  modularui: any
};

type ApplyForMortgageRiskProfileState = {
  form: FormModel | null
};

class ApplyForMortgageRiskProfile extends Component<
  ApplyForMortgageRiskProfileProps,
  ApplyForMortgageRiskProfileState
> {
  constructor(props: ApplyForMortgageRiskProfileProps) {
    super(props);

    this.state = {
      form: null
    };
  }

  componentDidMount() {
    if (this.state.form === null) {
      this.retrievePanelForm(this.props.panel);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { panel } = this.props;
    console.info("panel", panel, this.state.form);
    if (
      panel.listItemCollection.isEmpty &&
      nextProps.panel.listItemCollection.hasItems
    ) {
      this.retrievePanelForm(nextProps.panel);
    } else if (!panel.listItemCollection.isEmpty) {
      const oldRowId = this.props.panel.listItemCollection.first.id;
      const newRowId = nextProps.panel.listItemCollection.first.id;

      if (oldRowId !== newRowId) {
        this.retrievePanelForm(nextProps.panel);
      }
    }
  }

  retrievePanelForm(panel) {
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

  render() {
    if (this.state.form !== null) {
      return (
        <FormBody
          form={this.state.form}
          formLayout="vertical"
          autosubmit={true}
        />
      );
    }
    return <div>{this.props.panel.label}</div>;
  }
}

export default withModularUI(ApplyForMortgageRiskProfile);
