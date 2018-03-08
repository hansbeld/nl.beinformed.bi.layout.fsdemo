// @flow
import React, { Component } from "react";
import classNames from "classnames";
import { Route, withRouter } from "react-router-dom";

import { Href } from "beinformed/models";
import Redirect from "beinformed/components/Redirect/Redirect";

import PanelRenderer from "beinformed/containers/Panel/PanelRenderer";

import FormattedText from "beinformed/components/FormattedText/FormattedText";
import NavigationTabs from "beinformed/components/Navigation/NavigationTabs";
import TaskGroupPanels from "beinformed/components/TaskGroup/TaskGroupPanels";
import Panel from "beinformed/components/Panel/Panel";
import PanelBody from "beinformed/components/Panel/PanelBody";
import Form from "beinformed/containers/Form/Form";

import "./GroupingPanel.scss";

import type { GroupingPanelModel } from "beinformed/models";
import type { Location } from "react-router-dom";

type GroupingPanelProps = {
  isTab?: boolean,
  panel: GroupingPanelModel,
  location: Location
};

/**
 * Rendering of a GroupingPanel
 */
class GroupingPanel extends Component<GroupingPanelProps> {
  renderFormRoutes(panel) {
    return [
      ...panel.taskGroupCollection.all.map(
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
    const { panel, isTab, location } = this.props;

    // When more than one panel, and the caseview where this grouping panel belongs to is not a Stages View, then render tabs
    const renderAsOverview = panel.links.size === 1 || isTab;

    const mainPanelClass = classNames({
      "col-9 col-xl-10": panel.hasTasks(),
      "col-12": !panel.hasTasks()
    });

    const panelClass = classNames("groupingpanel", {
      "tab-pane": isTab
    });

    const hasActivePanelLink = panel.panelLinks.all.find(panelLink =>
      new Href(location.pathname).startsWith(panelLink.href)
    );

    return (
      <Panel dataId={panel.key} className={panelClass}>
        <PanelBody>
          {!renderAsOverview && (
            <div className="panel-label">{panel.label}</div>
          )}

          <div className="row">
            <div className={mainPanelClass}>
              {panel.introtext && (
                <FormattedText className="introtext" text={panel.introtext} />
              )}

              {renderAsOverview ? (
                <div className="grouping-panels">
                  {panel.panelLinks.all.map(panelLink => (
                    <PanelRenderer
                      key={panelLink.key}
                      href={panelLink.href}
                      location={this.props.location}
                    />
                  ))}
                </div>
              ) : (
                <div className="grouping-panels">
                  <NavigationTabs
                    className="grouping-panel-tabs"
                    items={panel.panelLinks}
                  />

                  <Route
                    path={panel.panelLinks.routePath}
                    render={routeProps => (
                      <PanelRenderer
                        href={
                          new Href(
                            `${routeProps.match.url}${
                              routeProps.match.isExact
                                ? routeProps.location.search
                                : ""
                            }`
                          )
                        }
                        isTab
                      />
                    )}
                  />

                  {!hasActivePanelLink &&
                    panel.panelLinks.first && (
                      <Redirect href={panel.panelLinks.first.href} />
                    )}
                </div>
              )}
            </div>

            {panel.hasTasks && (
              <TaskGroupPanels
                className="col-3 col-xl-2"
                taskGroupPanels={panel.taskGroupCollection}
              />
            )}
          </div>

          {this.renderFormRoutes(panel)}
        </PanelBody>
      </Panel>
    );
  }
}

export default withRouter(GroupingPanel);
