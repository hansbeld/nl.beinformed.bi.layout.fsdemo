// @flow
import React from "react";

import LinkButton from "beinformed/components/Button/LinkButton";
import FolderOpenIcon from "mdi-react/FolderOpenIcon";

import type DetailModel from "beinformed/models/detail/DetailModel";

type CaseViewButtonProps = {
  caseview: DetailModel
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
