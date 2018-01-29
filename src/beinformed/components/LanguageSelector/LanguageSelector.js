// @flow
import React from "react";

import Dropdown from "beinformed/components/Dropdown/Dropdown";
import DropdownToggle from "beinformed/components/Dropdown/DropdownToggle";
import DropdownItem from "beinformed/components/Dropdown/DropdownItem";
import DropdownChildren from "beinformed/components/Dropdown/DropdownChildren";

import Icon from "beinformed/components/Icon/Icon";

import Href from "beinformed/models/href/Href";

import "./LanguageSelector.scss";

import type Locales from "beinformed/i18n/Locales";

/**
 * Renders dropdown language selector
 */
const LanguageSelector = ({
  activeLocale,
  locales,
  onChange
}: {
  activeLocale: string,
  locales: Locales,
  onChange: Function
}) => (
  <div className="languageselector" data-language={activeLocale}>
    <Dropdown align="right">
      <DropdownToggle>
        <Icon name="globe" textAfter />
        <span className="link-text locale">{activeLocale}</span>
      </DropdownToggle>
      <DropdownChildren>
        {locales.all.map(locale => (
          <DropdownItem
            key={locale.code}
            id={`language-${locale.code}`}
            href={new Href("/")}
            onClick={() => onChange(locale.code)}
          >
            <Icon
              name={
                locale.code === activeLocale ? "check-circle-o" : "circle-o"
              }
              textAfter
            />
            <span className="link-text">{locale.nativeName}</span>
          </DropdownItem>
        ))}
      </DropdownChildren>
    </Dropdown>
  </div>
);

export default LanguageSelector;
