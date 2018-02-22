import React from "react";
import { Route, withRouter } from "react-router-dom";

import Redirect from "beinformed/components/Redirect/Redirect";

import { Message } from "beinformed/containers/I18n/Message";

import FormProgress from "fsdemo/components/ApplyForMortgage/FormProgress";
import PanelRenderer from "fsdemo/containers/ApplyForMortgage/PanelRenderer";
import Href from "beinformed/models/href/Href";

const ApplyForMortgage = ({ caseview, match, location }) => {
  if (caseview) {
    if (caseview.getAttributeByKey("CaseState").value === "Submitted") {
      return <Redirect href={new Href("/apply-for-a-mortgage-submitted")} />;
    }

    const hasActivePanelLink = caseview.panelLinks.all.find(panelLink =>
      new Href(location.pathname).startsWith(panelLink.href)
    );

    if (!hasActivePanelLink && caseview.panelLinks.first && match.isExact) {
      return <Redirect href={caseview.panelLinks.first.href} />;
    }

    return (
      <div className="apply-for-mortgage-form">
        <h2>
          <Message
            id="ApplyForMortgage.title"
            defaultMessage="Mortgage application"
          />
        </h2>
        <div className="row">
          <div className="col-3">
            <FormProgress caseview={caseview} />
          </div>
          <div className="col">
            <Route
              path={caseview.panelLinks.routePath}
              render={props => (
                <PanelRenderer
                  href={new Href(`${props.match.url}`)}
                  isRoot={true}
                />
              )}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default withRouter(ApplyForMortgage);
