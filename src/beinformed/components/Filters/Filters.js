// @flow
import React, { Component } from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";

import { Message } from "beinformed/containers/I18n/Message";
import HTMLForm from "beinformed/components/HTMLForm/HTMLForm";
import Filter from "beinformed/components/Filter/Filter";
import Link from "beinformed/components/Link/Link";
import Icon from "beinformed/components/Icon/Icon";

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
class Filters extends Component<FiltersProps> {
  render() {
    const { className, list, onChange, onSubmit, onReset } = this.props;

    const filtersClass = classNames("filters", className);

    return (
      <div className={filtersClass}>
        <div className="text-right">
          <Link href={list.selfhref} onClick={() => onReset(list)}>
            <Icon name="refresh" className="px-0" />{" "}
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
  }
}

export default withRouter(Filters);
