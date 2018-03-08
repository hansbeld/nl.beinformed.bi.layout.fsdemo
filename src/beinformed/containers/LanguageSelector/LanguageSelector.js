// @flow
import { connect } from "react-redux";

import { updateLocale } from "beinformed/containers/LanguageSelector/actions";

import LanguageSelector from "beinformed/components/LanguageSelector/LanguageSelector";

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  activeLocale: state.i18n.locale,
  locales: state.i18n.locales
});

export const connector = connect(mapStateToProps, {
  onChange: updateLocale
});

export default connector(LanguageSelector);
