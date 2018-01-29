// @flow
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import connectModularUIConfig from "beinformed/utils/modularui/connectModularUIConfig";
import connectModularUIRedux from "beinformed/utils/modularui/connectModularUIRedux";

import type { LoadModularUIConfigType } from "beinformed/utils/modularui/connectModularUIConfig";

const connectModularUI = (
  loadModularUIConfig: LoadModularUIConfigType,
  mapStateToProps: any,
  mapDispatchToProps: any
) =>
  compose(
    withRouter,
    connectModularUIRedux(mapStateToProps, mapDispatchToProps),
    connectModularUIConfig(loadModularUIConfig)
  );

export default connectModularUI;
