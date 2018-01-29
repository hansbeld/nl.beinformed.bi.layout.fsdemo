// @flow
import React, { Component } from "react";
import classNames from "classnames";

import "./Modal.scss";

type ModalProps = {
  children?: any,
  className?: string,
  size?: "small" | "medium" | "large"
};

/**
 * Render a modal
 */
class Modal extends Component<ModalProps> {
  _modal: ?HTMLDivElement;

  /**
   * Set modal open css class on body
   */
  componentDidMount() {
    if (document.body) {
      document.body.classList.add("modal-open");
    }
  }

  /**
   * Remove modal open css class from body, remove keydown event listener
   */
  componentWillUnmount() {
    if (document.body) {
      document.body.classList.remove("modal-open");
    }
  }

  /**
   * Scroll to top of modal
   */
  scrollTop() {
    if (this._modal) {
      this._modal.scrollTop = 0;
    }
  }

  render() {
    const modalClass = classNames(
      "modal-dialog",
      {
        "modal-sm": this.props.size === "small",
        "modal-lg": this.props.size === "large"
      },
      this.props.className
    );

    return (
      <div
        className="modal"
        role="dialog"
        ref={c => {
          this._modal = c;
        }}
      >
        <div className={modalClass} role="document">
          <div className="modal-content">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Modal;
