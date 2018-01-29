// @flow
import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";

import { withMessage } from "beinformed/containers/I18n/Message";

import ActionChooser from "beinformed/components/Actions/ActionChooser";
import ButtonToolbar from "beinformed/components/Button/ButtonToolbar";
import ListGroup from "beinformed/components/List/ListGroup";
import ListViewTypeToggle from "beinformed/components/List/ListViewTypeToggle";
import PagesizeChooser from "beinformed/components/Paging/PagesizeChooser";
import Pagination from "beinformed/components/Paging/Pagination";
import PagingInfo from "beinformed/components/Paging/PagingInfo";
import SortChooser from "beinformed/components/Sorting/SortChooser";

import MultiRowTaskContainer from "beinformed/containers/MultiRowTask/MultiRowTaskContainer";

import { AVAILABLE_LIST_VIEWS } from "beinformed/constants/Constants";

import ListView from "beinformed/components/List/ListView/List";
import TableView from "beinformed/components/List/TableView/Table";
import InlineEdit from "beinformed/containers/InlineEdit/InlineEdit";

import EditableListModel from "beinformed/models/list/EditableListModel";

import {
  updateSorting,
  updatePaging,
  updatePageSize
} from "beinformed/containers/List/actions";

import type ListModel from "beinformed/models/list/ListModel";
import type Href from "beinformed/models/href/Href";

type ListMainProps = {
  className?: string,
  list: ListModel,
  viewType?: string,
  message: messageFunctionType,
  onPageChange: (href: Href) => void,
  onPageSizeChange: (href: Href) => void,
  onSortChange: (href: Href) => void
};

type ListMainState = {
  viewType: string
};

class ListMain extends Component<ListMainProps, ListMainState> {
  constructor(props: ListMainProps) {
    super(props);

    this.state = {
      viewType: this.getAvailableViews()[0].type
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.viewType !== this.props.viewType;
  }

  getAvailableViews = () => {
    const views = [
      {
        icon: "list",
        label: "list",
        type: "ListView",
        component: ListView
      },
      {
        icon: "table",
        label: "table",
        type: "TableView",
        component: TableView
      }
    ].filter(view => {
      if (this.props.viewType) {
        return view.type === this.props.viewType;
      }

      return AVAILABLE_LIST_VIEWS.includes(view.type);
    });

    if (this.props.list instanceof EditableListModel) {
      views.push({
        icon: "pencil",
        label: "editable table",
        type: "EditableTableView",
        component: InlineEdit
      });
    }

    return views;
  };

  renderPagingInfo() {
    return (
      <div className="col-3">
        <PagingInfo list={this.props.list} />
      </div>
    );
  }

  renderTop() {
    const { list, message, onSortChange } = this.props;

    const availableViews = this.getAvailableViews();

    if (list.hasResults() || list.isFiltered() || list.context.hasContext()) {
      const isPaged = list.paging.totalResults > 1;

      const listHeaderClass = classNames("list-main-header", {
        "has-paging": isPaged
      });

      // Retrieve the list actions. When the list is in editable modus, the create action is not rendered on the list
      const listActions =
        list.viewType === "EditableTableView" && list.hasResults()
          ? list.actionCollection.all.filter(action => action.type !== "create")
          : list.actionCollection.all;

      const hasMultipleViewTypes =
        list.hasResults() && availableViews.length > 1;

      return (
        <div className={listHeaderClass}>
          <div className="row">
            {isPaged && this.renderPagingInfo()}

            <div className="text-right col">
              <ButtonToolbar
                className="pull-right mb-1"
                ariaLabel={message(
                  "List.AriaLabel.HeaderToolbar",
                  "Available actions for {LIST_LABEL} list",
                  {
                    LIST_LABEL: list.label
                  }
                )}
              >
                {listActions && (
                  <ActionChooser
                    align="right"
                    size="small"
                    actions={listActions}
                  />
                )}

                {list.sorting.options.length > 1 &&
                  list.listItemCollection.length > 1 && (
                    <SortChooser
                      align="right"
                      size="small"
                      list={list}
                      onSort={onSortChange}
                    />
                  )}

                {hasMultipleViewTypes && (
                  <ListViewTypeToggle
                    activeType={this.state.viewType}
                    availableViews={availableViews}
                    listKey={list.key}
                    onChange={(viewType: string) => {
                      this.setState({
                        viewType
                      });
                    }}
                  />
                )}
              </ButtonToolbar>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  getViewComponent() {
    const availableViews = this.getAvailableViews();

    const activeView =
      availableViews.find(view => view.type === this.state.viewType) ||
      availableViews[0];

    const View = activeView.component;

    if (!View) {
      throw new Error(`View component not found for ${this.state.viewType}`);
    }

    return View;
  }

  renderMain() {
    const { list, className } = this.props;

    if (
      !list.hasResults() &&
      !list.isFiltered() &&
      list.actionCollection.length > 0
    ) {
      return <ActionChooser actions={list.actionCollection.all} />;
    }

    return (
      <ListGroup
        className={className}
        grouping={list.grouping}
        list={list}
        View={this.getViewComponent()}
      />
    );
  }

  renderBottom() {
    const { list, onPageChange, onPageSizeChange } = this.props;

    const maxPageSize = list.paging.totalResults;
    const pagesizeOptions = list.paging.pagesize.options.filter(
      (option, i, arr) => option < maxPageSize || arr[i - 1] < maxPageSize
    );

    return (
      <div className="list-footer mt-1">
        {list.paging.maxpages > 1 && (
          <Pagination
            className="float-left"
            list={list}
            onChange={onPageChange}
          />
        )}

        <MultiRowTaskContainer actions={list.actionCollection} />

        {pagesizeOptions.length >= 2 && (
          <PagesizeChooser
            className="float-right"
            align="right"
            size="small"
            direction="up"
            list={list}
            onChange={onPageSizeChange}
          />
        )}
      </div>
    );
  }

  render() {
    const { className, list } = this.props;

    const mainClass = classNames("list-main col", className, {
      "has-no-results": !list.hasResults(),
      "has-results": list.hasResults()
    });

    return (
      <div className={mainClass}>
        {this.renderTop()}
        {this.renderMain()}
        {list.hasResults() && this.renderBottom()}
      </div>
    );
  }
}

export default connect(null, {
  onPageChange: updatePaging,
  onPageSizeChange: updatePageSize,
  onSortChange: updateSorting
})(withMessage(ListMain));
