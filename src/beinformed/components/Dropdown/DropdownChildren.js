// @flow
import React, { Children, Component, cloneElement } from "react";
import classNames from "classnames";

import DropdownItem from "beinformed/components/Dropdown/DropdownItem";
import DropdownLink from "beinformed/components/Dropdown/DropdownLink";

type DropdownChildrenProps = {
  children: any,
  align?: "right" | "left",
  show?: boolean
};

type DropdownChildrenState = {
  activeIndex: number
};

/**
 * Renders children of a dropdown in a dropdown menu container
 */
class DropdownChildren extends Component<
  DropdownChildrenProps,
  DropdownChildrenState
> {
  _childs: Array<any>;

  static defaultProps = {
    show: false
  };

  static displayName = "DropdownChildren";

  constructor(props: DropdownChildrenProps) {
    super(props);

    this._childs = [];

    this.state = {
      activeIndex: 0
    };
  }

  getActiveIndex(direction: "ArrowUp" | "ArrowDown") {
    if (direction === "ArrowUp") {
      return this.state.activeIndex === 0
        ? this._childs.length - 1
        : this.state.activeIndex - 1;
    }

    if (direction === "ArrowDown") {
      return this.state.activeIndex === this._childs.length - 1
        ? 0
        : this.state.activeIndex + 1;
    }

    return -1;
  }

  keyUp = (e: KeyboardEvent) => {
    const pressedKey = e.key;
    if (pressedKey === "ArrowUp" || pressedKey === "ArrowDown") {
      e.preventDefault();

      const activeIndex = this.getActiveIndex(pressedKey);
      this.setState({
        activeIndex
      });

      const child = this._childs[activeIndex];
      if (child && typeof child.focus === "function") {
        child.focus();
      }
    }
  };

  addNavigation(child: any, index: number) {
    return cloneElement(child, {
      key: index,
      ref: node => {
        // Keep your own reference
        if (node !== null) {
          this._childs.push(node);
        }

        // Call the original ref, if any
        const { ref } = child;
        if (typeof ref === "function") {
          ref(node);
        }
      },
      onKeyUp: e => {
        this.keyUp(e);
      }
    });
  }

  extendChildren() {
    this._childs = [];
    return Children.map(
      this.props.children,
      (child, i) =>
        child.type === DropdownLink || child.type === DropdownItem
          ? this.addNavigation(child, i)
          : child
    );
  }

  render() {
    const dropdownMenuClass = classNames("dropdown-menu", {
      "dropdown-menu-right": this.props.align === "right",
      show: this.props.show
    });

    return (
      <div className={dropdownMenuClass} aria-hidden={!this.props.show}>
        {this.extendChildren()}
      </div>
    );
  }
}

export default DropdownChildren;
