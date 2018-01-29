// @flow
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  loadModularUI,
  updateStatus
} from "beinformed/containers/ModularUI/actions";
import {
  finishProgress,
  startProgress
} from "beinformed/containers/ProgressIndicator/actions";

const connectModularUIRedux = (
  mapStateToProps: any,
  mapDispatchToProps: any
) => {
  /**
   * Combine state and props of the hoc and the component into one connected component
   */
  const combinedMapStateToProps = (state: State, ownProps: any) => {
    if (!mapStateToProps) {
      return {
        status: state.modularui.status,
        activeLanguage: state.i18n.activeLanguage,
        isAuthenticated: state.auth.isAuthenticated,
        ...ownProps
      };
    }

    return Object.assign({}, mapStateToProps(state, ownProps), {
      status: state.modularui.status,
      activeLanguage: state.i18n.activeLanguage,
      isAuthenticated: state.auth.isAuthenticated,
      ...ownProps
    });
  };

  /**
   * Add load modular ui action to the props of the connect component
   * to be able to dispatch the modular ui action
   */
  const combinedMapDispatchToProps = dispatch => {
    const loadModularUIAction = bindActionCreators(
      {
        loadModularUI,
        startProgress,
        finishProgress,
        updateStatus
      },
      dispatch
    );

    if (mapDispatchToProps) {
      if (typeof mapDispatchToProps === "function") {
        return Object.assign(
          {},
          mapDispatchToProps(dispatch),
          loadModularUIAction
        );
      }

      return Object.assign(
        {},
        bindActionCreators(mapDispatchToProps, dispatch),
        loadModularUIAction
      );
    }

    return loadModularUIAction;
  };

  return connect(combinedMapStateToProps, combinedMapDispatchToProps);
};

export default connectModularUIRedux;
