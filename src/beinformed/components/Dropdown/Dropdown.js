// @flow
import React, { Component, Children, cloneElement } from "react";
import classNames from "classnames";

import DropdownChildren from "beinformed/components/Dropdown/DropdownChildren";

import "./Dropdown.scss";

type DropdownProps = {
  activeValue?: string,
  children?: any,
  className?: string,
  direction?: "down" | "up"
};

type DropdownState = {
  showOptions: boolean
};

/**
 * Render dropdown element
 */
class Dropdown extends Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps) {
    super(props);

    this.state = {
      showOptions: false
    };
  }

  /**
   * componentWillUnmount, removes document wide click event observer
   */
  componentWillUnmount() {
    document.removeEventListener("click", this.hideDropdownChildren);
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  /**
   * Show children of dropdown, sets document wide click event observer
   */
  showDropdownChildren = () => {
    this.setState({
      showOptions: true
    });

    document.addEventListener("click", this.hideDropdownChildren);
    document.addEventListener("keydown", this.handleKeyPress);
  };

  handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      this.hideDropdownChildren(e);
    }
  };

  /**
   * Hide children of dropdown, removes document wide click event observer
   * @param  {SyntheticEvent<*>} e - event data
   */
  hideDropdownChildren = (e: Event) => {
    e.preventDefault();

    this.setState({
      showOptions: false
    });

    document.removeEventListener("click", this.hideDropdownChildren);
    document.removeEventListener("keydown", this.handleKeyPress);
  };

  addToggleProps(child: any, key: number) {
    return cloneElement(child, {
      key,
      onClick: e => {
        if (child.props.onClick) {
          child.props.onClick(e);
        }

        return this.showDropdownChildren();
      },
      isExpanded: this.state.showOptions
    });
  }

  mapShowProp(child: any, key: number) {
    return cloneElement(child, {
      key,
      show: this.state.showOptions
    });
  }

  renderChildren() {
    if (!this.props.children) {
      return <div>Missing childen in dropdown configuration</div>;
    }

    // Add toggle methods on all children that are not DropdownChildren
    return Children.map(
      this.props.children,
      (child, i) =>
        child.type.displayName === DropdownChildren.displayName
          ? this.mapShowProp(child, i)
          : this.addToggleProps(child, i)
    );
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const dropdownClass = classNames(
      "btn-group dropdown",
      this.props.className,
      {
        dropdown: this.props.direction === "down",
        dropup: this.props.direction === "up",
        show: this.state.showOptions
      }
    );

    return (
      <div className={dropdownClass} data-value={this.props.activeValue}>
        {this.renderChildren()}
      </div>
    );
  }
}

export default Dropdown;
