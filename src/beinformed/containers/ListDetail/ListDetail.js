// @flow
import modularui from "beinformed/utils/modularui/modularui";
import ListDetail from "beinformed/components/ListDetail/ListDetail";

export const connector = modularui("ListDetail", ({ href }) => href, {
  propName: "detail"
});
export default connector(ListDetail);
