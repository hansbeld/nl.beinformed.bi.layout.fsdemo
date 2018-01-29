// @flow
import React, { Component } from "react";
import classNames from "classnames";

import { KEYCODES } from "beinformed/constants/Constants";

type DropdownItemProps = {
  ariaLabel?: string,
  children?: any,
  className?: string,
  id?: string,
  selected?: boolean,
  style?: any,
  value?: string,
  onClick: Function,
  onKeyUp?: Function
};

/**
 * Render dropdown item
 */
class DropdownItem extends Component<DropdownItemProps> {
  _item: any;

  render() {
    const {
      className,
      selected,
      style,
      id,
      value,
      ariaLabel,
      onClick,
      onKeyUp,
      children
    } = this.props;

    const dropdownClass = classNames("dropdown-item", className, {
      active: selected
    });

    return (
      <div
        className={dropdownClass}
        style={style}
        tabIndex="0"
        data-id={id}
        data-value={value}
        aria-label={ariaLabel}
        role="button"
        onClick={e => onClick(value, e)}
        onKeyUp={e => {
          if ([KEYCODES.SPACE, KEYCODES.ENTER].includes(e.keyCode)) {
            e.preventDefault();

            return onClick(e);
          }

          return onKeyUp ? onKeyUp(e) : true;
        }}
      >
        {children}
      </div>
    );
  }
}

export default DropdownItem;
