// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { Message } from "beinformed/containers/I18n/Message";
import Dropdown from "beinformed/components/Dropdown/Dropdown";
import DropdownButton from "beinformed/components/Dropdown/DropdownButton";
import DropdownChildren from "beinformed/components/Dropdown/DropdownChildren";
import DropdownLink from "beinformed/components/Dropdown/DropdownLink";

import ListHref from "beinformed/models/href/ListHref";

import type ListModel from "beinformed/models/list/ListModel";

type PagesizeChooserProps = {
  align: "left" | "right",
  className: string,
  direction: "down" | "up",
  list: ListModel,
  size: "small" | "large" | "default"
};

/**
 * Render pagesize chooser
 */
class PagesizeChooser extends Component<PagesizeChooserProps> {
  render() {
    const { list, className, align, direction, size } = this.props;

    const maxPageSize = list.paging.totalResults;
    const sizeOptions = list.paging.pagesize.options.filter(
      (option, i, arr) => option < maxPageSize || arr[i - 1] < maxPageSize
    );

    const dropdownClass = classNames("pagesizechooser", className);

    return (
      <Dropdown
        align={align}
        className={dropdownClass}
        direction={direction}
        activeValue={list.paging.pagesize.value.toString()}
      >
        <DropdownButton className="btn-light" size={size}>
          <Message
            id="PagesizeChooser.PageSize"
            defaultMessage="Page size: {PAGESIZE}"
            data={{ PAGESIZE: list.paging.pagesize.value }}
          />
        </DropdownButton>
        <DropdownChildren>
          {sizeOptions.map((option, i) => {
            const pagesizeHref: ListHref = new ListHref(
              this.props.list.selfhref
            );

            pagesizeHref.pagesize = option;
            pagesizeHref.page = 1;

            return (
              <DropdownLink
                key={i}
                value={option.toString()}
                href={pagesizeHref}
                isActive={list.paging.pagesize.value === option}
              >
                {option.toString()}
              </DropdownLink>
            );
          })}
        </DropdownChildren>
      </Dropdown>
    );
  }
}

export default PagesizeChooser;
