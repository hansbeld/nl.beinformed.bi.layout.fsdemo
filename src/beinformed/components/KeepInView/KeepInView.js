// @flow
import React, { Component } from "react";

type KeepInViewProps = {
  children?: any,
  className?: string,
  dataId?: number | string,
  enabled: boolean,
  offsetBottom: number,
  offsetTop: number
};

/**
 * Render an element that stops scrolling when bottom of element is reached, keeps it's children into view
 */
class KeepInView extends Component<KeepInViewProps> {
  _containerElement: ?HTMLDivElement;
  _scrollElement: ?HTMLDivElement;
  isPinned: boolean;

  static defaultProps = {
    offsetBottom: 10,
    offsetTop: 10,
    enabled: false
  };

  /**
   * componentDidMount, set dimensions of scroll element, add scroll event observer if enabled
   */
  componentDidMount() {
    if (this.props.enabled) {
      this.setFixedDimensions();
      this.setEventObserver();
    }
  }

  /**
   * set or remove scroll event observer when component is enabled or disabled
   * @param  {Objects} nextProps - New properties
   */
  componentWillReceiveProps(nextProps: KeepInViewProps) {
    if (nextProps.enabled && !this.props.enabled) {
      this.setEventObserver();
    } else if (this.props.enabled && !nextProps.enabled) {
      this.removeEventObserver();
    }
  }

  /**
   * process any updates in the children of this component
   */
  componentDidUpdate() {
    this.keepElementInView();
  }

  /**
   * componentWillUnmount
   */
  componentWillUnmount() {
    this.removeEventObserver();
  }

  /**
   * Handle scroll event
   */
  handleScroll = () => {
    this.keepElementInView();
  };

  /**
   * Handle resize event
   */
  handleResize = () => {
    this.setFixedDimensions();
  };

  /**
   * Set dimensions as fixed properties on element to prevent 100% elements to overlap in fixed display mode.
   */
  setFixedDimensions() {
    const scrollElement = this._scrollElement;
    const containerElement = this._containerElement;
    if (!scrollElement || !containerElement) {
      return;
    }

    containerElement.style.minHeight = "0";

    containerElement.style.minHeight = `${
      scrollElement.getBoundingClientRect().height
    }px`;

    scrollElement.style.width = "auto";

    scrollElement.style.width = `${
      scrollElement.getBoundingClientRect().width
    }px`;

    if (
      this.props.enabled &&
      scrollElement.getBoundingClientRect().top < this.props.offsetTop
    ) {
      scrollElement.style.top = `${this.props.offsetTop}px`;
      scrollElement.style.position = "fixed";
      this.isPinned = true;
    }
  }

  /**
   * Observe scroll event
   */
  setEventObserver() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
  }

  /**
   * remove scroll event observer
   */
  removeEventObserver() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  }

  /**
   * Keep element into view
   */
  keepElementInView() {
    const scrollElement = this._scrollElement;
    const containerElement = this._containerElement;
    if (!scrollElement || !containerElement) {
      return;
    }

    const windowHeight = window.innerHeight - this.props.offsetBottom;
    const containerRect = containerElement.getBoundingClientRect();
    const elementRect = scrollElement.getBoundingClientRect();

    if (containerRect.height < elementRect.height) {
      scrollElement.style.position = "static";
      scrollElement.style.top = "auto";
      this.isPinned = false;
    }
    containerElement.style.minHeight = `${elementRect.height}px`;

    if (this.isPinned && containerRect.top >= this.props.offsetTop) {
      // unpin element
      scrollElement.style.position = "static";
      scrollElement.style.top = "auto";
      this.isPinned = false;
    } else if (
      !this.isPinned &&
      elementRect.height <= windowHeight &&
      elementRect.top < this.props.offsetTop
    ) {
      scrollElement.style.top = `${this.props.offsetTop}px`;
      scrollElement.style.position = "fixed";
      this.isPinned = true;
    } else if (
      !this.isPinned &&
      elementRect.height > windowHeight &&
      elementRect.bottom <= windowHeight
    ) {
      scrollElement.style.top = `${windowHeight - elementRect.height}px`;
      scrollElement.style.position = "fixed";
      this.isPinned = true;
    }
  }

  /**
   * Render element
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div
        ref={c => {
          this._containerElement = c;
        }}
        className={this.props.className}
        data-id={this.props.dataId}
      >
        <div
          ref={c => {
            this._scrollElement = c;
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default KeepInView;
