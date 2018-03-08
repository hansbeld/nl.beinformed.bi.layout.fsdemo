// @flow
import React from "react";

import FormContentRenderer from "beinformed/components/FormContent/FormContentRenderer";
import IconPopover from "beinformed/components/Popover/IconPopover";
import { POPUP } from "beinformed/constants/LayoutHints";

import type { ContentConfigurationElements } from "beinformed/models";

import "./FormContentPopover.scss";

type FormContentPopoverProps = {
  concept: ConceptDetailModel | null,
  contentConfiguration?: ContentConfigurationElements | null
};

const FormContentPopover = ({
  concept,
  contentConfiguration
}: FormContentPopoverProps) => {
  if (
    concept &&
    contentConfiguration &&
    contentConfiguration.hasLayoutHint(POPUP)
  ) {
    return (
      <FormContentRenderer
        concept={concept}
        contentConfiguration={contentConfiguration.includeLayoutHints([POPUP])}
        ContentWrapperComponent={
          <IconPopover
            className="form-content-popover"
            horizontalAlignment="center"
          />
        }
      />
    );
  }

  return null;
};

export default FormContentPopover;
