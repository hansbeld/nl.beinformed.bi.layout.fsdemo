// @flow

// import helper methods
import connectModularUI from "beinformed/utils/modularui/connectModularUI";
import { modelSelector } from "beinformed/containers/ModularUI/selectors";
import { loadModel } from "beinformed/containers/ModularUI/actions";

// import the application model
import ApplicationModel from "beinformed/models/application/ApplicationModel";

// import the application view component
import Application from "beinformed/components/Application/Application";

// map state to props, use the modelSelector helper to retrieve the model with href "/" from the state
const mapStateToProps = (state: State) => ({
  application: modelSelector(state, "/"),
  locale: state.i18n.locale,
  isAuthenticated: state.auth.isAuthenticated
});

// modular ui configuration
//  * key:          Optionally set a custom key which is used to keep status of this configuration in the modular ui reducer
//  * load:         The loadModel helper action is used to load href "/" into the ApplicationModel
//                  When no success action is defined the default setModel action is used to put the model in the modular ui reducer
//  * shouldLoad:   The load action only needs to be dispatched when the application is not available
//  * shouldReload: The model needs to be reloaded when newProps don't have the application model or when the user is authenticated or not.
const loadModularUIConfig = {
  key: () => "/",
  load: () => loadModel("/", ApplicationModel),
  shouldLoad: ({ application }) => !application,
  shouldReload: (newProps, oldProps, hasReloadState) =>
    hasReloadState ||
    !newProps.application ||
    oldProps.isAuthenticated !== newProps.isAuthenticated
};

// Export connector for reuse in projects
export const connector = connectModularUI(loadModularUIConfig, mapStateToProps);

// Export connected component for default use
export default connector(Application);
