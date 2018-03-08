// @flow
import React, { Component } from "react";
import { Route } from "react-router-dom";

import Form from "beinformed/containers/Form/Form";

import Action from "beinformed/components/Actions/Action";

import { Message } from "beinformed/i18n";

import "./FormButtons.scss";

type FormButtonsProps = {
  caseview: CaseViewModel
};

class FormButtons extends Component<FormButtonsProps> {
  _actions: Array<Object>;

  constructor(props) {
    super(props);

    this.state = {
      actions: this.getActions(this.props.panel)
    };
  }

  getActions(activePanel) {
    const actions =
      activePanel.type === "GroupingPanel"
        ? activePanel.taskGroupCollection.first.actionCollection
        : activePanel.actionCollection;

    const prevAction = this.getAction(
      actions,
      actions.getActionsByLayoutHint("btn-previous"),
      "btn-link",
      "Previous"
    );
    const nextAction = this.getAction(
      actions,
      actions.getActionsByLayoutHint("btn-next"),
      "btn-primary",
      "Next"
    );
    const confirmAction = this.getAction(
      actions,
      actions.getActionsByLayoutHint("btn-confirm"),
      "btn-primary",
      "Confirm"
    );
    const submitAction = this.getAction(
      actions,
      actions.getActionsByLayoutHint("btn-submit"),
      "btn-primary",
      "Submit"
    );

    return [prevAction, nextAction, confirmAction, submitAction].filter(
      a => a !== null
    );
  }

  getAction(actions, action, className, label) {
    if (action.length > 0) {
      return {
        action: action.first,
        className,
        label
      };
    }

    return null;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      actions: this.getActions(nextProps.panel)
    });
  }

  render() {
    const isDisabled =
      typeof this.state.actions.find(
        action =>
          action.action.layouthint.has("btn-next") ||
          action.action.layouthint.has("btn-confirm") ||
          action.action.layouthint.has("btn-submit")
      ) === "undefined";

    return (
      <div className="form-buttons">
        {this.state.actions.map(action => (
          <Route
            key={`route-${action.action.name}`}
            path={action.action.selfhref.path}
            component={Form}
          />
        ))}

        <div className="offset-5">
          {this.state.actions.map(action => (
            <Action
              key={action.action.name}
              action={action.action}
              className={`btn ${action.className}`}
              renderIcon={false}
            >
              <Message
                id={`Form.Button.${action.label}`}
                defaultMessage={action.label}
              />
            </Action>
          ))}

          {isDisabled && (
            <button className="btn btn-primary" disabled>
              {this.props.panel.key === "SubmitRequest" ? (
                <Message id="Form.Button.Submit" defaultMessage="Submit" />
              ) : (
                <Message id="Form.Button.Confirm" defaultMessage="Confirm" />
              )}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default FormButtons;
