// @flow
import React from "react";

import ListNoResults from "beinformed/components/List/ListNoResults";

import type { ListModel } from "beinformed/models";

type ResultsProps = {
  className?: string,
  list: ListModel,
  View: any
};

const ListResults = ({ View, list, className }: ResultsProps) => {
  if (list.hasResults()) {
    return <View className={className} list={list} />;
  }

  return <ListNoResults isSearch={list.resourcetype === "CaseSearch"} />;
};

export default ListResults;
