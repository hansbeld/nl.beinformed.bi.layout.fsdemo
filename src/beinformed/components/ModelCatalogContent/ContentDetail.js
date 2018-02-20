// @flow
import React from "react";
import Helmet from "react-helmet";
import { Switch, Redirect, Route } from "react-router-dom";

import ContentCategories from "beinformed/components/ContentDetail/ContentCategories";
import ContentTOC from "beinformed/components/ContentDetail/ContentTOC";
import ContentTOCHeader from "beinformed/components/ContentDetail/ContentTOCHeader";

import ContentDetailSection from "beinformed/containers/ModelCatalogContent/ContentDetailSection";

import type ContentTOCModel from "beinformed/models/content/ContentTOCModel";

type ContentDetailProps = {
  contentTOC: ContentTOCModel,
  entryDate: string
};

/**
 * Render Content details
 */
const ContentDetail = ({ contentTOC, entryDate }: ContentDetailProps) =>
  contentTOC ? (
    <div className="content-detail">
      <Helmet>
        <title>{contentTOC.label}</title>
      </Helmet>

      {contentTOC && <ContentTOCHeader contentTOC={contentTOC} />}

      <div className="row">
        {contentTOC &&
          contentTOC.items.length > 0 && (
            <div className="col-md-2">
              <ContentTOC contentTOC={contentTOC} />
            </div>
          )}

        {contentTOC &&
          contentTOC.categories.length > 0 && (
            <div className="col">
              <ContentCategories contentTOC={contentTOC} />
            </div>
          )}

        <Switch>
          <Route
            path={`/modelcatalog/content/:content/:section`}
            render={() => <ContentDetailSection entryDate={entryDate} />}
          />
          <Redirect
            to={`/modelcatalog${contentTOC.items[0].encodedHref.toString()}`}
          />
        </Switch>
      </div>
    </div>
  ) : null;

export default ContentDetail;
