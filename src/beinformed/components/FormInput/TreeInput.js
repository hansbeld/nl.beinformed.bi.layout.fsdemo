// @flow
import React, { Component } from "react";
import classNames from "classnames";

import PlusBoxOutlineIcon from "mdi-react/PlusBoxOutlineIcon";
import MinusBoxOutlineIcon from "mdi-react/MinusBoxOutlineIcon";

import CheckboxInput from "beinformed/components/FormInput/CheckboxInput";
import RadioInput from "beinformed/components/FormInput/RadioInput";
import FormContentRenderer from "beinformed/components/FormContent/FormContentRenderer";
import { KEYCODES } from "beinformed/constants/Constants";

import "./TreeInput.scss";

import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";
import type ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";

type TreeInputProps = {
  ariaLabel?: string,
  ariaLabelledBy?: string,
  className?: string,
  disabled?: boolean,
  id: string,
  label: string,
  level: number,
  name: string,
  optionContentConfiguration: ContentConfigurationElements | null,
  options: ChoiceAttributeOptionModel[],
  readOnly?: boolean,
  stacked: boolean,
  type: "checkbox" | "radiobutton",
  inError?: boolean,
  onChange: (value: string) => void
};

type TreeInputToggleProps = {
  expanded: boolean,
  id: string,
  option: ChoiceAttributeOptionModel,
  onClick: (e: SyntheticEvent<*>, option: ChoiceAttributeOptionModel) => void,
  onKeyDown: (
    e: SyntheticKeyboardEvent<*>,
    option: ChoiceAttributeOptionModel
  ) => void
};

/**
 * Render toggle icon and 'button' to toggle children
 */
const TreeInputToggle = ({
  expanded,
  id,
  option,
  onClick,
  onKeyDown
}: TreeInputToggleProps) => {
  const toggleClass = classNames("choice-tree-toggle", {
    "tree-node-closed": !expanded,
    "tree-node-open": expanded
  });

  const ToggleIcon = expanded ? MinusBoxOutlineIcon : PlusBoxOutlineIcon;

  return (
    <ToggleIcon
      className={toggleClass}
      role="button"
      aria-controls={`${id}-${option.code}`}
      aria-expanded={expanded}
      tabIndex="0"
      aria-label={`Toggle ${option.label}`}
      onClick={e => onClick(e, option)}
      onKeyDown={e => onKeyDown(e, option)}
    />
  );
};

type TreeInputState = {
  visible: string[]
};

/**
 * Render a {@see https://facebook.github.io/react/docs/forms.html#uncontrolled-components|controlled} checkbox input with label
 * behind the checkbox
 */
class TreeInput extends Component<TreeInputProps, TreeInputState> {
  static defaultProps = {
    level: 0
  };

  constructor(props: TreeInputProps) {
    super(props);

    this.state = {
      visible: []
    };
  }

  /**
   * Toggle child nodes when enter or space is pressed
   */
  handleToggleKeydown = (
    e: SyntheticKeyboardEvent<*>,
    option: ChoiceAttributeOptionModel
  ) => {
    if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
      this.handleToggleClick(e, option);
    }
  };

  /**
   * Toggle child nodes
   */
  handleToggleClick = (
    e: SyntheticEvent<*>,
    option: ChoiceAttributeOptionModel
  ) => {
    e.preventDefault();

    const visible = this.state.visible;
    const optionIndex = this.state.visible.indexOf(option.code);

    if (optionIndex === -1) {
      visible.push(option.code);
    } else {
      visible.splice(optionIndex);
    }

    this.setState({
      visible
    });
  };

  render() {
    const rootClass = this.props.level === 0 ? this.props.className : "";
    const treeClass = classNames(rootClass, {
      "choice-tree": this.props.level === 0,
      [`choice-tree-level-${this.props.level}`]: this.props.level > 0
    });
    let ariaLabelledBy = void 0;

    if (!this.props.ariaLabel) {
      ariaLabelledBy =
        this.props.ariaLabelledBy ||
        `${this.props.id || this.props.name}-label`;
    }
    const id = this.props.id || this.props.name;

    const ChoiceInputType =
      this.props.type === "radiobutton" ? RadioInput : CheckboxInput;

    return (
      <ul
        className={treeClass}
        role="tree"
        id={`${id}-${this.props.level}`}
        aria-label={this.props.ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {this.props.options.map(option => (
          <li key={option.code} className="tree-option" role="treeitem">
            {option.children && (
              <TreeInputToggle
                expanded={this.state.visible.includes(option.code)}
                id={this.props.id}
                option={option}
                onClick={this.handleToggleClick}
                onKeyDown={this.handleToggleKeydown}
              />
            )}

            <ChoiceInputType
              name={this.props.name}
              id={this.props.id || this.props.name}
              label={option.label}
              value={option.code}
              isChecked={option.selected}
              disabled={this.props.disabled || this.props.readOnly}
              inError={this.props.inError}
              count={option.count}
              stacked={this.props.stacked}
              onChange={this.props.onChange}
            />

            {option.concept &&
              this.props.optionContentConfiguration && (
                <FormContentRenderer
                  concept={option.concept}
                  contentConfiguration={this.props.optionContentConfiguration}
                />
              )}

            {option.children &&
              this.state.visible.includes(option.code) && (
                <TreeInput
                  {...this.props}
                  options={option.children.all}
                  level={this.props.level + 1}
                />
              )}
          </li>
        ))}
      </ul>
    );
  }
}

export default TreeInput;
