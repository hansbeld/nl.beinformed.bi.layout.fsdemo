// @flow
import React from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import RefreshIcon from "mdi-react/RefreshIcon";

import { Message } from "beinformed/containers/I18n/Message";
import HTMLForm from "beinformed/components/HTMLForm/HTMLForm";
import Filter from "beinformed/components/Filter/Filter";
import Link from "beinformed/components/Link/Link";

import "./Filters.scss";

import type ListModel from "beinformed/models/list/ListModel";

type FiltersProps = {
  className?: string,
  list: ListModel,
  history: any,
  onChange: Function,
  onReset: Function,
  onSubmit: Function
};

/**
 * Render filters
 */
const Filters = ({
  className,
  list,
  onChange,
  onSubmit,
  onReset
}: FiltersProps) => {
  const filtersClass = classNames("filters", className);

  return (
    <div className={filtersClass}>
      <div className="text-right">
        <Link
          className="clear-filters-link"
          href={list.selfhref}
          onClick={() => onReset(list)}
          isActive={false}
        >
          <RefreshIcon className="textAfter" />
          <Message id="Filters.Button.ClearAll" defaultMessage="Clear all" />
        </Link>
      </div>
      <HTMLForm
        method="get"
        name="filters"
        action={list.selfhref}
        onSubmit={() => onSubmit(list)}
      >
        {list.filterCollection.all.map((filter, idx) => (
          <Filter
            key={`${filter.name}-${idx}`}
            filter={filter}
            onChange={(attribute, inputvalue) => {
              onChange(list, attribute, inputvalue);
            }}
          />
        ))}
      </HTMLForm>
    </div>
  );
};

export default withRouter(Filters);
