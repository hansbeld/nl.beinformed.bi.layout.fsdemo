// @flow
import { modularui } from "beinformed/modularui";

import QuickSearch from "beinformed/components/QuickSearch/QuickSearch";

export const connector = modularui("QuickSearch", ({ href }) => href, {
  propName: "search"
});

export default connector(QuickSearch);
