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
import ListDetailEventData from "beinformed/components/ListDetail/ListDetailEventData";

import ListDetailFooter from "beinformed/components/ListDetail/ListDetailFooter";

import "./ListDetail.scss";

import type { ListItemModel, ListDetailModel } from "beinformed/models";

export type ListDetailProps = {
  className?: string,
  listitem: ListItemModel,
  detail: ListDetailModel
};

/**
 * Render detail of a list link item
 */
const ListDetail = ({ className, listitem, detail }: ListDetailProps) => {
  // const detail = list.detail;
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

            {detail.hasEventData && <ListDetailEventData detail={detail} />}
          </PanelBody>
          {(listitem.actionCollection.length > 0 || detail.isCase()) && (
            <ListDetailFooter listitem={listitem} detail={detail} />
          )}
        </Panel>

        {listitem.panelLinks.hasItems && (
          <div className="panels">
            {listitem.panelLinks.all.map(listitemLink => (
              <PanelRenderer key={listitemLink.key} href={listitemLink.href} />
            ))}
          </div>
        )}

        <Route path={listitem.actionCollection.routePath} component={Form} />
      </div>
    );
  }
  return null;
};

export default ListDetail;
