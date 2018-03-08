// @flow
import React, { Component } from "react";

import Link from "beinformed/components/Link/Link";

import { Href } from "beinformed/models";

type CharIndexType = {
  active: Array<string>,
  enabled: Array<string>,
  href: Href
};

/**
 * Character index
 */
class CharIndex extends Component<CharIndexType> {
  renderChar(char: string, isEnabled: boolean) {
    const { active, href } = this.props;

    const charHref = new Href(href).addParameter("index", char);

    if (isEnabled) {
      return (
        <Link
          key={char}
          className="btn btn-light"
          dataId={char}
          href={charHref}
          isActive={active.includes(char)}
        >
          {char}
        </Link>
      );
    }

    return (
      <span key={char} className="btn btn-light disabled" data-id={char}>
        {char}
      </span>
    );
  }

  render() {
    const { enabled } = this.props;

    const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0_".split("");
    const charsNotInDefault = enabled
      ? enabled.filter(enabledChar => !allChars.includes(enabledChar))
      : [];

    return (
      <div className="character-index btn-toolbar mb-1">
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Character index"
        >
          {allChars.map(char => this.renderChar(char, enabled.includes(char)))}
          {charsNotInDefault.map(char => this.renderChar(char, true))}
        </div>
      </div>
    );
  }
}

export default CharIndex;
