// @flow
import React from "react";
import classNames from "classnames";

import { Route } from "react-router-dom";

import Form from "beinformed/containers/Form/Form";

import AttributeList from "beinformed/components/AttributeList/AttributeList";
import AttributeValue from "beinformed/components/AttributeList/AttributeValue";

import Panel from "beinformed/components/Panel/Panel";
import PanelBody from "beinformed/components/Panel/PanelBody";
import PanelTitle from "beinformed/components/Panel/PanelTitle";

import PanelRenderer from "beinformed/containers/Panel/PanelRenderer";

import ListDetailInstrumentResult from "beinformed/components/ListDetail/ListDetailInstrumentResult";
import ListDetailFooter from "beinformed/components/ListDetail/ListDetailFooter";

import "./ListDetail.scss";

import type ListModel from "beinformed/models/list/ListModel";

export type ListDetailProps = {
  className?: string,
  list: ListModel,
  onHideDetail: (list: ListModel) => void
};

/**
 * Render detail of a list link item
 */
const ListDetail = ({ className, list }: ListDetailProps) => {
  const detail = list.detail;

  if (detail) {
    return (
      <div className={classNames("list-detail", className)} data-id={detail.id}>
        <Panel className="list-detail-main card">
          <PanelBody className="card-body">
            <PanelTitle>
              <AttributeValue attribute={detail.titleAttribute} />
            </PanelTitle>
            <AttributeList attributes={detail.attributeCollection.all} />

            {detail.hasResults && (
              <ListDetailInstrumentResult detail={detail} />
            )}
          </PanelBody>
          {(detail.actionCollection.length > 0 || detail.isCase()) && (
            <ListDetailFooter detail={detail} />
          )}
        </Panel>

        <div className="panels">
          {detail.panelLinks.all.map(panelLink => (
            <PanelRenderer key={panelLink.key} href={panelLink.href} />
          ))}
        </div>

        <Route path={detail.actionCollection.routePath} component={Form} />
      </div>
    );
  }
  return null;
};

export default ListDetail;
