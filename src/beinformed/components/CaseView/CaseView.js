// @flow
import React, { Component } from "react";
import classNames from "classnames";
import Helmet from "react-helmet";
import { Route } from "react-router-dom";

import CaseViewModel from "beinformed/models/caseview/CaseViewModel";

import CaseHeader from "beinformed/components/CaseHeader/CaseHeader";
import FormattedText from "beinformed/components/FormattedText/FormattedText";
import TaskGroupPanels from "beinformed/components/TaskGroup/TaskGroupPanels";
import CaseViewPanels from "beinformed/components/CaseViewPanels/CaseViewPanels";

import {
  DAP_ACTIVITIES_EXECUTABLE,
  DAP_ACTIVITIES_PERFORMED
} from "beinformed/constants/LayoutHints";
import Form from "beinformed/containers/Form/Form";

type CaseViewProps = {
  caseview?: CaseViewModel
};

class CaseView extends Component<CaseViewProps> {
  renderFormRoutes(caseview: CaseViewModel) {
    return [
      ...caseview.taskGroupCollection.all.map(
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
    const { caseview } = this.props;

    if (caseview) {
      const mainPanelClass = classNames({
        "col-md-9 col-xl-10": caseview.taskGroupCollection.hasItems,
        "col-md-12": !caseview.taskGroupCollection.hasItems
      });

      const caseName = caseview.casename ? caseview.casename.value : "";

      return (
        <div className="caseview">
          <Helmet>
            <title>{caseName}</title>
          </Helmet>
          <CaseHeader
            name={caseview.casename}
            type={caseview.casetype}
            owner={caseview.owner}
            status={caseview.status}
            properties={caseview.attributeCollection.all}
          />
          <div className="row">
            <div className={mainPanelClass}>
              {caseview.introtext && (
                <FormattedText
                  className="introtext"
                  text={caseview.introtext}
                />
              )}

              {caseview.panelLinks.hasItems && (
                <CaseViewPanels caseview={caseview} />
              )}
            </div>
            {caseview.taskGroupCollection.hasItems && (
              <TaskGroupPanels
                className="col-md-3 col-xl-2"
                taskGroupPanels={caseview.taskGroupCollection}
                executableActivities={caseview.attributeCollection.getChoiceAttributeByLayoutHint(
                  DAP_ACTIVITIES_EXECUTABLE
                )}
                performedActivities={caseview.attributeCollection.getChoiceAttributeByLayoutHint(
                  DAP_ACTIVITIES_PERFORMED
                )}
              />
            )}
          </div>

          {this.renderFormRoutes(caseview)}
        </div>
      );
    }

    return null;
  }
}

export default CaseView;
