// @flow
import React from "react";

import { default as beinformedClient } from "beinformed/client/client";

import Application from "fsdemo/containers/Application/Application";

beinformedClient({ ApplicationComponent: <Application /> });
