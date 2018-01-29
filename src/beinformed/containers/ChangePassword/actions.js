// @flow
import ApplicationModel from "beinformed/models/application/ApplicationModel";

import { loadModel } from "beinformed/containers/ModularUI/actions";
import { fetchForm } from "beinformed/containers/Form/actions";

import type { Location } from "react-router-dom";

export const loadChangePassword = (
  application: ApplicationModel,
  redirect?: Location
) => {
  if (
    !application ||
    !application.userServices ||
    !application.userServices.changePasswordLink
  ) {
    return loadModel("/", ApplicationModel, model =>
      loadChangePassword(model, redirect)
    );
  }

  const userServices = application.userServices;

  if (userServices) {
    const changePasswordLink = userServices.links.getLinkByKey(
      "ChangePassword"
    );

    if (changePasswordLink) {
      return fetchForm(changePasswordLink.href, redirect);
    }

    throw new Error("No change password service available.");
  }

  throw new Error("No Login panel configured.");
};
