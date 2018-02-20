// @flow
import React from "react";

import ProgressIndicator from "beinformed/containers/ProgressIndicator/ProgressIndicator";

import HTMLHead from "beinformed/components/HTMLHead/HTMLHead";

import NoScript from "beinformed/components/NoScript/NoScript";

export type MainProps = {
  title: string,
  locale: string,
  children: any
};

const Main = ({ title, locale, children }: MainProps) => (
  <div className="application">
    <HTMLHead title={title} locale={locale} />

    {children}

    <ProgressIndicator />
    <NoScript />
  </div>
);

export default Main;
