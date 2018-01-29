// @flow
import React from "react";
import Helmet from "react-helmet";

import favicon from "beinformed/components/HTMLHead/favicon/favicon.ico";
import favicon192 from "beinformed/components/HTMLHead/favicon/favicon-192.png";
import favicon160 from "beinformed/components/HTMLHead/favicon/favicon-160.png";
import favicon96 from "beinformed/components/HTMLHead/favicon/favicon-96.png";
import favicon64 from "beinformed/components/HTMLHead/favicon/favicon-64.png";
import favicon32 from "beinformed/components/HTMLHead/favicon/favicon-32.png";
import favicon16 from "beinformed/components/HTMLHead/favicon/favicon-16.png";
import favicon57 from "beinformed/components/HTMLHead/favicon/favicon-57.png";
import favicon114 from "beinformed/components/HTMLHead/favicon/favicon-114.png";
import favicon72 from "beinformed/components/HTMLHead/favicon/favicon-72.png";
import favicon144 from "beinformed/components/HTMLHead/favicon/favicon-144.png";
import favicon60 from "beinformed/components/HTMLHead/favicon/favicon-60.png";
import favicon120 from "beinformed/components/HTMLHead/favicon/favicon-120.png";
import favicon76 from "beinformed/components/HTMLHead/favicon/favicon-76.png";
import favicon152 from "beinformed/components/HTMLHead/favicon/favicon-152.png";
import favicon180 from "beinformed/components/HTMLHead/favicon/favicon-180.png";
import browserconfig from "beinformed/components/HTMLHead/favicon/browserconfig.xml";

import "./bootstrap.scss";

/**
 * Render HTML Head information using React Helmet
 */
const HTMLHead = ({ title, locale }: { title: string, locale: string }) => (
  <Helmet defaultTitle={title} titleTemplate={`${title} - %s`}>
    <html lang={locale} />
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-TileImage" content={favicon144} />
    <meta name="msapplication-config" content={browserconfig} />

    <link rel="shortcut icon" href={favicon} />

    <link rel="icon" sizes="16x16 32x32 64x64" href={favicon} />
    <link rel="icon" sizes="196x196" href={favicon192} />
    <link rel="icon" sizes="160x160" href={favicon160} />
    <link rel="icon" sizes="96x96" href={favicon96} />
    <link rel="icon" sizes="64x64" href={favicon64} />
    <link rel="icon" sizes="32x32" href={favicon32} />
    <link rel="icon" sizes="16x16" href={favicon16} />

    <link rel="apple-touch-icon" href={favicon57} />
    <link rel="apple-touch-icon" sizes="114x114" href={favicon114} />
    <link rel="apple-touch-icon" sizes="72x72" href={favicon72} />
    <link rel="apple-touch-icon" sizes="144x144" href={favicon144} />
    <link rel="apple-touch-icon" sizes="60x60" href={favicon60} />
    <link rel="apple-touch-icon" sizes="120x120" href={favicon120} />
    <link rel="apple-touch-icon" sizes="76x76" href={favicon76} />
    <link rel="apple-touch-icon" sizes="152x152" href={favicon152} />
    <link rel="apple-touch-icon" sizes="180x180" href={favicon180} />
  </Helmet>
);

export default HTMLHead;
