// @flow
import React, { Component } from "react";
import Helmet from "react-helmet";
import classNames from "classnames";

import { Redirect } from "react-router-dom";

import { AttributeFactory } from "beinformed/models";

import { withMessage, Message } from "beinformed/i18n";

import Button from "beinformed/components/Button/Button";
import HTMLForm from "beinformed/components/HTMLForm/HTMLForm";

import PasswordAttribute from "beinformed/components/FormAttribute/PasswordAttribute";
import StringAttribute from "beinformed/components/FormAttribute/StringAttribute";

import Modal from "beinformed/components/Modal/Modal";
import ModalBody from "beinformed/components/Modal/ModalBody";
import ModalFooter from "beinformed/components/Modal/ModalFooter";
import ModalHeader from "beinformed/components/Modal/ModalHeader";
import ModalTitle from "beinformed/components/Modal/ModalTitle";

import "./SignIn.scss";

import type {
  StringAttributeModel,
  PasswordAttributeModel
} from "beinformed/models";
import type { Location, RouterHistory } from "react-router-dom";

type SignInProps = {
  isAuthenticated: boolean,
  errorMessage: string | null,
  location: Location,
  history: RouterHistory,
  inError: boolean,
  message: messageFunctionType,
  onCancel: (e: SyntheticEvent<*>) => void,
  onSubmit: (username: string, password: string) => void
};

type SignInState = {
  username: StringAttributeModel,
  password: PasswordAttributeModel
};

class SignIn extends Component<SignInProps, SignInState> {
  constructor(props) {
    super(props);

    this.state = {
      username: AttributeFactory.createAttribute(
        "string",
        "username",
        {
          value: ""
        },
        {
          type: "string",
          label: this.props.message("Login.Username", "Username"),
          placeholder: this.props.message(
            "Login.Username.Placeholder",
            "Enter username"
          )
        }
      ),
      password: AttributeFactory.createAttribute(
        "password",
        "password",
        {
          value: ""
        },
        {
          type: "string",
          label: this.props.message("Login.Password", "Password"),
          placeholder: this.props.message(
            "Login.Password.Placeholder",
            "Enter Password"
          )
        }
      )
    };
  }

  handleInputChange = (attribute, value) => {
    attribute.update(value);

    this.setState({
      [attribute.key]: attribute
    });
  };

  handleSubmit = () => {
    this.props.onSubmit(
      this.state.username.inputvalue,
      this.state.password.inputvalue
    );
  };

  renderRedirect() {
    const { location } = this.props;

    const redirectTo =
      location.state && location.state.from
        ? location.state.from
        : { pathname: "/", state: {} };

    redirectTo.state = {
      ...redirectTo.state,
      reload: true
    };

    return <Redirect to={redirectTo} />;
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger" role="alert">
          <Message id={this.props.errorMessage} />
        </div>
      );
    }

    return null;
  }

  renderInputs() {
    return [
      <StringAttribute
        key="username"
        attribute={this.state.username}
        name={this.state.username.key}
        onChange={this.handleInputChange}
        autoFocus
      />,

      <PasswordAttribute
        key={"password"}
        attribute={this.state.password}
        name={this.state.password.key}
        enableSuggestions={false}
        message={this.props.message}
        onChange={this.handleInputChange}
      />
    ];
  }

  renderSubmitButton(isModal: boolean) {
    return (
      <Button
        type="submit"
        name="login"
        buttonStyle="primary"
        className={classNames({ "btn-block": !isModal })}
      >
        <Message id="Login.Button.Login" defaultMessage="Login" />
      </Button>
    );
  }

  renderPage() {
    return (
      <div className="login-page">
        <Helmet>
          <title>{this.props.message("Login.Header", "Login")}</title>
        </Helmet>
        <div className="container">
          <h2>
            <Message id="Login.Header" defaultMessage="Login" />
          </h2>

          <HTMLForm name="login" onSubmit={this.handleSubmit}>
            {this.renderError()}

            {this.renderInputs()}

            {this.renderSubmitButton(false)}
          </HTMLForm>
        </div>
      </div>
    );
  }

  renderModal() {
    const { history } = this.props;

    return (
      <Modal className="login-modal">
        <Helmet>
          <title>{this.props.message("Login.Header", "Login")}</title>
        </Helmet>
        <ModalHeader showClose onClose={() => history.goBack()}>
          <ModalTitle>
            <Message id="Login.Header" defaultMessage="Login" />
          </ModalTitle>
        </ModalHeader>
        <HTMLForm name="login" onSubmit={this.handleSubmit}>
          <ModalBody>
            {this.renderError()}

            {this.renderInputs()}
          </ModalBody>
          <ModalFooter>
            <Button type="button" name="close" onClick={() => history.goBack()}>
              <Message id="Login.Button.Close" defaultMessage="Close" />
            </Button>

            {this.renderSubmitButton(true)}
          </ModalFooter>
        </HTMLForm>
      </Modal>
    );
  }

  render() {
    const { isAuthenticated, location } = this.props;

    if (isAuthenticated) {
      return this.renderRedirect();
    }

    if (location.state && location.state.modal) {
      return this.renderModal();
    }

    return this.renderPage();
  }
}

export default withMessage(SignIn);
