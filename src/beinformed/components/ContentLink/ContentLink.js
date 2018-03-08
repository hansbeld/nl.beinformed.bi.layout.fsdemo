// @flow
import * as React from "react";
import classNames from "classnames";

import PlusBoxOutlineIcon from "mdi-react/PlusBoxOutlineIcon";
import MinusBoxOutlineIcon from "mdi-react/MinusBoxOutlineIcon";

import { BASE } from "beinformed/constants/Constants";
import Link from "beinformed/components/Link/Link";

import { Href } from "beinformed/models";

import "./ContentLink.scss";

import type { ContentLinkModel } from "beinformed/models";

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

    const children =
      this.props.children && isVisible ? this.props.children : null;

    const ToggleIcon = isVisible ? MinusBoxOutlineIcon : PlusBoxOutlineIcon;

    return (
      <li className={linkClass}>
        {this.props.children && (
          <ToggleIcon
            className="content-toc-toggle"
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
