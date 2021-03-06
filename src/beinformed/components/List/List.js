// @flow
import React from "react";
import classNames from "classnames";
import { Route, Switch } from "react-router-dom";

import { SHOW_ONE_RESULT_AS_DETAIL } from "beinformed/constants/LayoutHints";
import DetailPanel from "beinformed/components/DetailPanel/DetailPanel";

import ListHeader from "beinformed/components/List/ListHeader";

import Filters from "beinformed/containers/Filter/Filters";
import ListDetail from "beinformed/containers/ListDetail/ListDetail";
import ListMain from "beinformed/components/List/ListMain";
import Form from "beinformed/containers/Form/Form";

import PanelRenderer from "beinformed/containers/Panel/PanelRenderer";

import { Href } from "beinformed/models";

import type { ListModel } from "beinformed/models";

export type ListProps = {
  list: ListModel,
  className?: string,
  viewType?: string
};

/**
 * Render a list
 */
const List = (props: ListProps) => {
  const { className, list, viewType } = props;
  // this is arbitrary, but when a list has many attributes on the list,
  // make more room for them by creating a smaller detail
  const SMALL_AMOUNT_OF_COLUMNS_NUMBER = 4;
  const largeDetail = list.headers.length < SMALL_AMOUNT_OF_COLUMNS_NUMBER;

  const showList =
    !list.layouthint.has(SHOW_ONE_RESULT_AS_DETAIL) ||
    list.listItemCollection.length !== 1;

  const listClass = classNames("list", className, {
    "has-filters": list.filterCollection.hasItems,
    "has-detail": list.detail !== null && showList,
    "has-detail-only": list.detail !== null && !showList
  });

  const listDetailClass = classNames({
    "col-12 col-md-5": showList && !largeDetail,
    "col-12 col-md-7": showList && largeDetail,
    "col-12": !showList
  });

  return (
    <div>
      <Switch>
        <Route
          path={`${list.selfhref.path}/:id/:additionaldetail`}
          render={({ match }) => <PanelRenderer href={new Href(match.url)} />}
        />

        <Route>
          <div className={listClass} data-id={list.key}>
            <ListHeader list={list} />
            <div className="row list-body">
              {list.filterCollection.hasItems && (
                <Filters
                  className="col-2 hidden-xs-down list-filters"
                  list={list}
                />
              )}

              {showList && <ListMain list={list} viewType={viewType} />}
              {!showList &&
                list.detail && (
                  <DetailPanel className="col" detail={list.detail} />
                )}

              <Switch>
                <Route
                  path={list.actionCollection.routePath}
                  render={routeProps => <Form {...routeProps} isModal={true} />}
                />

                <Route
                  path={`${list.selfhref.path}/:id`}
                  render={({ match }) => {
                    if (match.params.id) {
                      const listitem = list.getListItemById(match.params.id);
                      if (listitem) {
                        return (
                          <ListDetail
                            href={listitem.selfhref}
                            listitem={listitem}
                            className={listDetailClass}
                          />
                        );
                      }
                    }

                    return null;
                  }}
                />
              </Switch>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default List;
