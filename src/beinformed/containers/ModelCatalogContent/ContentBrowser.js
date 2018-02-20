// @flow
import modularui from "beinformed/utils/modularui/modularui";
import ContentBrowser from "beinformed/components/ModelCatalogContent/ContentBrowser";

export const connector = modularui("ContentBrowser", ({ href }) => href, {
  propName: "contentindex"
});

export default connector(ContentBrowser);
