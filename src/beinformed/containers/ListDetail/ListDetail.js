// @flow
import connectModularUI from "beinformed/utils/modularui/connectModularUI";

import { loadListItem } from "beinformed/containers/List/actions";
import ListDetail from "beinformed/components/ListDetail/ListDetail";

export const connector = connectModularUI({
  load: ({ list, listitem }) => loadListItem(list, listitem.selfhref),
  shouldLoad: () => true,
  shouldReload: (newProps, oldProps) =>
    newProps.match.params.id !== oldProps.match.params.id
});

export default connector(ListDetail);
