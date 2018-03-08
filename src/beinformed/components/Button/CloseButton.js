// @flow
import React, { Component } from "react";

import { Message } from "beinformed/i18n";
import Button from "beinformed/components/Button/Button";
import { KEYCODES } from "beinformed/constants/Constants";

type CloseButtonProps = {
  onClose: (e: SyntheticEvent<*>) => void
};

/**
 * Render a close button
 */
class CloseButton extends Component<CloseButtonProps> {
  /**
   * Add listener for escape key press
   */
  componentDidMount() {
    if (this.props.onClose) {
      window.addEventListener("keydown", this.handleKeydown, false);
    }
  }

  /**
   * Remove listener for escape key press
   */
  componentWillUnmount() {
    if (this.props.onClose) {
      window.removeEventListener("keydown", this.handleKeydown, false);
    }
  }

  /**
   * Handle escape key to trigger close button
   */
  handleKeydown = (e: SyntheticKeyboardEvent<*>) => {
    if (e.keyCode === KEYCODES.ESCAPE) {
      this.props.onClose(e);
    }
  };

  render() {
    return (
      <Button
        buttonStyle=""
        className="close"
        aria-label="Close"
        onClick={this.props.onClose}
        name="closeButton"
      >
        <span aria-hidden="true">&times;</span>
        <Message
          id="CloseButton.label"
          defaultMessage="Close"
          screenreaderOnly
        />
      </Button>
    );
  }
}

export default CloseButton;
