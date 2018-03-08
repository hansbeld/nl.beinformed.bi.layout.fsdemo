// @flow
import { modularui } from "beinformed/modularui";
import ModelCatalog from "beinformed/components/ModelCatalog/ModelCatalog";

export const connector = modularui("ModelCatalog", ({ match }) => match.url, {
  propName: "modelcatalog"
});
export default connector(ModelCatalog);
