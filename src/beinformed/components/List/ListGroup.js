// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { ListItemCollection } from "beinformed/models";

import AttributeList from "beinformed/components/AttributeList/AttributeList";
import ListResults from "beinformed/components/List/ListResults";

import type { GroupingModel, ListModel } from "beinformed/models";

type ListGroupProps = {
  grouping: GroupingModel,
  level?: number,
  className?: string,
  list: ListModel,
  View: any
};

/**
 * Render List groups
 */
class ListGroup extends Component<ListGroupProps> {
  static defaultProps = {
    level: 1
  };

  /**
   * Retrieve all list item that have a reference to the group reference
   */
  getFilteredList(list: ListModel, references: Array<number>) {
    const filteredList = list.clone();

    filteredList.listItemCollection = new ListItemCollection();
    filteredList.listItemCollection.collection = list.listItemCollection.filter(
      listitem => references.includes(listitem.id)
    );

    return filteredList;
  }

  render() {
    const groupHeaderClass = classNames("grouped-list-header", {
      h4: this.props.level === 1
    });

    if (this.props.grouping.hasGroups()) {
      return (
        <div className="grouped-list">
          {this.props.grouping.groups.map(group => (
            <div
              key={group.id}
              className="grouped-list-group"
              data-id={group.id}
            >
              <AttributeList
                direction="horizontal"
                className={groupHeaderClass}
                attributes={group.attributeCollection.all}
              />

              {group.reference &&
                group.reference.length > 0 && (
                  <ListResults
                    className={this.props.className}
                    list={this.getFilteredList(
                      this.props.list,
                      group.reference
                    )}
                    View={this.props.View}
                  />
                )}

              {group.grouping && (
                <ListGroup
                  grouping={group.grouping}
                  level={this.props.level + 1}
                  className={this.props.className}
                  list={this.props.list}
                  View={this.props.View}
                />
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <ListResults
        className={this.props.className}
        list={this.props.list}
        View={this.props.View}
      />
    );
  }
}

export default ListGroup;
