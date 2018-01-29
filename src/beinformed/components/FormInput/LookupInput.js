// @flow
import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";

import { withMessage, Message } from "beinformed/containers/I18n/Message";
import xhr from "beinformed/utils/fetch/xhr";

import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";
import { handleError } from "beinformed/containers/Error/actions";

import { BASE, KEYCODES } from "beinformed/constants/Constants";
import Button from "beinformed/components/Button/Button";
import LookupInputActiveOption from "beinformed/components/FormInput/LookupInputActiveOption";
import LookupInputOption from "beinformed/components/FormInput/LookupInputOption";
import TextInput from "beinformed/components/FormInput/TextInput";
import Icon from "beinformed/components/Icon/Icon";
import ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";

import DropdownChildren from "beinformed/components/Dropdown/DropdownChildren";

import type LinkModel from "beinformed/models/links/LinkModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

import "./LookupInput.scss";

type LookupInputProps = {
  className?: string,
  disabled?: boolean,
  isMultiple: boolean,
  lookupLink: LinkModel,
  message: messageFunctionType,
  name: string,
  optionContentConfiguration: ContentConfigurationElements,
  options: ChoiceAttributeOptionModel[],
  readOnly?: boolean,
  onChange: (option: ChoiceAttributeOptionModel) => void,
  onError: (err: Error) => void,
  onFinishLookup: () => void,
  onStartLookup: () => void
};

type LookupInputState = {
  filterInput: string,
  filterOptions: ChoiceAttributeOptionModel[],
  showOptions: boolean,
  inProgress: boolean,
  activeOption: ChoiceAttributeOptionModel | null,
  options: ChoiceAttributeOptionModel[]
};

/**
 * Render lookup input
 */
class LookupInput extends Component<LookupInputProps, LookupInputState> {
  _timeout: number;
  _input: ?TextInput;
  _dropdown: ?HTMLDivElement;
  _lookupItems: ?HTMLDivElement;
  _focusedElementBeforeOpen: ?HTMLElement;

  constructor(props) {
    super(props);

    this.state = {
      filterInput: "",
      filterOptions: [],
      showOptions: false,
      inProgress: false,
      activeOption: null,
      options: props.options
    };
  }

  /**
   * componentWillUnmount, removes document wide click event observer
   */
  componentWillUnmount() {
    window.removeEventListener("mousedown", this.hideDropdown, true);
  }

  /**
   * Handles a click on the lookup search button
   */
  handleLookupButton = (e: SyntheticEvent<*>) => {
    e.preventDefault();

    this.doLookup(this.state.filterInput);
  };

  /**
   * Handles typing in the filter input
   * @param  {SytheticEvent} e - event data
   */
  handleLookup = filterInput => {
    const LOOKUP_TIMEOUT = 120;

    this.setState({
      filterInput,
      inProgress: true
    });

    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this.doLookup(filterInput);
    }, LOOKUP_TIMEOUT);
  };

  /**
   * Handle keydown on lookup button, when escape or tab hide drodown
   */
  handleLookupButtonKeyDown = (e: SyntheticKeyboardEvent<*>) => {
    if (e.keyCode === KEYCODES.ESCAPE || e.keyCode === KEYCODES.TAB) {
      this.hideDropdown();
    }
  };

  /**
   * Handles a click on one of the found options
   * @param  {Object} option - Code being clicked
   */
  handleOptionClick = option => {
    this.setState({
      options: [...this.state.options, option]
    });

    this.props.onChange(option);

    if (this.props.isMultiple) {
      if (this._input) {
        this._input.focus();
      }
    } else {
      this.hideDropdown();
    }
  };

  /**
   * Handles arrow key down and up
   */
  handleInputKeyDown = (e: SyntheticEvent<*>) => {
    if (
      (e.keyCode === KEYCODES.ARROW_UP || e.keyCode === KEYCODES.ARROW_DOWN) &&
      this.state.filterOptions.length > 0
    ) {
      let newActiveOptionIndex = 0;

      if (
        this.state.activeOption !== null &&
        this.state.filterOptions.length > 0
      ) {
        const activeOptionIndex = this.state.filterOptions.findIndex(
          option =>
            this.state.activeOption !== null &&
            option.code === this.state.activeOption.code
        );

        if (
          e.keyCode === KEYCODES.ARROW_DOWN &&
          activeOptionIndex < this.state.filterOptions.length - 1
        ) {
          newActiveOptionIndex = activeOptionIndex + 1;
        } else if (e.keyCode === KEYCODES.ARROW_UP && activeOptionIndex > 0) {
          newActiveOptionIndex = activeOptionIndex - 1;
        } else if (e.keyCode === KEYCODES.ARROW_UP) {
          newActiveOptionIndex = this.state.filterOptions.length - 1;
        }
      }

      this.setState({
        activeOption: this.state.filterOptions[newActiveOptionIndex]
      });
    } else if (
      e.keyCode === KEYCODES.ENTER &&
      (this.state.filterOptions.length === 1 ||
        this.state.activeOption !== null)
    ) {
      const activeOption =
        this.state.activeOption === null
          ? this.state.filterOptions[0]
          : this.state.activeOption;

      this.handleOptionClick(activeOption);

      if (this._lookupItems) {
        this._lookupItems.focus();
      }
    } else if (e.keyCode === KEYCODES.ESCAPE) {
      e.preventDefault();
      this.hideDropdown();

      if (this._lookupItems) {
        this._lookupItems.focus();
      }
    }
  };

  /**
   * Handles click on 'input'
   */
  handleOpen = () => {
    if (this.props.readOnly || this.props.disabled) {
      return;
    }

    this._focusedElementBeforeOpen = document.activeElement;
    this.setState({
      showOptions: true
    });

    const FOCUS_TIMEOUT = 10;

    setTimeout(() => {
      if (this._input) {
        this._input.focus();
      }
    }, FOCUS_TIMEOUT);
    window.addEventListener("mousedown", this.hideDropdown, true);
  };

  /**
   * Handle focus on list of selected items, open list of options when an option is selected
   */
  handleFocus = () => {
    if (
      typeof this.props.options.find(option => option.selected) !== "undefined"
    ) {
      this.handleOpen();
    }
  };

  /**
   * Handle keydown on list of selected items
   * @param  {SytheticEvent} e - event data
   */
  handleKeyDown = e => {
    if (e.keyCode === KEYCODES.SPACE && !this.state.showOptions) {
      e.preventDefault();
      this.handleOpen();
    }
  };

  /**
   * Handles removal of previously selected options
   * @param  {Object} option - Code of option to remove
   */
  handleActiveOptionRemoval = option => {
    this.props.onChange(option);
  };

  /**
   * Hide children of dropdown, removes document wide click event observer
   * @param  {SytheticEvent} e - event data
   */
  hideDropdown = e => {
    if (e && this._dropdown && this._dropdown.contains(e.target)) {
      return;
    }

    this.setState({
      filterInput: "",
      filterOptions: [],
      showOptions: false
    });
    window.removeEventListener("mousedown", this.hideDropdown, true);
  };

  /**
   * Handles the actual lookup
   * @param  {string} filterInput - input to search for
   */
  doLookup(filterInput) {
    if (this.props.lookupLink === null) {
      throw new Error(
        "No lookup link specified, this is required to do a lookup"
      );
    }

    this.props.onStartLookup();

    if (filterInput.trim() === "") {
      this.setState({
        filterInput: "",
        filterOptions: [],
        inProgress: false
      });
      this.props.onFinishLookup();
    } else {
      xhr({
        url: `${BASE}${this.props.lookupLink.href.href}`,
        params: `labelFilter=${filterInput}`
      })
        .then(response => {
          const options = response.options.map(
            option => new ChoiceAttributeOptionModel(option)
          );

          this.setState({
            filterOptions: options,
            inProgress: false
          });
          this.props.onFinishLookup();

          return response;
        })
        .catch(err => this.props.onError(err));

      this.setState({
        filterInput
      });
    }
  }

  renderActiveOptions() {
    /**
     * Combine options available in component state with the options available in the attribute model, where the options in the attribute model are leading.
     * State in this component is only used to be able to get the labels for options that are found during lookup
     */
    const getSelectedOptions = () =>
      this.props.options
        .filter(option => option.selected)
        .map(option =>
          this.state.options.find(
            stateOption => stateOption.code === option.code
          )
        );

    if (this.props.options.filter(option => option.selected).length > 0) {
      return getSelectedOptions().map(option => {
        if (option) {
          return (
            <LookupInputActiveOption
              key={option.code}
              option={option}
              onClick={this.handleActiveOptionRemoval}
              readOnly={this.props.readOnly}
              disabled={this.props.disabled}
              optionContentConfiguration={this.props.optionContentConfiguration}
            />
          );
        }

        return null;
      });
    }

    return null;
  }

  renderFoundOptions() {
    if (this.state.filterOptions.length === 0) {
      return (
        <li className="list-group-item">
          <div className="no-results">
            {this.state.filterInput.length > 0 && !this.state.inProgress ? (
              <Message
                id="LookupInput.Msg.NoOptions"
                defaultMessage="No options found"
              />
            ) : (
              <Message
                id="LookupInput.Placeholder"
                defaultMessage="Enter one or more characters"
              />
            )}
          </div>
        </li>
      );
    }

    return this.state.filterOptions.map(option => (
      <LookupInputOption
        key={option.code}
        activeOption={this.state.activeOption}
        filterInput={this.state.filterInput}
        option={option}
        onClick={this.handleOptionClick}
        optionContentConfiguration={this.props.optionContentConfiguration}
      />
    ));
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const lookupClass = classNames("lookup dropdown", this.props.className, {
      show: this.state.showOptions
    });

    const activeOptionsClass = classNames(
      "form-control lookup-active-options",
      {
        "custom-select": !this.props.disabled && !this.props.readOnly,
        readOnly: this.props.readOnly,
        disabled: this.props.disabled
      }
    );

    return (
      <div
        className={lookupClass}
        ref={c => {
          this._dropdown = c;
        }}
      >
        <div
          ref={c => (this._lookupItems = c)}
          className={activeOptionsClass}
          role="button"
          tabIndex="0"
          aria-haspopup="true"
          aria-label={this.props.message(
            "LookupInput.ActiveOptions",
            "Active options"
          )}
          onClick={this.handleOpen}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          readOnly={this.props.readOnly}
        >
          {this.renderActiveOptions()}
        </div>
        {this.state.showOptions && (
          <DropdownChildren show={this.state.showOptions}>
            <TextInput
              ref={c => {
                this._input = c;
              }}
              className="is-lookup"
              name={`${this.props.name}_lookupInput`}
              value={this.state.filterInput}
              onChange={this.handleLookup}
              onKeyDown={this.handleInputKeyDown}
              append={
                <Button
                  name="lookup"
                  className="lookup-button ml-1"
                  onClick={this.handleLookupButton}
                  onKeyDown={this.handleLookupButtonKeyDown}
                >
                  <Icon
                    name={this.state.inProgress ? "refresh" : "search"}
                    spin={this.state.inProgress}
                  />
                  <Message
                    id="LookupInput.Button.Lookup"
                    defaultMessage="Lookup"
                    screenreaderOnly
                  />
                </Button>
              }
            />
            <ul className="lookup-options list-group" role="listbox">
              {this.renderFoundOptions()}
            </ul>
          </DropdownChildren>
        )}
      </div>
    );
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state, ownProps) => ownProps;

export default connect(mapStateToProps, {
  onStartLookup: startProgress,
  onFinishLookup: finishProgress,
  onError: handleError
})(withMessage(LookupInput));
