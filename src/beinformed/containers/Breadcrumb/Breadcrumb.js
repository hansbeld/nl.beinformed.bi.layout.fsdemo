// @flow
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Breadcrumb from "beinformed/components/Breadcrumb/Breadcrumb";

const retrieveActiveModels = (location, models) => {
  const locationParts = location.pathname.split("/");
  const contextModels = [];

  locationParts.reduce((accumulator, current) => {
    const path = `${accumulator}/${current}`;

    const foundEntry = Object.values(models).find(
      entry => entry.model && entry.model.selfhref.equals(path)
    );

    if (foundEntry && foundEntry.model) {
      contextModels.push({
        key: foundEntry.model.key,
        href: foundEntry.model.selfhref,
        label: foundEntry.model.label
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
  items: retrieveActiveModels(ownProps.location, state.modularui)
});

export default withRouter(connect(mapStateToProps, {})(Breadcrumb));
