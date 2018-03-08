// @flow
import React, { Component } from "react";

import { BASE, KEYCODES } from "beinformed/constants/Constants";
import { Href } from "beinformed/models";

import "./ContentBody.scss";

type ContentBodyProps = {
  body: string,
  label: string,
  number: string,
  renderSectionLabel?: boolean,
  sourceHref: Href,
  onContentClick?: (href: Href, tocOnly: boolean) => void
};

/**
 * Content body
 */
class ContentBody extends Component<ContentBodyProps> {
  /**
   * Handle click on body
   */
  handleClick = (e: SyntheticEvent<*>) => {
    const element = e.target;

    if (element instanceof HTMLAnchorElement) {
      if (
        element.href &&
        (location.hostname === element.hostname || element.hostname.length > -1)
      ) {
        e.preventDefault();

        const elementHref = new Href(element.href);

        if (
          this.props.sourceHref.equals(elementHref) &&
          elementHref.hash !== ""
        ) {
          const scrollTo = document.getElementById(elementHref.hash);
          if (scrollTo) {
            scrollTo.scrollIntoView();
          }
        } else if (elementHref.isContent && this.props.onContentClick) {
          return this.props.onContentClick(elementHref, true);
        }
      }
    }

    return true;
  };

  /**
   * Handle key down
   */
  handleKeyDown = (e: SyntheticKeyboardEvent<*>) => {
    if ([KEYCODES.SPACE, KEYCODES.ENTER].includes(e.keyCode)) {
      this.handleClick(e);
    }
  };

  removeEmptyLinks(body: string) {
    return body ? body.replace(/<a href="".*?>(.*?)<\/a>/gi, "$1") : "";
  }

  correctEmptyLinks(body: string) {
    return body.replace(
      /\s(src|href)="\/(resource|content|concept)/gi,
      ` $1="${BASE}/$2`
    );
  }

  addTableClass(body: string) {
    return body.replace(/<table>/gi, '<table class="table">');
  }

  renderNumberInTitle(body: string, label: string, number: string) {
    if (this.props.renderSectionLabel && label) {
      return `<h2>${number ? `${number} ` : ""}${label}</h2>${body}`;
    } else if (number) {
      /*
       * when body starts with html tag, then put number after first > of html tag,
       * so that <p>text</p> becomes <p>number. text</p> or <h2>title</h2> becomes <h2>number. title</h2>
       */
      return body.indexOf("<") === 0
        ? body.replace(">", `>${number} `)
        : `${number} ${body}`;
    }

    return body;
  }

  /**
   * Rewrite links inside body text
   */
  rewriteBody = (
    body: string,
    renderSectionLabel?: boolean,
    label: string,
    number: string
  ) => {
    let newBody = body;

    newBody = this.removeEmptyLinks(newBody);
    newBody = this.correctEmptyLinks(newBody);
    newBody = this.addTableClass(newBody);
    newBody = this.renderNumberInTitle(newBody, label, number);

    return newBody;
  };

  render() {
    const { body, number, label, renderSectionLabel } = this.props;

    return (
      <div
        className="content-body"
        dangerouslySetInnerHTML={{
          __html: this.rewriteBody(body, renderSectionLabel, label, number)
        }}
        role="article"
        tabIndex="-1"
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default ContentBody;
