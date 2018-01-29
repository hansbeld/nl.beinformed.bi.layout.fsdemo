// @flow
import React from "react";

import LinkButton from "beinformed/components/Button/LinkButton";
import Icon from "beinformed/components/Icon/Icon";

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
    <Icon name="folder-open" /> {caseview.titleAttribute.value}
  </LinkButton>
);

export default CaseViewButton;
