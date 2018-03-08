// @flow
import React, { Component } from "react";

import Dropdown from "beinformed/components/Dropdown/Dropdown";
import DropdownButton from "beinformed/components/Dropdown/DropdownButton";
import DropdownChildren from "beinformed/components/Dropdown/DropdownChildren";
import DropdownLink from "beinformed/components/Dropdown/DropdownLink";

import type { LinkModel } from "beinformed/models";

type NavigationDropdownProps = {
  toggleLabel: string,
  items: Array<LinkModel>
};

/**
 * Tab component chooser
 */
class TabComponentMenu extends Component<NavigationDropdownProps> {
  render() {
    const { toggleLabel, items } = this.props;

    return (
      <Dropdown className="component-chooser">
        <DropdownButton>{toggleLabel}</DropdownButton>
        <DropdownChildren>
          {items.map((item, idx) => (
            <DropdownLink
              key={`${item.key}-${idx}`}
              id={item.key}
              href={item.href}
            >
              {item.label}
            </DropdownLink>
          ))}
        </DropdownChildren>
      </Dropdown>
    );
  }
}

export default TabComponentMenu;
