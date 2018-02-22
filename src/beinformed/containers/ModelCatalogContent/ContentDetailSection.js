// @flow
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Href from "beinformed/models/href/Href";

import modularui from "beinformed/modularui/modularui";
import ContentDetailSection from "beinformed/components/ModelCatalogContent/ContentDetailSection";

const mapStateToProps = (state: State, ownProps) => ({
  ...ownProps,
  availableLocales: state.i18n.locales.availableLocaleCodes
});

export const connector = compose(
  withRouter,
  connect(mapStateToProps),
  modularui(
    "ContentDetailSection",
    ({ match, entryDate }) =>
      new Href(
        `/content/${decodeURIComponent(match.params.content)}/${
          match.params.section
        }`
      ).addParameter("entryDate", entryDate),
    { propName: "content" }
  )
);

export default connector(ContentDetailSection);
