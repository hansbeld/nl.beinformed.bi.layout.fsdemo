// @flow
import * as React from "react";
import classNames from "classnames";

import { BASE } from "beinformed/constants/Constants";
import Link from "beinformed/components/Link/Link";

import Href from "beinformed/models/href/Href";

import "./ContentLink.scss";

import type ContentLinkModel from "beinformed/models/content/ContentLinkModel";

type ContentLinkProps = {
  children?: any,
  className?: string,
  link: ContentLinkModel,
  isActive?: boolean
};

type ContentLinkState = {
  visible: boolean
};

/**
 * Renders a link to content
 */
class ContentLink extends React.Component<ContentLinkProps, ContentLinkState> {
  constructor(props: ContentLinkProps) {
    super(props);

    this.state = {
      visible: false
    };
  }

  render() {
    const isVisible = this.state.visible || this.props.isActive;
    const isHidden = !isVisible;

    const linkClass = classNames(
      "content-nav-item nav-item",
      this.props.className
    );
    const toggleClass = classNames("content-toc-toggle fa", {
      "fa-plus-square-o": isHidden,
      "fa-minus-square-o": isVisible
    });

    const children =
      this.props.children && isVisible ? this.props.children : null;

    return (
      <li className={linkClass}>
        {this.props.children && (
          <span
            className={toggleClass}
            tabIndex="0"
            role="button"
            onClick={() => {
              this.setState({
                visible: isHidden
              });
            }}
            onKeyDown={() => {
              this.setState({
                visible: isHidden
              });
            }}
          />
        )}
        <Link
          className="content-link"
          dataId={this.props.link.key || this.props.link.label}
          href={
            new Href(`/modelcatalog${this.props.link.encodedHref.toString()}`)
          }
          isActive={this.props.isActive}
        >
          {this.props.link.contentType &&
            this.props.link.contentType.icon && (
              <img
                className="content-icon"
                src={`${BASE}${this.props.link.contentType.icon}`}
                alt={`Icon of ${this.props.link.contentType.label}`}
              />
            )}
          {(this.props.link.sourceLabel
            ? `${this.props.link.sourceLabel}: `
            : "") + this.props.link.label}
        </Link>
        {children}
      </li>
    );
  }
}

export default ContentLink;
