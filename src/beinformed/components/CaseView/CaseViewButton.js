// @flow
import React from "react";
import FolderOpenIcon from "mdi-react/FolderOpenIcon";

import LinkButton from "beinformed/components/Button/LinkButton";

import type { CaseViewModel } from "beinformed/models";

type CaseViewButtonProps = {
  caseview: CaseViewModel
};

const CaseViewButton = ({ caseview }: CaseViewButtonProps) => (
  <LinkButton
    href={caseview.selfhref}
    className="btn-opencase card-link float-lg-right"
    buttonStyle="primary"
  >
    <FolderOpenIcon /> {caseview.titleAttribute.value}
  </LinkButton>
);

export default CaseViewButton;
