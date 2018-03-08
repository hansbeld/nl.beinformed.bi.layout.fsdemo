// @flow
import React from "react";
import CheckCircleOutlineIcon from "mdi-react/CheckCircleOutlineIcon";

import type { ChoiceAttributeModel } from "beinformed/models";

/**
 * Dummy task group rendering the 'tasks' of a choice attribute that contains a collection of already performed actions
 */
const DAPPerformedActivities = ({
  activities
}: {
  activities: ChoiceAttributeModel
}) => (
  <div className="taskgroup" data-id="performed-activities">
    <h6>Performed Activities</h6>
    {activities.options.selected.length > 0 && (
      <ul className="list-unstyled">
        {activities.options.selected.map(activity => (
          <li key={`label_${activity.code}`}>
            <span data-id={activity.code}>
              <CheckCircleOutlineIcon className="textAfter" />
              {activity.label}
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default DAPPerformedActivities;
