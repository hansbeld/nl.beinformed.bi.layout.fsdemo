// @flow
import React, { Component } from "react";

import EditableListItemModel from "beinformed/models/list/EditableListItemModel";

import InlineEditChoiceCell from "beinformed/components/InlineEdit/InlineEditChoiceCell";
import InlineEditDatetimeCell from "beinformed/components/InlineEdit/InlineEditDatetimeCell";
import InlineEditLookupCell from "beinformed/components/InlineEdit/InlineEditLookupCell";
import InlineEditMemoCell from "beinformed/components/InlineEdit/InlineEditMemoCell";
import InlineEditNumberCell from "beinformed/components/InlineEdit/InlineEditNumberCell";
import InlineEditPasswordCell from "beinformed/components/InlineEdit/InlineEditPasswordCell";
import InlineEditStringCell from "beinformed/components/InlineEdit/InlineEditStringCell";
import InlineEditUploadCell from "beinformed/components/InlineEdit/InlineEditUploadCell";
import InlineEditXMLCell from "beinformed/components/InlineEdit/InlineEditXMLCell";
import InlineEditMoneyCell from "beinformed/components/InlineEdit/InlineEditMoneyCell";

type InlineEditCellRendererProps = {
  attribute: AttributeType,
  item: EditableListItemModel,
  onBlur: Function,
  onChange: Function,
  onFocus: Function,
  onSubmit?: Function
};

type InlineEditCellRendererState = {
  hasFocus: boolean
};

/**
 * Render correct widget
 */
class InlineEditCellRenderer extends Component<
  InlineEditCellRendererProps,
  InlineEditCellRendererState
> {
  /**
   * constructor
   * @param {Object} props - Properties
   */
  constructor(props: InlineEditCellRendererProps) {
    super(props);

    this.state = {
      hasFocus: false
    };
  }

  /**
   * Method handling an element change
   */
  handleChange = (inputvalue: string) => {
    this.props.onChange(this.props.attribute, inputvalue);
  };

  /**
   * Method handling an element focus
   */
  handleFocus = (e: SyntheticEvent<*>) => {
    this.setState({
      hasFocus: true
    });
    this.props.onFocus(e);
  };

  /**
   * Method handling an element blur
   */
  handleBlur = (e: SyntheticEvent<*>) => {
    this.setState({
      hasFocus: false
    });
    this.props.onBlur(e);
  };

  render() {
    const { attribute, ...props } = this.props;

    const name = `${props.item.id}--${attribute.name}`;

    const attributeMap = {
      lookup: InlineEditLookupCell,
      choice: InlineEditChoiceCell,
      date: InlineEditDatetimeCell,
      time: InlineEditDatetimeCell,
      timestamp: InlineEditDatetimeCell,
      memo: InlineEditMemoCell,
      money: InlineEditMoneyCell,
      number: InlineEditNumberCell,
      password: InlineEditPasswordCell,
      upload: InlineEditUploadCell,
      xml: InlineEditXMLCell,
      string: InlineEditStringCell
    };

    const attributeType =
      attribute.type in attributeMap ? attribute.type : "string";

    const Attribute = attributeMap[attributeType];

    return (
      <Attribute
        attribute={attribute}
        className=""
        id={name}
        name={name}
        hasFocus={this.state.hasFocus}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...props}
      />
    );
  }
}

export default InlineEditCellRenderer;
