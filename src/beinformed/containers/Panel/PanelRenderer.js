// @flow
import { modelSelector } from "beinformed/containers/ModularUI/selectors";
import connectModularUI from "beinformed/utils/modularui/connectModularUI";
import { loadModel } from "beinformed/containers/ModularUI/actions";
import PanelRenderer from "beinformed/components/Panel/PanelRenderer";

import type Href from "beinformed/models/href/Href";

type ownPropsType = {
  href: Href
};

/**
 * Map state to props
 */
const mapStateToProps = (state: State, ownProps: ownPropsType) => ({
  panel: modelSelector(state, ownProps.href)
});

const modularUIConfig = {
  load: ({ href }) => loadModel(href),
  shouldLoad: ({ href, panel }) => href && !panel,
  shouldReload: (newProps, oldProps, hasReloadState) =>
    hasReloadState ||
    (oldProps.href &&
      newProps.href &&
      newProps.match.isExact &&
      !oldProps.href.equalsWithParameters(newProps.href))
};

export const connector = connectModularUI(modularUIConfig, mapStateToProps);

export default connector(PanelRenderer);
