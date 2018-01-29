// @flow
import React from "react";
import classNames from "classnames";

import CaseViewModel from "beinformed/models/caseview/CaseViewModel";

import NavigationItem from "beinformed/components/Navigation/NavigationItem";

import "./FormProgress.scss";

type FormProgressProps = {
  caseview: CaseViewModel
};

const FormProgress = ({ caseview }: FormProgressProps) => {
  if (!caseview) {
    return null;
  }

  const items = caseview.panelLinks;

  const stepsCompleted = caseview.attributeCollection.getAttributeByLayoutHint(
    "progress-confirmed"
  );

  const stepsCompletedArray =
    stepsCompleted && stepsCompleted.value
      ? stepsCompleted.value.split(",")
      : [];

  return (
    <ul className="form-progress nav flex-column">
      {items.links.map(link => {
        const uri = link.href.path.split("/").pop();

        const itemClass = classNames({
          completed: stepsCompletedArray.includes(uri)
        });

        return (
          <NavigationItem key={link.key} className={itemClass} link={link} />
        );
      })}
    </ul>
  );
};

export default FormProgress;
