// @flow
import modularui from "beinformed/utils/modularui/modularui";
import ModelCatalog from "beinformed/components/ModelCatalog/ModelCatalog";

export const connector = modularui("ModelCatalog", ({ match }) => match.url, {
  propName: "modelcatalog"
});
export default connector(ModelCatalog);
