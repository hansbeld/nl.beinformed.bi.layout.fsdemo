// @flow
import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import Href from "beinformed/models/href/Href";

import PanelRenderer from "beinformed/containers/Panel/PanelRenderer";

import NavigationTabs from "beinformed/components/Navigation/NavigationTabs";
import NavigationStages from "beinformed/components/Navigation/NavigationStages";

import Redirect from "beinformed/components/Redirect/Redirect";

import {
  OVERVIEW,
  DAP_STAGES_EXECUTABLE,
  DAP_STAGES_PERFORMED,
  STAGESVIEW
} from "beinformed/constants/LayoutHints";

import "./CaseViewPanels.scss";

import type CaseViewModel from "beinformed/models/caseview/CaseViewModel";
import type { Location, Match } from "react-router-dom";

type CaseViewPanelsProps = {
  caseview: CaseViewModel,
  location: Location,
  match: Match
};

/**
 * Render Case view panels
 */
class CaseViewPanels extends Component<CaseViewPanelsProps> {
  renderTabs() {
    const { caseview } = this.props;

    if (caseview.layouthint.has(STAGESVIEW)) {
      return (
        <NavigationStages
          items={caseview.panelLinks}
          executableStages={caseview.attributeCollection.getChoiceAttributeByLayoutHint(
            DAP_STAGES_EXECUTABLE
          )}
          performedStages={caseview.attributeCollection.getChoiceAttributeByLayoutHint(
            DAP_STAGES_PERFORMED
          )}
        />
      );
    }

    return (
      <NavigationTabs
        className="caseview-panel-tabs"
        items={caseview.panelLinks}
      />
    );
  }

  render() {
    const { caseview, location, match } = this.props;

    const renderAsOverview = caseview.layouthint.has(OVERVIEW);

    // Layout hint overview renders all panels of the caseview
    if (renderAsOverview) {
      return (
        <div className="caseview-panels">
          {caseview.panelLinks.all.map(panelLink => (
            <PanelRenderer key={panelLink.key} href={panelLink.href} />
          ))}
        </div>
      );
    }

    const hasActivePanelLink = caseview.panelLinks.all.find(panelLink =>
      new Href(location.pathname).startsWith(panelLink.href)
    );

    return (
      <div className="caseview-panels">
        {this.renderTabs()}

        <Route
          path={caseview.panelLinks.routePath}
          render={props => (
            <PanelRenderer
              href={new Href(`${props.match.url}${location.search}`)}
              isTab
            />
          )}
        />

        {!hasActivePanelLink &&
          caseview.panelLinks.first &&
          match.isExact && <Redirect href={caseview.panelLinks.first.href} />}
      </div>
    );
  }
}

export default withRouter(CaseViewPanels);
