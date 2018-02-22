// @flow
import { connect } from "react-redux";

import ModularUIRequest from "beinformed/modularui/ModularUIRequest";

import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";

import type { Connector } from "react-redux";
import type Href from "beinformed/models/href/Href";

/**
 * Injects the modular ui service and the progress start and finish actions
 * This can be used to request modular ui services inside react view components
 */
const mapStateToProps = (state: State, ownProps: Object) => ({
  ...ownProps,

  modularui: (href: Href, options: Object = {}) => {
    const modularui = new ModularUIRequest(href, options);

    modularui.locale = state.i18n.locale || "en";

    return modularui;
  }
});

const connector: Connector<*, *> = connect(mapStateToProps, {
  startProgress,
  finishProgress
});

export default (Component: any) => connector(Component);
