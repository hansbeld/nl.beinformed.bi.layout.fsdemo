// @flow
import { get } from "lodash";
import { compose } from "redux";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";

import { modularui } from "beinformed/modularui";

import {
  HTTP_METHODS,
  ALWAYS_COMMIT_FORM
} from "beinformed/constants/Constants";

import { previousObject } from "beinformed/containers/Form/actions";

import Form from "beinformed/components/Form/Form";

import { Href } from "beinformed/models";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isModal: get(ownProps.location, "state.modal") || ownProps.isModal
});

const mapDispatchToProps = {
  onPrevious: previousObject,
  onCancel: () => goBack()
};

export const connector = compose(
  connect(mapStateToProps, mapDispatchToProps),
  modularui(
    "Form",
    ({ href, location }) => {
      const formHref =
        href || new Href(`${location.pathname}${location.search}`);

      if (ALWAYS_COMMIT_FORM) {
        return formHref;
      }

      return formHref.addParameter("commit", "false");
    },
    { propName: "form", method: HTTP_METHODS.POST }
  )
);

// Export connected component for default use
export default connector(Form);
