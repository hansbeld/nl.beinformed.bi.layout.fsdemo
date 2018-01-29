// @flow
import React, { Component } from "react";
import classNames from "classnames";

type NavigationBarProps = {
  id: string,
  children: any
};

type NavigationBarState = {
  expanded: boolean
};

class NavigationBar extends Component<NavigationBarProps, NavigationBarState> {
  constructor(props: NavigationBarProps) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          aria-controls={`navbar${this.props.id}`}
          aria-expanded={this.state.expanded.toString()}
          aria-label="Toggle navigation"
          onClick={this.handleExpandClick}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={classNames("navbar-collapse", {
            open: this.state.expanded,
            collapse: !this.state.expanded
          })}
          id={`navbar${this.props.id}`}
        >
          {this.props.children}
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
