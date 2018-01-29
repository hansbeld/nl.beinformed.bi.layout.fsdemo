// @flow
import React, { Component } from "react";
import createAttribute from "beinformed/components/FormAttribute/createAttribute";
import PasswordInput from "beinformed/components/FormInput/PasswordInput";

import withMessage from "beinformed/containers/I18n/withMessage";

import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";
import type PasswordAttributeModel from "beinformed/models/attributes/PasswordAttributeModel";

type PasswordAttributeProps = {
  attribute: PasswordAttributeModel,
  className?: string,
  questionContentConfiguration?: ContentConfigurationElements,
  id?: string,
  enableSuggestions?: boolean,
  name: string,
  formLayout?: "vertical" | "horizontal",
  message: any,
  onChange: (attribute: PasswordAttributeModel, value: string) => void,
  onBlur?: (e: SyntheticEvent<*>) => void,
  onFocus?: (e: SyntheticEvent<*>) => void
};

type PasswordAttributeState = {
  confirmAttribute: PasswordAttributeModel | null
};

const Password = createAttribute(PasswordInput);
const ConfirmPassword = createAttribute(PasswordInput);

class PasswordAttribute extends Component<
  PasswordAttributeProps,
  PasswordAttributeState
> {
  constructor(props: PasswordAttributeProps) {
    super(props);

    this.state = {
      confirmAttribute: null
    };
  }

  componentWillMount() {
    if (this.props.attribute.layouthint.has("confirm-password")) {
      const confirmAttribute = this.props.attribute.clone(true);
      confirmAttribute.isConfirmPassword = true;

      confirmAttribute.label = this.props.message
        ? this.props.message(
            "Password.Confirm.Label",
            `Confirm ${this.props.attribute.label.toLowerCase()}`,
            {
              label: this.props.attribute.label.toLowerCase()
            }
          )
        : `Confirm ${this.props.attribute.label.toLowerCase()}`;

      confirmAttribute.otherLabel = this.props.attribute.label;

      this.setState({
        confirmAttribute
      });
    }
  }

  handleChange = (attribute: any, value: string) => {
    const confirmAttribute = this.state.confirmAttribute;

    if (confirmAttribute) {
      this.props.attribute.otherLabel = confirmAttribute.label;

      if (attribute.isConfirmPassword) {
        this.props.attribute.confirmValue = value;
        confirmAttribute.update(value);

        this.props.onChange(
          this.props.attribute,
          this.props.attribute.inputvalue
        );
      } else {
        confirmAttribute.confirmValue = value;
        this.props.onChange(attribute, value);
      }

      this.setState({
        confirmAttribute
      });
    } else {
      this.props.onChange(attribute, value);

      // need to set state to update rendering
      this.setState({
        confirmAttribute: null
      });
    }
  };

  render() {
    return this.props.attribute.layouthint.has("confirm-password") &&
      this.state.confirmAttribute !== null
      ? [
          <Password
            key="password"
            enableSuggestions={true}
            {...this.props}
            onChange={this.handleChange}
          />,
          <ConfirmPassword
            key="confirmpassword"
            {...this.props}
            enableSuggestions={false}
            id={`confirm_${this.props.attribute.key}`}
            name={`confirm_${this.props.attribute.key}`}
            attribute={this.state.confirmAttribute}
            onChange={this.handleChange}
          />
        ]
      : [
          <Password
            key="single_password"
            enableSuggestions={
              this.props.attribute.key === "password_old"
                ? false
                : this.props.enableSuggestions
            }
            {...this.props}
            onChange={this.handleChange}
          />
        ];
  }
}

export default withMessage(PasswordAttribute);
