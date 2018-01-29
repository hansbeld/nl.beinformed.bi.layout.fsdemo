// @flow
import React from "react";
import classNames from "classnames";

import type LabelAttributeModel from "beinformed/models/attributes/LabelAttributeModel";

type LabelAttributeProps = {
  attribute: LabelAttributeModel,
  className?: string
};

/**
 * Render label attribute form group
 */
const LabelAttribute = ({ attribute, className }: LabelAttributeProps) => {
  const headerClass = classNames("labelwidget", className);

  return (
    <h3 className={headerClass} data-name={attribute.name}>
      {attribute.label}
    </h3>
  );
};

export default LabelAttribute;
