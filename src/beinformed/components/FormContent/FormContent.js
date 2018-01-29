// @flow
import React from "react";

import FormContentRenderer from "beinformed/components/FormContent/FormContentRenderer";
import { POPUP } from "beinformed/constants/LayoutHints";

import "./FormContent.scss";

import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

type FormContentProps = {
  concept: ConceptDetailModel | null,
  contentConfiguration?: ContentConfigurationElements | null
};

const FormContent = ({ concept, contentConfiguration }: FormContentProps) => {
  if (concept && contentConfiguration) {
    return (
      <FormContentRenderer
        key="content-plain"
        concept={concept}
        contentConfiguration={contentConfiguration.excludeLayoutHints([POPUP])}
      />
    );
  }

  return null;
};

export default FormContent;
