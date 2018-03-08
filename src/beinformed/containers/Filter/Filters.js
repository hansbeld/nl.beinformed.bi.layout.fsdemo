// @flow
import { connect } from "react-redux";

import type { ListModel } from "beinformed/models";

import {
  changeFilterItem,
  resetFilter,
  submitFilter
} from "beinformed/containers/Filter/actions";
import Filters from "beinformed/components/Filters/Filters";

type ownPropsProps = {
  className?: string,
  list: ListModel
};

const mapStateToProps = (state: {}, ownProps: ownPropsProps) => ({
  ...ownProps
});

export const connector = connect(mapStateToProps, {
  onChange: changeFilterItem,
  onReset: resetFilter,
  onSubmit: submitFilter
});

export default connector(Filters);
