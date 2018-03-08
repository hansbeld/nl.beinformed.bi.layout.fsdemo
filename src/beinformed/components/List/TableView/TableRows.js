// @flow
import React from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";

import type { ListModel } from "beinformed/models";
import TableRow from "beinformed/components/List/TableView/TableRow";
import TableRowLink from "beinformed/components/List/TableView/TableRowLink";

import { Href } from "beinformed/models";

import type { Location } from "react-router-dom";

type TableRowsProps = {
  children?: any,
  list: ListModel,
  location: Location
};

/**
 * Render an HTML table rows
 */
const TableRows = ({ children, list, location }: TableRowsProps) => {
  const tableRowsClass = classNames("table-rows");

  return (
    <div className={tableRowsClass}>
      {list.listItemCollection.all.map(listitem => {
        if (
          listitem.selfhref === null ||
          listitem.selfhref.equals(new Href("#"))
        ) {
          return (
            <TableRow key={listitem.id} list={list} item={listitem}>
              {children}
            </TableRow>
          );
        }

        return (
          <TableRowLink
            key={listitem.id}
            list={list}
            item={listitem}
            href={
              new Href(
                `${list.selfhref.path}/${listitem.id}${location.search}`,
                "ListDetail"
              )
            }
          >
            {children}
          </TableRowLink>
        );
      })}
    </div>
  );
};

export default withRouter(TableRows);
