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

import DetailPanelFooter from "beinformed/components/DetailPanel/DetailPanelFooter";

import "./DetailPanel.scss";

import type DetailModel from "beinformed/models/detail/DetailModel";

export type DetailPanelProps = {
  className?: string,
  isTab?: boolean,
  detail: DetailModel
};

/**
 * Render detail of a list link item
 */
const DetailPanel = ({ className, detail, isTab }: DetailPanelProps) =>
  detail ? (
    <div
      className={classNames("detailpanel", className, {
        "tab-pane": isTab
      })}
      data-id={detail.id}
    >
      <Panel className="detail-main">
        <PanelBody>
          <PanelTitle>
            <AttributeValue attribute={detail.titleAttribute} />
          </PanelTitle>

          <AttributeList attributes={detail.attributeCollection.all} />
        </PanelBody>
        {detail.actionCollection.length > 0 && (
          <DetailPanelFooter detail={detail} />
        )}
      </Panel>

      <Route path={detail.actionCollection.routePath} component={Form} />
    </div>
  ) : null;

export default DetailPanel;
