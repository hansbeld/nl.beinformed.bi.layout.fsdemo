import { modularui } from "beinformed/modularui";

import RelatedConcepts from "beinformed/components/ContentDetail/RelatedConcepts";

export const connector = modularui(
  "RelatedConcepts",
  ({ content }) => content.relatedConceptsHref,
  { propName: "relatedConcepts" }
);

export default connector(RelatedConcepts);
