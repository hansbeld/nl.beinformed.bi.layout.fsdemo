// @flow
import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import queryString from "query-string";
import Helmet from "react-helmet";

import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";

import ConceptBrowser from "beinformed/containers/ModelCatalogConcept/ConceptBrowser";
import ContentBrowser from "beinformed/containers/ModelCatalogContent/ContentBrowser";

import ConceptDetail from "beinformed/containers/ModelCatalogConcept/ConceptDetail";
import ContentDetail from "beinformed/containers/ModelCatalogContent/ContentDetail";

import Link from "beinformed/components/Link/Link";

import { Href } from "beinformed/models";
import type { ModelCatalogModel } from "beinformed/models";

import { Message } from "beinformed/i18n";

import DatetimeInput from "beinformed/components/FormInput/DatetimeInput";

import "./ModelCatalog.scss";

import type { Location, Match, RouterHistory } from "react-router-dom";

type ModelCatalogProps = {
  modelcatalog: ModelCatalogModel,
  history: RouterHistory,
  location: Location,
  match: Match
};
type ModelCatalogState = {
  entryDate: string,
  enteredEntryDate: string
};

class ModelCatalog extends Component<ModelCatalogProps, ModelCatalogState> {
  constructor(props: ModelCatalogProps) {
    super(props);

    const ISO_DATE_SIZE = 10;

    const parsedQueryString = queryString.parse(this.props.location.search);

    const entryDate =
      parsedQueryString && parsedQueryString[TIMEVERSION_FILTER_NAME]
        ? parsedQueryString[TIMEVERSION_FILTER_NAME]
        : new Date().toISOString().slice(0, ISO_DATE_SIZE);

    this.state = {
      entryDate,
      enteredEntryDate: entryDate
    };
  }

  handleEntryDateChange(date: string) {
    const EXACT_DATE_LENGTH = 10;
    if (date.length === EXACT_DATE_LENGTH && !isNaN(Date.parse(date))) {
      const { pathname, search } = this.props.location;
      const locationHref = new Href(`${pathname}${search}`);
      locationHref.addParameter(TIMEVERSION_FILTER_NAME, date);

      this.setState({
        entryDate: date,
        enteredEntryDate: date
      });

      this.props.history.push(locationHref.toString());
    }

    this.setState({
      enteredEntryDate: date
    });
  }

  render() {
    const { modelcatalog, match } = this.props;

    return modelcatalog ? (
      <div className="catalog modelcatalog container-fluid mt-4">
        <Helmet>
          <title>{modelcatalog.label}</title>
        </Helmet>
        <ul className="nav nav-tabs catalog-links">
          {modelcatalog.conceptIndexLink && (
            <li className="nav-item">
              <Link
                dataId="modelcatalogLink"
                href={
                  new Href(
                    `${
                      match.url
                    }${modelcatalog.conceptIndexLink.href.toString()}`
                  )
                }
                isNavLink
              >
                <Message
                  id="ConceptIndex.Header"
                  defaultMessage="Concept index"
                />
              </Link>
            </li>
          )}

          {modelcatalog.contentIndexLink && (
            <li className="nav-item">
              <Link
                dataId="contentbrowserLink"
                href={
                  new Href(
                    `${
                      match.url
                    }${modelcatalog.contentIndexLink.href.toString()}`
                  )
                }
                isNavLink
              >
                <Message
                  id="ContentIndex.Header"
                  defaultMessage="Content index"
                />
              </Link>
            </li>
          )}

          <li className="ml-auto">
            <DatetimeInput
              name={TIMEVERSION_FILTER_NAME}
              value={this.state.enteredEntryDate}
              onChange={date => this.handleEntryDateChange(date)}
            />
          </li>
        </ul>

        <div className="tab-content">
          <Switch>
            {match.isExact && <Redirect to="/modelcatalog/concepts" />}

            <Route
              path={`${match.url}/concepts`}
              exact
              render={routeProps => (
                <ConceptBrowser
                  href={new Href(`/concepts${routeProps.location.search}`)}
                  entryDate={this.state.entryDate}
                />
              )}
            />

            <Route
              path={`${match.url}/content`}
              exact
              render={routeProps => (
                <ContentBrowser
                  href={new Href(
                    `/content${routeProps.location.search}`
                  ).removeParameter(TIMEVERSION_FILTER_NAME)}
                  entryDate={this.state.entryDate}
                />
              )}
            />

            <Route
              path={`${match.url}/concepts/:concept+`}
              render={() => <ConceptDetail entryDate={this.state.entryDate} />}
            />

            <Route
              path={`${match.url}/content/:content`}
              render={() => <ContentDetail entryDate={this.state.entryDate} />}
            />
          </Switch>
        </div>
      </div>
    ) : null;
  }
}

export default ModelCatalog;
