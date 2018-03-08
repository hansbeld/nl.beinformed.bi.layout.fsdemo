// @flow
import React from "react";

import { Message } from "beinformed/i18n";

/**
 * Concept formula
 */
const ConceptFormula = ({ formula }: { formula: string }) => (
  <div className="concept-formula mb-4">
    <h3>
      <Message id="ConceptFormula.Header" defaultMessage="Formula" />
    </h3>
    <pre>{formula || "-"}</pre>
  </div>
);

export default ConceptFormula;
