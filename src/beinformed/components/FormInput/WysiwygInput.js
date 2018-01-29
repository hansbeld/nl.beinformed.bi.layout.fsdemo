// @flow
import React, { Component } from "react";
import classNames from "classnames";

import Icon from "beinformed/components/Icon/Icon";
import { KEYCODES } from "beinformed/constants/Constants";

import "./WysiwygInput.scss";

type WysiwygInputProps = {
  ariaLabel?: string,
  ariaLabelledBy?: string,
  className?: string,
  disabled?: boolean,
  id: string,
  inError: boolean,
  name: string,
  readOnly?: boolean,
  rows: number,
  value: string,
  onChange: (value: string) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

type WysiwygInputState = {
  boldActive: boolean,
  italicActive: boolean,
  underlineActive: boolean,
  strikethroughActive: boolean
};

/**
 * Render default wysiwyg input
 *
 * Sidenote: Maybe we should implement the Draft component from facebook: https://facebook.github.io/draft-js/
 */
export default class WysiwygInput extends Component<
  WysiwygInputProps,
  WysiwygInputState
> {
  _content: ?HTMLDivElement;
  _buttonBold: ?HTMLButtonElement;
  _buttonItalic: ?HTMLButtonElement;
  _buttonUnderline: ?HTMLButtonElement;
  _buttonStrikethrough: ?HTMLButtonElement;

  static defaultProps = {
    value: "",
    rows: 5
  };

  constructor(props: WysiwygInputProps) {
    super(props);

    this.state = {
      boldActive: false,
      italicActive: false,
      underlineActive: false,
      strikethroughActive: false
    };
  }

  /**
   * Check if received html is different from current html
   */
  shouldComponentUpdate(nextProps: WysiwygInputProps) {
    if (this._content) {
      return nextProps.value !== this._content.innerHTML;
    }

    return false;
  }

  /**
   * Component was updated, check if current value still matches editor value
   */
  componentDidUpdate() {
    if (this._content) {
      if (this.props.value !== this._content.innerHTML) {
        this._content.innerHTML = this.props.value;
      }
    }
  }

  /**
   * Process change event
   */
  handleChange = () => {
    const html = this._content ? this._content.innerHTML : "";

    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(html);
      this._setButtons();
    }
  };

  /**
   * Make selected text bold
   */
  handleBoldClick = () => {
    document.execCommand("bold");
  };

  /**
   * Make selected text italic
   */
  handleItalicClick = () => {
    document.execCommand("italic");
  };

  /**
   * Make selected text underline
   */
  handleUnderlineClick = () => {
    document.execCommand("underline");
  };

  /**
   * Make selected text strikethrough
   */
  handleStrikethroughClick = () => {
    document.execCommand("strikethrough");
  };

  /**
   * Reset selected text to unformatted text
   */
  handleEraseClick = () => {
    document.execCommand("removeFormat");
  };

  /**
   * Process a keypress
   * @param  {SyntheticEvent<*>} e - event data
   */
  handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === KEYCODES.ENTER) {
      document.execCommand("formatBlock", false, "p");
    }
    this._setButtons();
  };

  /**
   * Process a click on the content editable element
   */
  handleClick = () => {
    this._setButtons();
  };

  setButtonState(command: string) {
    // $FlowFixMe
    return document.queryCommandValue(command) === "true";
  }

  /**
   * Set state of toolbar buttons
   */
  _setButtons() {
    this.setState({
      boldActive: this.setButtonState("bold"),
      italicActive: this.setButtonState("italic"),
      underlineActive: this.setButtonState("underline"),
      strikethroughActive: this.setButtonState("strikethrough")
    });
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const inputClass = classNames(
      "wysiwyg",
      "form-control",
      this.props.className,
      {
        "is-invalid": this.props.inError
      }
    );
    const boldButtonClass = classNames("btn btn-light", {
      active: this.state.boldActive === true
    });
    const italicButtonClass = classNames("btn btn-light", {
      active: this.state.italicActive === true
    });
    const underlineButtonClass = classNames("btn btn-light", {
      active: this.state.underlineActive === true
    });
    const strikethroughButtonClass = classNames("btn btn-light", {
      active: this.state.strikethroughActive === true
    });

    let ariaLabelledBy = null;

    if (!this.props.ariaLabel) {
      ariaLabelledBy =
        this.props.ariaLabelledBy ||
        `${this.props.id || this.props.name}-label`;
    }

    const id = this.props.id || this.props.name;

    const ROW_HEIGHT = 1.5;

    const editableContentStyle = {
      height: `${this.props.rows * ROW_HEIGHT}em`
    };
    const editableContentValue = {
      __html: this.props.value
    };

    return (
      <div className={inputClass}>
        <textarea
          id={id}
          className="wysiwyg-hidden-input"
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value}
          readOnly={this.props.readOnly}
          disabled={this.props.disabled}
          aria-hidden="true"
          tabIndex="-1"
        />
        <div className="btn-toolbar wysiwyg-toolbar" role="toolbar">
          <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="wysiwyg buttons"
          >
            <button
              ref={c => {
                this._buttonBold = c;
              }}
              type="button"
              className={boldButtonClass}
              aria-label="Bold"
              onClick={this.handleBoldClick}
            >
              <Icon name="bold" />
            </button>
            <button
              ref={c => {
                this._buttonItalic = c;
              }}
              type="button"
              className={italicButtonClass}
              aria-label="Italic"
              onClick={this.handleItalicClick}
            >
              <Icon name="italic" />
            </button>
            <button
              ref={c => {
                this._buttonUnderline = c;
              }}
              type="button"
              className={underlineButtonClass}
              aria-label="Underline"
              onClick={this.handleUnderlineClick}
            >
              <Icon name="underline" />
            </button>
            <button
              ref={c => {
                this._buttonStrikethrough = c;
              }}
              type="button"
              className={strikethroughButtonClass}
              aria-label="Strikethrough"
              onClick={this.handleStrikethroughClick}
            >
              <Icon name="strikethrough" />
            </button>
          </div>
          <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="wysiwyg buttons"
          >
            <button
              type="button"
              className="btn btn-light"
              aria-label="Erase"
              onClick={this.handleEraseClick}
            >
              <Icon name="eraser" />
            </button>
          </div>
        </div>

        <div
          ref={c => {
            this._content = c;
          }}
          className="wysiwyg-content"
          style={editableContentStyle}
          contentEditable={this.props.readOnly !== true}
          spellCheck={false}
          onInput={this.handleChange}
          onBlur={this.handleChange}
          onFocus={this.props.onFocus}
          onKeyDown={this.handleKeyDown}
          onClick={this.handleClick}
          aria-label={this.props.ariaLabel}
          aria-labelledby={ariaLabelledBy}
          dangerouslySetInnerHTML={editableContentValue}
          role="textbox"
          aria-multiline="true"
          tabIndex="0"
        />
      </div>
    );
  }
}
