// @flow
import { loadModel } from "beinformed/containers/ModularUI/actions";
import { modelSelector } from "beinformed/containers/ModularUI/selectors";
import connectModularUI from "beinformed/utils/modularui/connectModularUI";

import Href from "beinformed/models/href/Href";
import ContentDetailSection from "beinformed/components/ModelCatalogContent/ContentDetailSection";

/**
 * Map state to props
 */
const mapStateToProps = (state: State, ownProps) => ({
  availableLanguages: state.i18n.locales.availableLocaleCodes,
  content: modelSelector(
    state,
    `/content/${decodeURIComponent(ownProps.match.params.content)}/${
      ownProps.match.params.section
    }`
  )
});

const modularUIConfig = {
  load: ({ match, entryDate }) =>
    loadModel(
      new Href(
        `/content/${match.params.content}/${match.params.section}`
      ).addParameter("entryDate", entryDate)
    ),
  shouldLoad: ({ content }) => !content,
  shouldReload: (newProps, oldProps) =>
    newProps.match.params.section !== oldProps.match.params.section ||
    newProps.entryDate !== oldProps.entryDate
};

export const connector = connectModularUI(modularUIConfig, mapStateToProps);

export default connector(ContentDetailSection);
