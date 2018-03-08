// @flow
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  const locationParts = ownProps.href.path.split("/");

  let listModelHref = null;

  locationParts.reduce((accumulator, current) => {
    const path = `${accumulator}/${current}`;

    const foundEntry = Object.values(state.modularui).find(
      entry =>
        entry.model &&
        entry.model.selfhref.equals(path) &&
        entry.model.type === "List"
    );

    if (listModelHref === null && foundEntry && foundEntry.model) {
      listModelHref = foundEntry.model.selfhref;
    }

    return path;
  });

  if (listModelHref) {
    return {
      to: {
        ...listModelHref.toLocation(),
        state: {
          reload: true
        }
      }
    };
  }

  return { to: null };
};

export const connector = connect(mapStateToProps, null);
export default connector(Redirect);
