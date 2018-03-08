// @flow
import React from "react";

import AttributeList from "beinformed/components/AttributeList/AttributeList";
import { SHOW_ATTRIBUTE_SET_LABELS_IN_DETAILS } from "beinformed/constants/LayoutHints";

import "./ListDetailEventData.scss";

import type { ListDetailModel } from "beinformed/models";
type ListDetailEventDataProps = {
  detail: ListDetailModel
};

const ListDetailEventData = ({ detail }: ListDetailEventDataProps) => (
  <div className="list-detail-eventdata">
    {detail.eventdata.map((attributeset, idx) => (
      <div
        key={`${attributeset.key}-${idx}`}
        className="attributeset"
        data-id={attributeset.key}
      >
        {detail.layouthint.has(SHOW_ATTRIBUTE_SET_LABELS_IN_DETAILS) && (
          <h5>{attributeset.label}</h5>
        )}
        <AttributeList attributes={attributeset.attributeCollection.all} />
      </div>
    ))}
  </div>
);

export default ListDetailEventData;
