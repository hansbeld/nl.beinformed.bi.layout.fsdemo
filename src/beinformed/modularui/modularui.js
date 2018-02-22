// @flow
import React, { Component } from "react";
import { isFunction, get } from "lodash";
import { connect } from "react-redux";

import {
  loadModularUI,
  removeModelByKey
} from "beinformed/containers/ModularUI/actions";

import { HTTP_METHODS, IS_SERVER } from "beinformed/constants/Constants";

import Href from "beinformed/models/href/Href";

type ModularUIOptions = {
  propName?: string,
  method?: HttpMethods
};

const modularui = (
  name: string,
  resource: string | Function,
  options?: ModularUIOptions
) => (WrappedComponent: any) => {
  class ModularuiHOC extends Component<any> {
    /**
     * Get a unique key for this connection, needs props to create the url that is called
     */
    static getKey = (url: string) =>
      `${name ||
        WrappedComponent.displayName ||
        WrappedComponent.name ||
        "Component"}(${url.split("?")[0]})`;

    static getUrl = props => {
      const url = isFunction(resource) ? resource(props) : resource;

      if (url instanceof Href) {
        return url.toString();
      }

      return url;
    };

    fetchModularUI = (url: string | Href, fetchOptions?: ModularUIOptions) =>
      this.props.loadModularUI(
        ModularuiHOC.getKey(url.toString()),
        url.toString(),
        fetchOptions
      );

    componentWillMount = () => {
      if (IS_SERVER && !this.props.status) {
        const url = ModularuiHOC.getUrl(this.props);
        this.fetchModularUI(url, options);
      }
    };

    componentDidMount = () => {
      if (this.props.status !== "finished" || !this.props.hasModel) {
        const url = ModularuiHOC.getUrl(this.props);
        this.fetchModularUI(url, options);
      }
    };

    componentWillReceiveProps = nextProps => {
      const nextUrl = ModularuiHOC.getUrl(nextProps);
      const url = ModularuiHOC.getUrl(this.props);

      const nextReload = nextProps.reload;
      const reload = this.props.reload;

      const nextLocale = nextProps.locale;
      const locale = this.props.locale;

      if (
        nextProps.status !== "loading" &&
        nextProps.status !== "error" &&
        (!nextProps.hasModel ||
          nextUrl !== url ||
          nextReload !== reload ||
          nextLocale !== locale)
      ) {
        this.fetchModularUI(nextUrl, options);
      }
    };

    render() {
      const props = { ...this.props, fetchModularUI: this.fetchModularUI };
      ["loadModularUI", "load", "hasModel"].forEach(k => delete props[k]);

      return <WrappedComponent {...props} />;
    }

    componentWillUnmount() {
      const url = ModularuiHOC.getUrl(this.props);
      const key = ModularuiHOC.getKey(url.toString());

      this.props.removeModelByKey(key);
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const propName = options && options.propName ? options.propName : "data";

    const key = ModularuiHOC.getKey(ModularuiHOC.getUrl(ownProps));
    const modelEntry = state.modularui[key];

    const model = modelEntry ? modelEntry.model : null;
    const status = modelEntry ? modelEntry.status : null;

    const isPostMethod = get(options, "method") === HTTP_METHODS.POST;
    const locale = state.i18n.locale;

    const reload = get(state.router.location, "state.reload") && !isPostMethod;

    return {
      [propName]:
        model &&
        model.type === "Form" &&
        model.isFinished &&
        status === "loading"
          ? null
          : model,
      status,
      hasModel: Boolean(model),
      reload,
      locale,
      ...ownProps
    };
  };

  return connect(mapStateToProps, { loadModularUI, removeModelByKey })(
    ModularuiHOC
  );
};

export default modularui;
