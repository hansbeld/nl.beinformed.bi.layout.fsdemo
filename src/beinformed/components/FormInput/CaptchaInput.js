// @flow
import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";

import xhr from "beinformed/utils/fetch/xhr";
import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";

import { CAPTCHA_PATH, HTTP_METHODS } from "beinformed/constants/Constants";

import Icon from "beinformed/components/Icon/Icon";
import { Message } from "beinformed/containers/I18n/Message";

import "./CaptchaInput.scss";

type CaptchaInputProps = {
  ariaLabel?: string,
  ariaLabelledBy?: string,
  className?: string,
  id?: string,
  inError?: boolean,
  name: string,
  placeholder?: string,
  value: string,
  onChange: (value: string) => void,
  onStartProgress: () => void,
  onFinishProgress: () => void
};

type CaptchaInputState = {
  isFetching: boolean,
  tokenId: string | null,
  image: string | null,
  validated: boolean,
  valid: boolean,
  answer: string
};

class CaptchaInput extends Component<CaptchaInputProps, CaptchaInputState> {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      tokenId: null,
      image: null,
      validated: false,
      valid: false,
      answer: ""
    };
  }

  componentDidMount() {
    this.setState({
      isFetching: true
    });

    this.requestCaptcha();
  }

  requestCaptcha() {
    this.props.onStartProgress();
    xhr({ url: CAPTCHA_PATH }).then(captchaResponse => {
      this.props.onChange("");

      this.setState({
        isFetching: false,
        tokenId: captchaResponse.tokenId,
        image: captchaResponse.image,
        validated: false,
        valid: captchaResponse.valid,
        answer: ""
      });

      this.props.onFinishProgress();
    });
  }

  changeValue(value: string) {
    this.setState({
      answer: value
    });
  }

  sendCaptcha() {
    this.props.onStartProgress();

    xhr({
      url: CAPTCHA_PATH,
      method: HTTP_METHODS.POST,
      data: {
        tokenId: this.state.tokenId,
        answer: this.state.answer
      }
    })
      .then(captchaResponse => {
        this.setState({
          validated: true,
          valid: captchaResponse.valid
        });

        // on valid answer set the value of the captcha model to the token
        this.props.onChange(this.state.tokenId || "");

        this.props.onFinishProgress();
      })
      .catch(err => {
        this.setState({
          tokenId: err.response.tokenId,
          image: err.response.image,
          validated: true,
          valid: err.response.valid,
          answer: ""
        });

        // on invalid token, remove value from model
        this.props.onChange("");

        this.props.onFinishProgress();
      });
  }

  render() {
    const {
      className,
      inError,
      ariaLabel,
      ariaLabelledBy,

      name,
      placeholder
    } = this.props;

    const isValid = this.state.valid && !inError;

    const inputClass = classNames("form-control", className, {
      "is-invalid": this.state.validated && !isValid
    });

    const id = this.props.id || name;

    return (
      <div className="captcha-group">
        {this.state.image && (
          <div className="captcha-image">
            <img
              alt="Captcha"
              src={`data:image/png;base64,${this.state.image}`}
            />
            <button
              className="btn btn-captcha-refresh"
              onClick={e => {
                e.preventDefault();

                this.requestCaptcha();
              }}
            >
              <Icon name="refresh" />
            </button>
          </div>
        )}
        {this.state.valid ? (
          <div className="captcha-answered">
            <Icon name="check" textAfter />
            <span className="captcha-answer">{this.state.answer}</span>
          </div>
        ) : (
          <div className="captcha-answer input-group">
            <input
              className={inputClass}
              id={id}
              aria-label={ariaLabel}
              aria-labelledby={
                ariaLabel ? null : ariaLabelledBy || `${id}-label`
              }
              name={name}
              placeholder={placeholder}
              type="text"
              value={this.state.answer}
              onChange={e => this.changeValue(e.target.value)}
              onBlur={() =>
                this.state.answer === "" ? null : this.sendCaptcha()
              }
            />
            <span className="input-group-btn">
              <button
                className="btn btn-captcha-verify"
                type="button"
                onClick={e => {
                  if (!this.state.validated && this.state.answer !== "") {
                    e.preventDefault();
                    this.sendCaptcha();
                  }
                }}
              >
                <Message
                  id="btn-check-captcha"
                  defaultMessage="Verify answer"
                />
              </button>
            </span>
          </div>
        )}

        {this.state.validated &&
          !this.state.valid && (
            <ul className="text-muted mb-0 small list-unstyled input-assistant">
              <li className="text-danger">
                <Icon name="exclamation-circle" textAfter />
                <Message
                  id="Constraint.Captcha.InvalidToken"
                  defaultMessage="The given answer does not match the expected answer, please try again"
                />
              </li>
            </ul>
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
  onStartProgress: startProgress,
  onFinishProgress: finishProgress
})(CaptchaInput);
