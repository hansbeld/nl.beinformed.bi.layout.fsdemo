// @flow
import React from "react";
import classNames from "classnames";

import BreadcrumbItem from "beinformed/components/Breadcrumb/BreadcrumbItem";
import BreadcrumbItemLink from "beinformed/components/Breadcrumb/BreadcrumbItemLink";

import type Href from "beinformed/models/href/Href";

export type BreadcrumbProps = {
  className?: string,
  items: Array<{
    key: string,
    href: Href,
    label: string
  }>
};

/**
 * Render a breadcrumb
 */
const Breadcrumb = ({ className, items }: BreadcrumbProps) => {
  const breadcrumbClass = classNames("breadcrumb", className);

  return (
    <ol className={breadcrumbClass}>
      {items.map((item, idx) => {
        if (idx < items.length - 1) {
          return (
            <BreadcrumbItemLink key={`breadcrumbItem-${idx}`} item={item} />
          );
        }

        return <BreadcrumbItem key={`breadcrumbItem-${idx}`} item={item} />;
      })}
    </ol>
  );
};

export default Breadcrumb;
