// @flow
import React from "react";
import classNames from "classnames";

import Attribute from "beinformed/components/AttributeList/Attribute";

import {
  DAP_ACTIVITIES_EXECUTABLE,
  DAP_ACTIVITIES_PERFORMED,
  DAP_STAGES_EXECUTABLE,
  DAP_STAGES_PERFORMED
} from "beinformed/constants/LayoutHints";

import "./AttributeList.scss";

type AttributeListType = {
  attributes: Array<AttributeType>,
  className?: string,
  direction?: "horizontal" | "vertical"
};

/**
 * Render a list of attributes
 */
const AttributeList = ({
  attributes,
  className,
  direction
}: AttributeListType) => {
  /**
   * Check if attribute is a DAP attribute
   */
  const isDAPAttribute = attribute =>
    attribute.layouthint.has(
      DAP_ACTIVITIES_EXECUTABLE,
      DAP_ACTIVITIES_PERFORMED,
      DAP_STAGES_EXECUTABLE,
      DAP_STAGES_PERFORMED
    );

  const listClass = classNames(className, {
    attributelist: direction !== "horizontal",
    "horizontal-attributelist": direction === "horizontal"
  });

  const attributeNoDAP = attributes
    .filter(
      attribute =>
        !isDAPAttribute(attribute) && !attribute.layouthint.has("title")
    )
    .map((attribute, i) => (
      <Attribute key={`${attribute.key}-${i}`} attribute={attribute} />
    ));

  if (attributeNoDAP.length > 0) {
    return <div className={listClass}>{attributeNoDAP}</div>;
  }

  return null;
};

export default AttributeList;
