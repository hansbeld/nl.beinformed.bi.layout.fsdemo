// @flow
import React, { Component } from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";

import ListItem from "beinformed/components/List/ListView/ListItem";

import {
  MULTI_ROW_TASK,
  CLICK_TO_OPEN_CASE_VIEW
} from "beinformed/constants/LayoutHints";

import { Href } from "beinformed/models";

import type { ListModel, ListItemModel } from "beinformed/models";
import type { Location } from "react-router-dom";

type ViewProps = {
  className?: string,
  list: ListModel,
  openListItemInCaseView: ?boolean,
  location: Location
};

/**
 * Render HTML list
 */
class ListView extends Component<ViewProps> {
  static defaultProps = {
    openListItemInCaseView: false
  };

  getItemHref(item: ListItemModel) {
    if (item.selfhref === null || item.selfhref.equals(new Href("#"))) {
      return void 0;
    }

    const qs = this.props.location.search || "";

    return this.props.openListItemInCaseView
      ? new Href(item.selfhref, "CaseView")
      : new Href(
          `${this.props.list.selfhref.path}/${item.id}${qs}`,
          "ListDetail"
        );
  }

  itemIsActive(item: ListItemModel) {
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
