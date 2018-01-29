// @flow
import React, { Component } from "react";
import classNames from "classnames";

type DatepickerTableProps = {
  children?: any,
  className?: string,
  onKeyDown?: (e: SyntheticKeyboardEvent<*>) => void
};

/**
 * Render date field
 */
class DatepickerTable extends Component<DatepickerTableProps> {
  _table: ?HTMLTableElement;

  /**
   * When rendered put focus on calendar
   */
  focus() {
    if (this._table) {
      this._table.focus();
    }
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const tableClass = classNames("table", this.props.className);

    return (
      <table
        ref={c => {
          this._table = c;
        }}
        className={tableClass}
        role="grid"
        tabIndex="0"
        onKeyDown={this.props.onKeyDown}
      >
        {this.props.children}
      </table>
    );
  }
}

export default DatepickerTable;
