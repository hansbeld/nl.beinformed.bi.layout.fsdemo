// @flow
import React, { Component } from "react";

import { IS_SERVER } from "beinformed/constants/Constants";

import type { Match, Location, RouterHistory } from "react-router-dom";

export type LoadModularUIConfigType = {
  key?: (ownProps: Object) => string,
  load: (ownProps: Object) => any,
  shouldLoad: (ownProps: Object) => boolean,
  shouldReload?: (oldProps: Object, newProps: Object) => boolean
};

type LoaderProps = {
  match: Match,
  location: Location,
  history: RouterHistory,
  load: Object,
  status: Object,
  loadModularUI: (key: string, action: Object) => Promise<any>,
  updateStatus: (key: string, status: string) => void,
  activeLanguage: string,
  isAuthenticated: boolean
};

/**
 * Runs asynchronous redux actions,
 * which makes it possible to connect the async modular ui service to view components.
 */
const connectModularUIConfig = (config: LoadModularUIConfigType) => (
  WrappedComponent: any
) => {
  class ModularUIConnector extends Component<LoaderProps> {
    /**
     * Name of connected component
     */
    get wrappedComponentName(): string {
      return (
        WrappedComponent.displayName || WrappedComponent.name || "Component"
      );
    }

    get configKey(): string {
      if (config.key && typeof config.key === "function") {
        return `${this.wrappedComponentName}(${config.key(this.props)})`;
      }
      return `${this.wrappedComponentName}(${this.props.match.url})`;
    }

    /**
     * When component will mount check for each load configuration
     * if is should load with the current state
     *
     * This is the only lifecycle method that runs on the server
     */
    componentWillMount() {
      if (!config.shouldLoad || !config.load) {
        throw new Error(
          `WithModularUI: Missing load or shouldLoad configuration for ${
            this.wrappedComponentName
          }`
        );
      }

      if (
        config.shouldLoad(this.props) &&
        (!IS_SERVER || this.props.status[this.configKey] !== "finished")
      ) {
        this.props.loadModularUI(this.configKey, config.load(this.props));
      }
    }

    /**
     * When the component receives new props,
     * check if these new props makes a reload of the component necessary,
     * for example the navigation between two tabs
     */
    componentWillReceiveProps(nextProps: LoaderProps) {
      const hasChangedLanguage =
        nextProps.activeLanguage !== this.props.activeLanguage;

      const currentReload =
        this.props.location.state && this.props.location.state.reload
          ? this.props.location.state.reload
          : false;

      const nextReload =
        nextProps.location.state && nextProps.location.state.reload
          ? nextProps.location.state.reload
          : false;

      const hasReloadStateParameter = currentReload !== nextReload;

      const hasChangedAuthentication =
        nextProps.isAuthenticated !== this.props.isAuthenticated;

      if (
        hasChangedLanguage ||
        hasChangedAuthentication ||
        (nextProps.status[this.configKey] !== "loading" &&
          config.shouldReload &&
          config.shouldReload(nextProps, this.props, hasReloadStateParameter))
      ) {
        this.props.loadModularUI(this.configKey, config.load(nextProps));
      }
    }

    /**
     * Render the wrapped component
     */
    render() {
      const props = { key: this.configKey, ...this.props };
      ["load", "status", "loadModularUI", "updateStatus"].forEach(
        k => delete props[k]
      );
      return <WrappedComponent {...props} />;
    }
  }

  /**
   * Display name of this HOC
   */
  ModularUIConnector.displayName = `ModularUIConnector(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    "Component"})`;

  return ModularUIConnector;
};

export default connectModularUIConfig;
