// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { Message, withMessage } from "beinformed/containers/I18n/Message";
import ListHref from "beinformed/models/href/ListHref";

import Dropdown from "beinformed/components/Dropdown/Dropdown";
import DropdownButton from "beinformed/components/Dropdown/DropdownButton";
import DropdownChildren from "beinformed/components/Dropdown/DropdownChildren";
import DropdownLink from "beinformed/components/Dropdown/DropdownLink";
import Icon from "beinformed/components/Icon/Icon";

import "./SortChooser.scss";

import type ListModel from "beinformed/models/list/ListModel";
import type Href from "beinformed/models/href/Href";

type SortChooserProps = {
  align: "left" | "right",
  className?: string,
  direction?: "down" | "up",
  list: ListModel,
  message: messageFunctionType,
  size: "small" | "default" | "large",
  onSort: (href: Href) => void
};

/**
 * Dropdown showing sort order options
 */
class SortChooser extends Component<SortChooserProps> {
  /**
   * Get Href for sort option
   */
  getOptionHref(option, direction, optionContext, selectedOptions) {
    const selectedContext = selectedOptions
      .filter(selectedOption => {
        if (optionContext.id === "none" && "context" in selectedOption) {
          return true;
        } else if (
          optionContext.id !== "none" &&
          (!("context" in selectedOption) ||
            selectedOption.context.id !== optionContext.id)
        ) {
          return true;
        }

        return false;
      })
      .map(selectedOption => `${selectedOption.key} ${selectedOption.order}`)
      .join(",");

    const optionHref = new ListHref(this.props.list.selfhref);

    optionHref.page = 1;
    optionHref.sort = `${selectedContext}${selectedContext === "" ? "" : ","}${
      option.key
    } ${direction}`;

    return optionHref;
  }

  /**
   * Retrieve available options in an easy to render array
   * @return {Array}
   */
  getOptions() {
    const availableOptions = this.props.list.sorting.options;
    const currentOptions = this.props.list.sorting.value;

    const optionsByContext = {};

    availableOptions.forEach(option => {
      const currentSortOption = currentOptions.find(
        sort => sort.value === option.value
      );
      const direction =
        currentSortOption && currentSortOption.order === "asc" ? "desc" : "asc";

      const context = option.context || {
        id: "none",
        label: ""
      };

      const renderOption = {
        isContext: false,
        context,
        isCurrentSort: typeof currentSortOption !== "undefined",
        href: this.getOptionHref(option, direction, context, currentOptions),
        label: option.label,
        value: `${option.value} ${direction}`,
        direction
      };

      if (context.id in optionsByContext) {
        optionsByContext[context.id].push(renderOption);
      } else {
        optionsByContext[context.id] = [renderOption];
      }
    });

    if (Object.keys(optionsByContext).length === 1) {
      const optionsByContextKey = Object.keys(optionsByContext)[0];

      return optionsByContext[optionsByContextKey];
    }

    const renderOptions = [];

    Object.keys(optionsByContext).forEach(contextId => {
      const context = optionsByContext[contextId][0].context;

      renderOptions.push({
        isContext: true,
        context,
        label: context.label
      });
      renderOptions.push(...optionsByContext[contextId]);
    });

    return renderOptions;
  }

  /**
   * Retrieve current sort order as label
   * @return {string}
   */
  renderDropdownButton() {
    const currentSort = this.props.list.sorting.value;

    if (currentSort.length === 0) {
      return (
        <DropdownButton className="btn-light" size={this.props.size}>
          <Message
            id="SortChooser.SortDefaultLabel"
            defaultMessage="Sort by relevance"
          />
        </DropdownButton>
      );
    }

    return (
      <DropdownButton className="btn-light" size={this.props.size}>
        {currentSort.map((sortedItem, i) => (
          <span key={i}>
            <Message
              id="SortChooser.SortBy"
              defaultMessage="Sort by {COLUMN_NAME}"
              data={{ COLUMN_NAME: sortedItem.label }}
            />
            <Icon name={`sort-amount-${sortedItem.order}`} textBefore />
          </span>
        ))}
      </DropdownButton>
    );
  }

  renderDropdownItems() {
    return this.getOptions().map((option, i) => {
      if (option.isContext && option.label === "") {
        return <div key={i} className="dropdown-divider" />;
      } else if (option.isContext) {
        return (
          <div key={i} className="dropdown-item sortchooser-header">
            {option.label}
          </div>
        );
      }

      return (
        <DropdownLink
          key={option.value}
          value={option.value}
          href={option.href}
          onClick={this.props.onSort}
          isActive={option.isCurrentSort}
        >
          {option.label}
          {option.isCurrentSort && (
            <Icon name={`sort-amount-${option.direction}`} textBefore />
          )}
        </DropdownLink>
      );
    });
  }

  render() {
    const activeValue = this.props.list.sorting.param
      ? this.props.list.sorting.param
      : "";

    const sortchooserClass = classNames("sortchooser", this.props.className);

    return (
      <Dropdown
        align={this.props.align}
        className={sortchooserClass}
        direction={this.props.direction}
        activeValue={activeValue}
      >
        {this.renderDropdownButton()}
        <DropdownChildren>{this.renderDropdownItems()}</DropdownChildren>
      </Dropdown>
    );
  }
}

export default withMessage(SortChooser);
