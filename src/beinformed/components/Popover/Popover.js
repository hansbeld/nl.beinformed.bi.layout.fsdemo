// @flow
import React, { Component } from "react";
import classNames from "classnames";

import "./Popover.scss";

type PopoverProps = {
  horizontalAlignment: "left" | "center" | "right",
  verticalAlignment: "top" | "center" | "bottom",
  children?: any,
  className?: string,
  offsetTop: number,
  offsetRight: number,
  offsetBottom: number,
  offsetLeft: number
};

type PopoverState = {
  alignment: string
};

/**
 * Render popover
 */
class Popover extends Component<PopoverProps, PopoverState> {
  _popover: ?HTMLDivElement;

  static defaultProps = {
    horizontalAlignment: "center",
    verticalAlignment: "top",
    offsetTop: 0,
    offsetRight: 0,
    offsetBottom: 0,
    offsetLeft: 0
  };

  constructor(props: PopoverProps) {
    super(props);
    this.state = {
      alignment: `${props.verticalAlignment} ${props.horizontalAlignment}`
    };
  }

  /**
   * Set position when component mounts
   */
  componentDidMount() {
    this.setPosition();
  }

  /**
   * Set position when component updates
   */
  componentDidUpdate() {
    this.setPosition();
  }

  /**
   * Get position left, relative to initial position
   */
  // eslint-disable-next-line complexity
  getLeftPosition(popover: HTMLDivElement) {
    const popoverRect = popover.getBoundingClientRect();

    const parentNode = popover.parentNode;
    if (parentNode && parentNode instanceof HTMLElement) {
      const parentRect = parentNode.getBoundingClientRect();

      switch (this.state.alignment) {
        case "top left":
        case "bottom left":
          return (
            -1 *
            (popoverRect.width -
              parentRect.width +
              this.props.offsetRight -
              this.props.offsetLeft)
          );

        case "right":
        case "right top":
        case "right center":
        case "right bottom":
          return (
            parentRect.width + this.props.offsetRight - this.props.offsetLeft
          );

        case "top":
        case "bottom":
        case "top center":
        case "bottom center":
          return (
            -1 *
            ((popoverRect.width - parentRect.width) / 2 +
              this.props.offsetRight -
              this.props.offsetLeft)
          );

        case "top right":
        case "bottom right":
          return this.props.offsetLeft - this.props.offsetRight;

        case "left":
        case "left top":
        case "left center":
        case "left bottom":
          return (
            -1 * popoverRect.width +
            this.props.offsetRight -
            this.props.offsetLeft
          );

        default:
          return 0;
      }
    }

    return 0;
  }

  /**
   * Get position top, relative to initial position
   */
  getTopPosition(popover: HTMLDivElement) {
    const popoverRect = popover.getBoundingClientRect();

    const parentNode = popover.parentNode;
    if (parentNode && parentNode instanceof HTMLElement) {
      const parentRect = parentNode.getBoundingClientRect();

      switch (this.state.alignment) {
        case "top":
        case "top left":
        case "top center":
        case "top right":
          return (
            -1 * popoverRect.height +
            this.props.offsetTop -
            this.props.offsetBottom
          );

        case "right bottom":
        case "left bottom":
          return this.props.offsetTop - this.props.offsetBottom;

        case "right center":
        case "left center":
          return (
            -1 * (popoverRect.height / 2) +
            this.props.offsetTop -
            this.props.offsetBottom
          );

        case "right top":
        case "left top":
          return (
            -1 * (popoverRect.height - parentRect.height) +
            this.props.offsetTop -
            this.props.offsetBottom
          );

        case "bottom":
        case "bottom left":
        case "bottom center":
        case "bottom right":
          return (
            parentRect.height + this.props.offsetTop - this.props.offsetBottom
          );

        default:
          return 0;
      }
    }

    return 0;
  }

  /**
   * Set position of popover
   */
  setPosition() {
    const popover = this._popover;
    if (!popover) {
      return;
    }

    const leftPosition = this.getLeftPosition(popover);
    const topPosition = this.getTopPosition(popover);

    popover.style.position = "absolute";
    popover.style.left = `${leftPosition}px`;
    popover.style.top = `${topPosition}px`;

    let offsetTop = 0;
    let el = popover.offsetParent;

    while (el) {
      if (el instanceof HTMLElement) {
        offsetTop = offsetTop + el.offsetTop;
        el = el.offsetParent;
      } else {
        el = null;
      }
    }

    if (this.state.alignment.includes("top") && offsetTop < -1 * topPosition) {
      this.setState({
        alignment: this.state.alignment.replace("top", "bottom")
      });
    }
  }

  /**
   * Get css class for arrow of popover
   */
  getPopoverArrow() {
    switch (this.state.alignment) {
      case "top left":
      case "top center":
      case "top right":
        return `bs-popover-top popover-${this.state.alignment.replace(
          " ",
          "-"
        )}`;

      case "right top":
      case "right center":
      case "right bottom":
        return `bs-popover-right popover-${this.state.alignment.replace(
          " ",
          "-"
        )}`;

      case "bottom left":
      case "bottom center":
      case "bottom right":
        return `bs-popover-bottom popover-${this.state.alignment.replace(
          " ",
          "-"
        )}`;

      case "left top":
      case "left center":
      case "left bottom":
        return `bs-popover-left popover-${this.state.alignment.replace(
          " ",
          "-"
        )}`;

      default:
        return "";
    }
  }

  /**
   * Render popover
   */
  render() {
    const { className, children } = this.props;

    const popoverClass = classNames(
      "custom-popover popover",
      this.getPopoverArrow(),
      className
    );

    const RANDOM_DEFAULT_WIDTH = 500;
    const maxWidth = window ? window.innerWidth : RANDOM_DEFAULT_WIDTH;

    return (
      <div
        ref={c => {
          this._popover = c;
        }}
        className={popoverClass}
        style={{
          width: maxWidth
        }}
      >
        {this.state.alignment && <div className="arrow" />}
        <div className="popover-body popover-content">{children}</div>
      </div>
    );
  }
}

export default Popover;
