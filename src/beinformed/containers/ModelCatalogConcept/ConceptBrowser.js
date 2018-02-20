// @flow
import modularui from "beinformed/utils/modularui/modularui";
import ConceptBrowser from "beinformed/components/ModelCatalogConcept/ConceptBrowser";

export const connector = modularui(
  "ConceptBrowser",
  ({ href, entryDate }) => href.addParameter("entryDate", entryDate),
  { propName: "conceptindex" }
);
export default connector(ConceptBrowser);
