// @flow
import modularui from "beinformed/utils/modularui/modularui";
import PanelRenderer from "beinformed/components/Panel/PanelRenderer";

export const connector = modularui("PanelRenderer", ({ href }) => href, {
  propName: "panel"
});
export default connector(PanelRenderer);
