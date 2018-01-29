// @flow
import React from "react";
import classNames from "classnames";

import "./ProgressIndicator.scss";

export type ProgressIndicatorProps = {
  count: number,
  timestamp: number
};

/**
 * Progress indicator
 */
const ProgressIndicator = ({
  timestamp = 0,
  count = 0
}: ProgressIndicatorProps) => (
  <div
    id="progress-indicator"
    className={classNames("progress-indicator", {
      inprogress: count !== 0,
      finished: count === 0
    })}
    data-timestamp={timestamp}
    data-count={count}
  />
);

export default ProgressIndicator;
