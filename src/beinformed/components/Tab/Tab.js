// @flow
import React from "react";
import classNames from "classnames";
import Helmet from "react-helmet";

import Href from "beinformed/models/href/Href";

import BreadCrumb from "beinformed/containers/Breadcrumb/Breadcrumb";

import NavigationDropdown from "beinformed/components/Navigation/NavigationDropdown";
import FoldoutTaskMenu from "beinformed/components/TaskGroup/FoldoutTaskMenu";

import QuickSearch from "beinformed/containers/QuickSearch/QuickSearch";

import TabModel from "beinformed/models/tab/TabModel";

import "./Tab.scss";

import type { Location } from "react-router-dom";

type TabProps = {
  location: Location,
  tab?: TabModel,
  children: any
};

const Tab = ({ tab, location, children }: TabProps) => {
  if (tab) {
    const tabClass = classNames("tab", {
      "has-taskgroups": tab.hasTaskGroups(),
      "has-search": Boolean(tab.searchLink)
    });

    const tabComponents = [
      ...tab.components.filter(component => component.group === "component"),
      ...tab.components.filter(component => component.group === "search")
    ];

    const activeComponent = tabComponents.find(component =>
      new Href(location.pathname).startsWith(component.href)
    );

    return (
      <div className={tabClass}>
        <Helmet>
          <title>{tab.label}</title>
        </Helmet>

        {(tab.hasTaskGroups() || tab.hasActions()) && (
          <FoldoutTaskMenu
            taskgroups={tab.taskGroupCollection}
            actions={tab.actionCollection}
            label={tab.label}
          />
        )}
        {tabComponents.length > 0 &&
          activeComponent && (
            <nav className="navbar navbar-light bg-light tab-header">
              <NavigationDropdown
                toggleLabel={activeComponent ? activeComponent.label : ""}
                items={tabComponents}
              />
              {tab.searchLink && <QuickSearch href={tab.searchLink.href} />}
            </nav>
          )}

        <main role="main" className="p-4">
          <BreadCrumb />
          {children}
        </main>
      </div>
    );
  }

  return null;
};

export default Tab;
