import React from "react";
import ShareVariantIcon from "mdi-react/ShareVariantIcon";

import LinkModel from "beinformed/models/links/LinkModel";

import Navigation from "beinformed/components/Navigation/Navigation";
import NavigationItem from "beinformed/components/Navigation/NavigationItem";

import { withMessage } from "beinformed/containers/I18n/Message";

import LanguageSelector from "beinformed/containers/LanguageSelector/LanguageSelector";
import UserMenu from "beinformed/components/UserMenu/UserMenu";

import "./ApplicationHeader.scss";
import NavigationBar from "beinformed/components/Navigation/NavigationBar";

const ApplicationHeader = ({ application, message }) => {
  const modelCatalogLink = LinkModel.create(
    "modelcatalog",
    "/modelcatalog",
    message("ModelCatalog.Menu", "Modelcatalog")
  );
  modelCatalogLink.icon = <ShareVariantIcon className="textAfter" />;

  return (
    <header className="application-header">
      <NavigationBar id="ApplicationHeader">
        <Navigation items={application.tabs} className="application-menu" />

        <ul className="nav ml-auto generic-menu">
          <NavigationItem
            link={modelCatalogLink}
            className="modelcatalog-link"
          />

          <li className="nav-item dropdown">
            <UserMenu userServices={application.userServices} />
          </li>

          <li className="nav-item dropdown">
            <LanguageSelector />
          </li>
        </ul>
      </NavigationBar>
    </header>
  );
};

export default withMessage(ApplicationHeader);
