// @flow
import React from "react";

import "./MortgageAdviceResult.scss";

type MortgageAdviceResultProps = {
  children: any
};

const MortgageAdviceResult = ({ children }: MortgageAdviceResultProps) => (
  <div className="col-4 mortgage-advice-result">
    <div className="arrow" />
    <div className="popout">{children}</div>
  </div>
);

export default MortgageAdviceResult;
