// @flow
import { search, quicksearch } from "beinformed/containers/QuickSearch/actions";

import CaseSearchModel from "beinformed/models/search/CaseSearchModel";

import { modelSelector } from "beinformed/containers/ModularUI/selectors";
import { loadModel } from "beinformed/containers/ModularUI/actions";
import connectModularUI from "beinformed/utils/modularui/connectModularUI";
import QuickSearch from "beinformed/components/QuickSearch/QuickSearch";

/**
 * Map state to props
 */
const mapStateToProps = (state: State, ownProps) => ({
  search: ownProps.tab.searchLink
    ? modelSelector(state, ownProps.tab.searchLink.href)
    : null
});

const modularUIConfig = {
  load: ({ tab }) => loadModel(tab.searchLink.href, CaseSearchModel),
  shouldLoad: ({ tab }) => tab.searchLink,
  shouldReload: (newProps, oldProps) =>
    oldProps.searchLink &&
    !oldProps.searchLink.href.equalsWithParameters(newProps.searchLink.href)
};

export const connector = connectModularUI(modularUIConfig, mapStateToProps, {
  onSearch: search,
  onQuickSearch: quicksearch
});

export default connector(QuickSearch);
