// @flow
import React, { Component } from "react";

import ApplyForMortgageForm from "fsdemo/containers/ApplyForMortgage/ApplyForMortgageForm";

import { Href } from "beinformed/models";

type ApplyForMortgageRiskProfileProps = {
  panel: PanelType
};

type ApplyForMortgageRiskProfileState = {
  formHref: Href | null
};

class ApplyForMortgageRiskProfile extends Component<
  ApplyForMortgageRiskProfileProps,
  ApplyForMortgageRiskProfileState
> {
  constructor(props: ApplyForMortgageRiskProfileProps) {
    super(props);

    this.state = {
      formHref: null
    };
  }

  componentDidMount() {
    if (this.state.formHref === null) {
      this.retrievePanelForm(this.props.panel);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { panel } = this.props;

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
      this.setState({
        formHref: formAction.selfhref
      });
    }
  }

  render() {
    if (this.state.formHref !== null) {
      return (
        <ApplyForMortgageForm
          href={this.state.formHref}
          panel={this.props.panel}
        />
      );
    }

    return null;
  }
}

export default ApplyForMortgageRiskProfile;
