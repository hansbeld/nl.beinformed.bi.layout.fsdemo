// @flow
import React, { Component } from "react";
import classNames from "classnames";

import Button from "beinformed/components/Button/Button";
import FormErrorTree from "beinformed/components/FormError/FormErrorTree";
import Popover from "beinformed/components/Popover/Popover";
import { KEYCODES } from "beinformed/constants/Constants";

import "./ButtonErrorPopover.scss";

import type { FormModel } from "beinformed/models";

type ButtonErrorPopoverProps = {
  buttonStyle:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "link"
    | "light"
    | "dark",
  children?: any,
  className?: string,
  form: FormModel,
  name: string,
  type?: "button" | "submit" | "reset"
};

type ButtonErrorPopoverState = {
  popoverVisible: boolean
};

/**
 * Render disabled button with popover functionality to show errors on hover
 */
class ButtonErrorPopover extends Component<
  ButtonErrorPopoverProps,
  ButtonErrorPopoverState
> {
  _wrapper: ?HTMLSpanElement;
  _timeoutId: TimeoutID;

  constructor(props: ButtonErrorPopoverProps) {
    super(props);

    this.state = {
      popoverVisible: false
    };
  }

  /**
   * @override
   * onMouseLeave doesn't work on disabled elements.
   * https://github.com/facebook/react/issues/4251
   */
  componentDidMount() {
    this.watchForNativeMouseLeave();
  }

  componentWillUnmount() {
    this.removeWatchForNativeMouseLeave();
  }

  /**
   * @override
   */
  componentDidUpdate() {
    this.watchForNativeMouseLeave();
  }

  /**
   * Event that is triggert mouse leaves the error button
   */
  handleLeave = () => {
    const POPOVER_TIMEOUT = 200;

    this._timeoutId = setTimeout(() => {
      this.setState({
        popoverVisible: false
      });
    }, POPOVER_TIMEOUT);
  };

  /**
   * Handle click on disabled button
   */
  handleDisabledButton = (e: SyntheticEvent<*>) => {
    if (
      this.props.form.isValid ||
      (e.type === "keydown" && e.keyCode === KEYCODES.TAB)
    ) {
      return;
    }

    e.preventDefault();
  };

  /**
   * Event that is triggert mouse enters the error button
   */
  handleEnter = () => {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }

    this.setState({
      popoverVisible: true
    });
  };

  /**
   * Retrieve element to focus
   */
  getFocusElementByID(id: string) {
    const gotoElement = document.getElementById(id);

    if (gotoElement) {
      if (gotoElement.tagName === "INPUT" || gotoElement.tagName === "SELECT") {
        return gotoElement;
      }

      const gotoElementInputs = gotoElement.querySelectorAll("input, select");

      if (gotoElementInputs.length > 0) {
        return gotoElementInputs[0];
      }
    }

    const modal = document.querySelector(".modal");
    const allInputs = modal
      ? modal.querySelectorAll("input, select")
      : document.querySelectorAll("input, select");

    if (allInputs.length > 0) {
      return allInputs[0];
    }

    return null;
  }

  /**
   * Handles click on the link of an attribute that is in error
   */
  handleErrorAttributeClick = (attribute: AttributeType) => {
    const focusElement = this.getFocusElementByID(
      `${this.props.form.key}-${attribute.name}`
    );

    if (focusElement) {
      focusElement.focus();
    }
  };

  /**
   * @override
   */
  watchForNativeMouseLeave() {
    if (this._wrapper) {
      this._wrapper.addEventListener("mouseleave", this.handleLeave);
    }
  }

  removeWatchForNativeMouseLeave() {
    if (this._wrapper) {
      this._wrapper.removeEventListener("mouseleave", this.handleLeave);
    }
  }

  render() {
    const buttonClass = classNames(this.props.className, {
      disabled: !this.props.form.isValid
    });

    return (
      <span
        ref={c => {
          this._wrapper = c;
        }}
        className="button-error-popover"
        style={{
          position: "relative",
          zIndex: 999
        }}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        onFocus={this.handleEnter}
        onBlur={this.handleLeave}
      >
        <Button
          type={this.props.type}
          name={this.props.name}
          className={buttonClass}
          buttonStyle={this.props.buttonStyle}
          disabled={!this.props.form.isValid}
          onClick={this.handleDisabledButton}
          onKeyDown={this.handleDisabledButton}
        >
          {this.props.children}
        </Button>

        {this.state.popoverVisible && (
          <Popover alignment="top left" offsetRight={23}>
            <FormErrorTree
              form={this.props.form}
              onAttributeClick={attribute => {
                this.handleErrorAttributeClick(attribute);
              }}
            />
          </Popover>
        )}
      </span>
    );
  }
}

export default ButtonErrorPopover;
