// @flow
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { get } from "lodash";

import { retrieveAttributeInput } from "fsdemo/utils/AttributeInputCache";
import modularui from "beinformed/utils/modularui/modularui";

class ApplyForMortgageCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      fetching: false
    };
  }

  componentDidMount() {
    this.startApplication(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.startApplication(nextProps);
  }

  getValue(data, key) {
    if (data && data.objects) {
      let value = null;
      data.objects.forEach(object => {
        Object.values(object).forEach(item => {
          if (item[key]) {
            value = item[key];
          }
        });
      });

      if (value) {
        return value;
      }
    }

    return retrieveAttributeInput(key) || "";
  }

  startApplication(props) {
    if (props.list && !props.fetching && !this.state.redirect) {
      this.setState({ fetching: true });

      const createApplicationAction = props.list.actionCollection.first;

      const data = get(props.location, "state.data");
      const parsedData = data ? JSON.parse(data) : null;

      createApplicationAction.fieldCollection.all.forEach(field => {
        field.update(this.getValue(parsedData, field.key));
      });

      this.setState({
        redirect: createApplicationAction.selfhref.toLocation(),
        fetching: false
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return null;
  }
}

export default modularui(
  "apply-mortgage",
  "/apply-for-a-mortgage/applications",
  { propName: "list" }
)(ApplyForMortgageCreate);
