// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import { connect } from "react-redux";

import {
  startProgress,
  finishProgress
} from "beinformed/containers/ProgressIndicator/actions";
import { handleError } from "beinformed/containers/Error/actions";

import ModularUI from "beinformed/utils/modularui/ModularUIRequest";
import Href from "beinformed/models/href/Href";

import NotImplementedLink from "fsdemo/components/Link/NotImplementedLink";

// import type { Connector } from "react-redux";

import "./QuickNav.scss";

const QuickNavBox = ({
  className,
  title,
  links
}: {
  className: string,
  title: string,
  links: Array<{ href?: string, label: string }>
}) => (
  <div className="col-12 col-md mb-1 quick-nav-wrapper">
    <div className={classNames("quick-nav-box", className)}>
      <div className="content">
        <h4>{title}</h4>
        <ul className="list-unstyled">
          {links.map((link, i) => (
            <li key={i}>
              <NotImplementedLink
                messageId={link.label}
                defaultMessage={link.label}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const rootConcept =
  "/concepts/Mortgage%20-%20Overall%20advice/Business%20design/Model%20catalog/Be%20Informed%20banking.bixml/IWantTo";

type DynamicQuickNavState = {
  isFetching: boolean,
  rootConcept: any,
  instruments: []
};

type DynamicQuickNavProps = {
  locale: string
};

class DynamicQuickNav extends PureComponent<
  DynamicQuickNavProps,
  DynamicQuickNavState
> {
  _isMounted: boolean;

  constructor(props: DynamicQuickNavProps) {
    super(props);

    this.state = {
      isFetching: false,
      rootConcept: null,
      instruments: []
    };
  }

  /**
   * Start retreiving concepts
   */
  componentDidMount() {
    this._isMounted = true;
    this.retrieveConcepts(this.props.locale);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.retrieveConcepts(nextProps.locale);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  retrieveConcepts(locale) {
    const rootConceptHref = new Href(rootConcept);

    if (!this.state.isFetching) {
      this.setState({
        isFetching: true
      });

      const request = new ModularUI(rootConceptHref);
      request.locale = locale;

      startProgress();
      request
        .fetchFromCache()
        .then(rootConceptModel => {
          if (this._isMounted) {
            this.setState({
              rootConcept: rootConceptModel
            });

            const childRequests = rootConceptModel.relationsCollection.all.map(
              relation => {
                const childReq = new ModularUI(relation.concept.selfhref);
                childReq.locale = locale;
                return childReq.fetchFromCache();
              }
            );
            return Promise.all(childRequests);
          }

          return Promise.all([]);
        })
        .then(mainConcepts => {
          if (this._isMounted) {
            this.setState({
              isFetching: false,
              instruments: mainConcepts
            });
          }

          return finishProgress();
        })
        .catch(err => handleError(err));
    }
  }

  renderQuickNavBoxes() {
    return (
      this.state.rootConcept && (
        <div className="row">
          {this.state.instruments.map((instrument, i) => (
            <QuickNavBox
              key={i}
              className={`quick-nav-${instrument.key.toLowerCase()}`}
              title={instrument.label}
              links={instrument.relationsCollection.all
                .filter(relation => relation.direction === "outgoing")
                .map(relation => ({
                  href: "#",
                  label: relation.concept.label
                }))}
            />
          ))}
        </div>
      )
    );
  }

  render() {
    if (this.state.isFetching) {
      return null;
    }

    if (this.state.rootConcept === null) {
      return null;
    }

    return (
      <div className="quick-nav">
        <h3>{this.state.rootConcept.label}</h3>
        {this.renderQuickNavBoxes()}
      </div>
    );
  }
}

/**
 * Map state to props
 */
const mapStateToProps = state => ({
  locale: state.i18n.locale
});

export default connect(mapStateToProps, {})(DynamicQuickNav);
