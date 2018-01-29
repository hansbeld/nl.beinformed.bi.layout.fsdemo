// @flow
import React from "react";

import EndResult from "beinformed/components/InstrumentResult/EndResult";

import type FormObjectCollection from "beinformed/models/form/FormObjectCollection";

type FormResultsProps = {
  results: FormObjectCollection,
  id: string
};

/**
 * Render form results of a form
 */
const FormResults = ({ results, id }: FormResultsProps) => (
  <div>
    {results.all.map(formResult => (
      <EndResult
        key={formResult.key}
        id={id}
        attributes={formResult.attributeCollection.all}
        contentConfiguration={formResult.contentConfiguration}
      />
    ))}
  </div>
);

export default FormResults;
