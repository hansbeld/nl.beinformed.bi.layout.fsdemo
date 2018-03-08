// @flow
import React from "react";

import Main from "beinformed/components/Main/Main";

import Routes from "beinformed/components/Routes/Routes";
import MainRoutes from "beinformed/components/Routes/MainRoutes";
import ModalRoutes from "beinformed/components/Routes/ModalRoutes";

import Notification from "beinformed/containers/Notification/Notification";
import ApplicationHeader from "beinformed/components/ApplicationHeader/ApplicationHeader";

import type { ApplicationModel } from "beinformed/models";
export type ApplicationProps = {
  application: ApplicationModel,
  locale: string,
  children: any
};

const DefaultRoutes = () => (
  <Routes>
    <MainRoutes />
    <ModalRoutes />
  </Routes>
);

const Application = ({
  application,
  locale,
  children = <DefaultRoutes />
}: ApplicationProps) =>
  application ? (
    <Main title={application.label} locale={locale}>
      <Notification />
      <ApplicationHeader application={application} />
      {children}
    </Main>
  ) : null;

export default Application;
