// @flow
import React, { Component } from "react";

import EditableListModel from "beinformed/models/list/EditableListModel";

import ApplyForMortgageList from "fsdemo/containers/ApplyForMortgage/ApplyForMortgageList";

import ApplyForMortgageResult from "fsdemo/components/ApplyForMortgageDetail/ApplyForMortgageResult";
import ApplyForMortgageRiskProfile from "fsdemo/components/ApplyForMortgageRiskProfile/ApplyForMortgageRiskProfile";
import ApplyForMortgageSubmitRequest from "fsdemo/components/ApplyForMortgageSubmitRequest/ApplyForMortgageSubmitRequest";
import FormButtons from "fsdemo/components/ApplyForMortgage/FormButtons";

import Attribute from "beinformed/components/AttributeList/Attribute";
import List from "beinformed/components/List/List";

import PanelRenderer from "fsdemo/containers/ApplyForMortgage/PanelRenderer";

import "./FormPanel.scss";

type FormPanelProps = {
  isRoot: boolean,
  panel: any
};

class FormPanel extends Component<FormPanelProps> {
  renderAttributeList(attributes: Array<AttributeType>) {
    // have to remove the _id column, see: https://support.beinformed.com/browse/BIPD-9487
    const filteredAttributes = attributes.filter(
      attribute =>
        attribute.key !== "_id" &&
        attribute.value !== null &&
        attribute.value !== ""
    );

    return (
      <div className="attributelist">
        {filteredAttributes.map(attribute => (
          <Attribute key={attribute.key} attribute={attribute} />
        ))}
      </div>
    );
  }

  renderResult(attributes, contentConfiguration) {
    return (
      <ApplyForMortgageResult
        attributes={attributes}
        contentConfiguration={contentConfiguration}
      />
    );
  }

  renderListDetail(detail) {
    return (
      <div key={detail.key} className="mb-4">
        {this.renderAttributeList(detail.attributeCollection.all)}
        {detail.results &&
          detail.results.children &&
          this.renderResult(
            detail.results.children.all,
            detail.contentConfiguration
          )}
      </div>
    );
  }

  renderList(list) {
    if (list.key === "MortgageType") {
      return (
        <div key={list.key} className="attributelist">
          {list.listItemCollection.first.attributeCollection.all.map(
            attribute => <Attribute key={attribute.key} attribute={attribute} />
          )}
        </div>
      );
    }

    if (list instanceof EditableListModel) {
      return (
        <div key={list.key} className="form-panel-list mb-4">
          <ApplyForMortgageList list={list} />
        </div>
      );
    }

    return <List key={list.key} list={list} keepPanelsInView={false} />;
  }

  renderPanel(activePanel) {
    if (activePanel.key === "RiskProfile") {
      return <ApplyForMortgageRiskProfile panel={activePanel} />;
    }

    if (activePanel.key === "SubmitRequest") {
      return <ApplyForMortgageSubmitRequest panel={activePanel} />;
    }

    if (activePanel.type === "List" && activePanel.detail) {
      return this.renderListDetail(activePanel.detail);
    }

    if (activePanel.type === "List") {
      return this.renderList(activePanel);
    }

    if (activePanel.type === "GroupingPanel") {
      return activePanel.panelLinks.all.map(link => (
        <PanelRenderer key={link.key} href={link.href} isRoot={false} />
      ));
    }

    return <div>Unknown what to render</div>;
  }

  render() {
    if (this.props.panel) {
      return (
        <div className="form-panel">
          {this.props.isRoot && <h3>{this.props.panel.label}</h3>}
          {this.renderPanel(this.props.panel)}
          {this.props.isRoot && (
            <FormButtons key="form-buttons" panel={this.props.panel} />
          )}
        </div>
      );
    }

    return null;
  }
}

export default FormPanel;
