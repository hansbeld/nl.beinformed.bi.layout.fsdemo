// @flow
import React from "react";

import AttributeList from "beinformed/components/AttributeList/AttributeList";

import "./CaseHeader.scss";

type CaseHeaderType = {
  name?: AttributeType | null,
  owner?: AttributeType | null,
  properties?: AttributeType[],
  status?: AttributeType | null,
  type?: AttributeType | null
};

/**
 * Renders the case header
 */
const CaseHeader = ({
  name,
  owner,
  properties,
  status,
  type
}: CaseHeaderType) => {
  const caseName = name ? name.value : "";

  const caseInfo = [];

  if (type) {
    caseInfo.push({
      label: type.label,
      value: type.readonlyvalue,
      className: "casetype"
    });
  }

  if (owner) {
    caseInfo.push({
      label: owner.label,
      value: owner.readonlyvalue,
      className: "caseowner"
    });
  }

  if (status) {
    caseInfo.push({
      label: status.label,
      value: status.readonlyvalue,
      className: "casestatus"
    });
  }

  return (
    <div className="caseview-header">
      <h2>
        <span className="casename">{caseName}</span>
        <br />
        {caseInfo.length > 0 && (
          <small className="caseview-header-info">
            {caseInfo.map((item, idx) => (
              <span key={idx} className="caseview-header-info-item">
                {`${item.label}: `}
                <span className={item.className}>{item.value}</span>
              </span>
            ))}
          </small>
        )}
      </h2>
      {properties && (
        <AttributeList direction="horizontal" attributes={properties} />
      )}
    </div>
  );
};

export default CaseHeader;
