// @flow
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Breadcrumb from "beinformed/components/Breadcrumb/Breadcrumb";

const retrieveActiveModels = (location, models) => {
  const locationParts = location.pathname.split("/");
  const contextModels = [];

  locationParts.reduce((accumulator, current) => {
    const path = `${accumulator}/${current}`;

    const model = models[path];
    if (model) {
      contextModels.push({
        key: model.key,
        href: model.selfhref,
        label: model.label
      });
    }

    return path;
  });

  return contextModels;
};

/**
 * Map state to props
 */
const mapStateToProps = (state: State, ownProps) => ({
  items: retrieveActiveModels(ownProps.location, state.modularui.models)
});

export default withRouter(connect(mapStateToProps, {})(Breadcrumb));
