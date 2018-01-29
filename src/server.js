// @flow
import React from "react";
import { default as beinformedServer } from "beinformed/server/server";
import Application from "fsdemo/containers/Application/Application";
import { availableLocales } from "fsdemo/i18n/Locales";

export const server = (request: HttpServletRequestJava) =>
  beinformedServer({
    request,
    ApplicationComponent: <Application />,
    locales: availableLocales
  });
