// @flow
import { loadModel } from "beinformed/containers/ModularUI/actions";
import { modelSelector } from "beinformed/containers/ModularUI/selectors";
import connectModularUI from "beinformed/utils/modularui/connectModularUI";

import Href from "beinformed/models/href/Href";
import ContentDetail from "beinformed/components/ModelCatalogContent/ContentDetail";

/**
 * Map state to props
 */
const mapStateToProps = (state: State, ownProps) => ({
  ...ownProps,
  contentTOC: modelSelector(
    state,
    `/content/${decodeURIComponent(ownProps.match.params.content)}`
  )
});

const modularUIConfig = {
  load: ({ match, entryDate }) =>
    loadModel(
      new Href(`/content/${match.params.content}`).addParameter(
        "entryDate",
        entryDate
      )
    ),
  shouldLoad: ({ contentDetail }) => !contentDetail,
  shouldReload: (newProps, oldProps) =>
    newProps.match.params.content !== oldProps.match.params.content ||
    newProps.entryDate !== oldProps.entryDate
};

export const connector = connectModularUI(modularUIConfig, mapStateToProps);

export default connector(ContentDetail);
