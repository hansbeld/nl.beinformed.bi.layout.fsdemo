// @flow
import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import Redirect from "beinformed/components/Redirect/Redirect";

import AccountPanelRenderer from "fsdemo/containers/Account/AccountPanelRenderer";

import ListModel from "beinformed/models/list/ListModel";
import NavigationItem from "beinformed/components/Navigation/NavigationItem";

import QuickTransfer from "fsdemo/containers/QuickTransfer/QuickTransfer";
import Breadcrumb from "fsdemo/components/Breadcrumb/Breadcrumb";

import "./AccountPanel.scss";

import type CaseViewModel from "beinformed/models/caseview/CaseViewModel";
import Href from "beinformed/models/href/Href";
type AccountPanelProps = {
  caseview: CaseViewModel,
  onClick: Function
};

class AccountPanel extends Component<AccountPanelProps> {
  renderAccountNavigation() {
    const items = this.props.caseview.links.getLinksByGroup("panel");

    return (
      <nav className="col-3">
        <ul className="account-navigation nav flex-column">
          {items.links.map(link => (
            <NavigationItem key={link.key} className="" link={link} />
          ))}
        </ul>
      </nav>
    );
  }

  getList(panel: ListModel) {
    if (panel.key === "AccountSummary") {
      panel.actionCollection.collection = [];
    }

    return panel;
  }

  render() {
    const hasActivePanelLink = this.props.caseview.panelLinks.all.find(
      panelLink => new Href(location.pathname).startsWith(panelLink.href)
    );

    return (
      <div className="account-wrapper">
        <Breadcrumb />
        <div className="row">
          {this.renderAccountNavigation()}
          <div className="col">
            <div className="account-panel">
              <Route
                path={this.props.caseview.panelLinks.routePath}
                render={props => (
                  <AccountPanelRenderer
                    href={new Href(`${props.match.url}${location.search}`)}
                  />
                )}
              />

              {!hasActivePanelLink &&
                this.props.caseview.panelLinks.first &&
                this.props.match.isExact && (
                  <Redirect href={this.props.caseview.panelLinks.first.href} />
                )}
            </div>

            <QuickTransfer
              href={
                new Href(
                  `${this.props.caseview.selfhref.path}/summary/transfer`
                )
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(AccountPanel);
