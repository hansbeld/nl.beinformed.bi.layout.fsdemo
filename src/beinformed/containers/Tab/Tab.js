// @flow
import React, { Component } from "react";

import Tab from "beinformed/components/Tab/Tab";

import { Route, Switch } from "react-router-dom";

import Redirect from "beinformed/components/Redirect/Redirect";

import Href from "beinformed/models/href/Href";

import { modelSelector } from "beinformed/containers/ModularUI/selectors";
import connectModularUI from "beinformed/utils/modularui/connectModularUI";

import PanelRenderer from "beinformed/containers/Panel/PanelRenderer";
import CaseView from "beinformed/containers/CaseView/CaseView";
import Form from "beinformed/containers/Form/Form";

import TabModel from "beinformed/models/tab/TabModel";

import { loadModel } from "beinformed/containers/ModularUI/actions";

import type { Location, Match } from "react-router-dom";

type TabProps = {
  match: Match,
  location: Location,
  tab?: TabModel,
  activeComponent?: string,
  fetchTab: (href: Href) => void
};

class TabContainer extends Component<TabProps> {
  redirectToFirstComponent(tabComponent) {
    if (tabComponent) {
      const location = new Href(this.props.match.url);
      const firstTabComponent = tabComponent.href;

      if (this.props.match.isExact && firstTabComponent.startsWith(location)) {
        return <Redirect href={firstTabComponent} />;
      }
    }

    return null;
  }

  renderFormRoutes(tab) {
    return [
      tab.actionCollection,
      ...tab.taskGroupCollection.all.map(
        taskGroup => taskGroup.actionCollection
      )
    ]
      .filter(actionCollection => actionCollection.hasItems)
      .map((actionCollection, i) => (
        <Route
          key={`route${i}`}
          path={actionCollection.routePath}
          component={Form}
        />
      ));
  }

  render() {
    const { tab, location } = this.props;

    if (tab) {
      const tabComponents = [
        ...tab.components.filter(component => component.group === "component"),
        ...tab.components.filter(component => component.group === "search")
      ];

      const allComponents = tab.components.all
        .map(component => component.href.path)
        .join("|");

      return (
        <Tab {...this.props}>
          <Switch>
            {tab.components.hasItems &&
              this.redirectToFirstComponent(tab.components.first)}

            {this.renderFormRoutes(tab)}

            {tabComponents.length > 0 && (
              <Route
                path={`(${allComponents})`}
                render={({ match }) => (
                  <PanelRenderer
                    href={new Href(`${match.url}${location.search}`)}
                  />
                )}
              />
            )}

            <Route
              path={`${tab.selfhref.path}/:caseview/:caseid`}
              component={CaseView}
            />
          </Switch>
        </Tab>
      );
    }

    return null;
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: State, ownProps) => ({
  tab: modelSelector(state, ownProps.match.url)
});

const modularUIConfig = {
  load: ({ match }) => loadModel(match.url, TabModel),
  shouldLoad: ({ tab }) => !tab,
  shouldReload: (newProps, oldProps, hasReloadState) =>
    hasReloadState || newProps.match.url !== oldProps.match.url
};

export const connector = connectModularUI(modularUIConfig, mapStateToProps);
export default connector(TabContainer);
