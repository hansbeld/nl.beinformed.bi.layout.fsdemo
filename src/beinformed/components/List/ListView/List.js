// @flow
import React, { Component } from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";

import ListItem from "beinformed/components/List/ListView/ListItem";

import {
  MULTI_ROW_TASK,
  CLICK_TO_OPEN_CASE_VIEW
} from "beinformed/constants/LayoutHints";

import Href from "beinformed/models/href/Href";

import type { Location } from "react-router-dom";
import type ListModel from "beinformed/models/list/ListModel";

type ViewProps = {
  className?: string,
  list: ListModel,
  location: Location,
  openListItemInCaseView?: boolean
};

/**
 * Render HTML list
 */
class ListView extends Component<ViewProps> {
  static defaultProps = {
    openListItemInCaseView: false
  };

  getItemHref(item) {
    if (item.selfhref === null || item.selfhref.equals(new Href("#"))) {
      return void 0;
    }

    return this.props.openListItemInCaseView
      ? new Href(item.selfhref, "CaseView")
      : new Href(
          `${this.props.list.selfhref.path}/${item.id}${
            this.props.location.search
          }`,
          "ListDetail"
        );
  }

  itemIsActive(item) {
    return (
      this.props.list.detail !== null && this.props.list.detail.id === item.id
    );
  }

  render() {
    const { className, list } = this.props;

    const listClass = classNames("list-group", className);

    return (
      <div className={listClass}>
        {list.listItemCollection.all.map(item => (
          <ListItem
            key={`${list.key}-${item.id}`}
            item={item}
            href={this.getItemHref(item)}
            isActive={this.itemIsActive(item)}
            navToCaseView={list.layouthint.has(CLICK_TO_OPEN_CASE_VIEW)}
            isSelectable={list.actionCollection.hasActionsByLayoutHint(
              MULTI_ROW_TASK
            )}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(ListView);
