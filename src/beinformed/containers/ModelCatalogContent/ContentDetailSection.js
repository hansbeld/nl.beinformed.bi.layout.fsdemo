// @flow
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Href } from "beinformed/models";

import { modularui } from "beinformed/modularui";

import ContentDetailSection from "beinformed/components/ModelCatalogContent/ContentDetailSection";

import type { Connector } from "react-redux";

type ContentDetailSectionOwnProps = {
  entryDate: string
};

type Props = {
  entryDate: string,
  availableLocales: Array<string>
};

const mapStateToProps = (
  state: State,
  ownProps: ContentDetailSectionOwnProps
) => ({
  ...ownProps,
  availableLocales: state.i18n.locales.availableLocaleCodes
});

const reduxConnector: Connector<ContentDetailSectionOwnProps, Props> = connect(
  mapStateToProps,
  {}
);

export const connector = compose(
  withRouter,
  reduxConnector,
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
