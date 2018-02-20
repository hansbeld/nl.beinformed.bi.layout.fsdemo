// @flow
import React, { Component } from "react";

import AlertCircleOutlineIcon from "mdi-react/AlertCircleOutlineIcon";
import CheckCircleOutlineIcon from "mdi-react/CheckCircleOutlineIcon";

import NavigationItem from "beinformed/components/Navigation/NavigationItem";

import type ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";
import type LinkCollection from "beinformed/models/links/LinkCollection";

type NavigationStagesProps = {
  executableStages: ChoiceAttributeModel | null,
  items: LinkCollection,
  performedStages: ChoiceAttributeModel | null
};

class NavigationStages extends Component<NavigationStagesProps> {
  getStages() {
    const { items, executableStages, performedStages } = this.props;

    return items.links.map(link => {
      const newLink = link;
      const linkKey = link.key.replace(/_/g, "").toLowerCase();

      if (
        executableStages &&
        executableStages.selected.find(
          executableStage => executableStage.toLowerCase() === linkKey
        )
      ) {
        newLink.icon = <AlertCircleOutlineIcon className="textAfter" />;
      } else if (
        performedStages &&
        performedStages.selected.find(
          performedStage => performedStage.toLowerCase() === linkKey
        )
      ) {
        newLink.icon = <CheckCircleOutlineIcon className="textAfter" />;
      }

      return newLink;
    });
  }

  render() {
    return (
      <ul className="nav nav-tabs stages caseview-panel-tabs">
        {this.getStages().map(link => (
          <NavigationItem key={link.key} link={link} />
        ))}
      </ul>
    );
  }
}

export default NavigationStages;
