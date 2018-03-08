// @flow
import { connect } from "react-redux";

import type { Connector } from "react-redux";

const mapStateToProps = (state: State, ownProps: Object) => ({
  ...ownProps,
  message: (id: string, defaultMessage?: string, placeholders?: Object) => {
    const localeCode = state.i18n.locale || "en";
    const locale = state.i18n.locales.getLocale(localeCode);

    return locale.getMessage(id, defaultMessage, placeholders);
  }
});

const connector: Connector<*, *> = connect(mapStateToProps, {});

const withMessage = (Component: any) => connector(Component);

export default withMessage;
