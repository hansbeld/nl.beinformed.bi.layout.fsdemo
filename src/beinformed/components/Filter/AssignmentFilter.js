// @flow
import React from "react";
import classNames from "classnames";

import FormAttribute from "beinformed/components/FormAttribute/AttributeRenderer";
import { PARAMETER_SEPARATOR } from "beinformed/constants/Constants";

import type { AssignmentFilterModel } from "beinformed/models";

type AssignmentFilterProps = {
  className?: string,
  filter: AssignmentFilterModel,
  onChange: Function
};

/**
 * Render Assignment filter
 */
const AssignmentFilter = ({
  className,
  filter,
  onChange
}: AssignmentFilterProps) => {
  const namePrefix = filter.listkey + PARAMETER_SEPARATOR || "";

  return (
    <div className={className} data-name={filter.name}>
      <div className="form-label" id={`${filter.name}-label`}>
        {filter.label}
      </div>
      <div>
        {filter.user && (
          <FormAttribute
            className={classNames(`${filter.user.type}filter`)}
            id={filter.user.name}
            name={namePrefix + filter.user.name}
            attribute={filter.user}
            isFilter
            stacked
            onChange={onChange}
          />
        )}
        {filter.assignmenttype && (
          <FormAttribute
            className={`${filter.assignmenttype.type}filter`}
            id={filter.assignmenttype.name}
            name={namePrefix + filter.assignmenttype.name}
            attribute={filter.assignmenttype}
            isFilter
            stacked
            onChange={onChange}
          />
        )}
        {!filter.user &&
          !filter.assignmenttype && (
            <span>No User or Assignmenttype filter found</span>
          )}
      </div>
    </div>
  );
};

export default AssignmentFilter;
