// @flow
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Breadcrumb from "beinformed/components/Breadcrumb/Breadcrumb";

import type { Connector } from "react-redux";
import type { Location } from "react-router-dom";
import type { Href } from "beinformed/models";
import type { ModularUIState } from "beinformed/redux/reducers/ModularUIReducer";

type OwnProps = {
  location: Location
};
type Props = {
  className?: string,
  items: Array<{
    key: string,
    href: Href,
    label: string
  }>
};

const retrieveActiveModels = (location, models: ModularUIState) => {
  const locationParts = location.pathname.split("/");
  const contextModels = [];

  locationParts.reduce((accumulator, current) => {
    const path = `${accumulator}/${current}`;

    const allEntries: {} = Object.values(models);

    const foundEntry = allEntries.find(
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
const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  items: retrieveActiveModels(ownProps.location, state.modularui)
});

const connector: Connector<OwnProps, Props> = connect(mapStateToProps, {});

export default withRouter(connector(Breadcrumb));
