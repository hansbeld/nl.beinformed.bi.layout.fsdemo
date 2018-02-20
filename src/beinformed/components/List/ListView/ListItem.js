// @flow
import React, { Component } from "react";
import classNames from "classnames";

import Link from "beinformed/components/Link/Link";

import AttributeList from "beinformed/components/AttributeList/AttributeList";

import MultiRowTaskCheckbox from "beinformed/containers/MultiRowTask/MultiRowTaskCheckbox";

import type DetailModel from "beinformed/models/detail/DetailModel";
import type Href from "beinformed/models/href/Href";

import "./ListItem.scss";

type ListItemProps = {
  item: DetailModel,
  href?: Href,
  isActive: boolean,
  navToCaseView: boolean,
  isSelectable: boolean
};

class ListItem extends Component<ListItemProps> {
  renderTitle() {
    const { item, isSelectable } = this.props;

    const titleAttribute = item.titleAttribute;

    const className = "list-group-item-heading w-100 justify-content-between";

    if (isSelectable) {
      return (
        <MultiRowTaskCheckbox className={className} value={item.id}>
          {titleAttribute.readonlyvalue}
        </MultiRowTaskCheckbox>
      );
    }

    return <div className={className}>{titleAttribute.readonlyvalue}</div>;
  }

  renderAttributes() {
    const { item } = this.props;

    const attributes = item.attributeCollection.all.filter(
      attribute =>
        attribute.type !== "image" && attribute.key !== item.titleAttribute.key
    );

    return <AttributeList direction="horizontal" attributes={attributes} />;
  }

  getDetailLink(href: Href): Href {
    const { item, navToCaseView } = this.props;

    return navToCaseView ? item.selfhref : href;
  }

  render() {
    const { item, href, isActive, isSelectable } = this.props;

    const itemClass = classNames("list-group-item", {
      "list-group-item-action": Boolean(href),
      selectable: isSelectable,
      active: isActive
    });

    if (href && !isSelectable) {
      return (
        <div data-id={item.id} className={itemClass}>
          <Link href={this.getDetailLink(href)}>
            {this.renderTitle()}
            {this.renderAttributes()}
          </Link>
        </div>
      );
    }

    if (href) {
      return (
        <div data-id={item.id} className={itemClass}>
          {this.renderTitle()}
          <Link
            className={classNames({ active: isActive })}
            dataId={item.id}
            href={this.getDetailLink(href)}
          >
            {this.renderAttributes()}
          </Link>
        </div>
      );
    }

    return (
      <div data-id={item.id} className={itemClass}>
        {this.renderTitle()}
        {this.renderAttributes()}
      </div>
    );
  }
}

export default ListItem;
