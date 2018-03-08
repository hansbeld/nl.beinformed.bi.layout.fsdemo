// @flow
import React, { Component } from "react";

import AccountPanel from "fsdemo/components/Account/AccountPanel";
import ProductSuggestions from "fsdemo/components/ProductSuggestions/ProductSuggestions";

import type { CaseViewModel } from "beinformed/models";

type AccountProps = {
  caseview: CaseViewModel,
  onClick: Function
};

class Account extends Component<AccountProps> {
  render() {
    if (this.props.caseview) {
      return (
        <div className="account">
          <AccountPanel caseview={this.props.caseview} />
          <ProductSuggestions
            formUrl={`/accounts/account/${
              this.props.caseview.id
            }/advice/personal-advice`}
          />
        </div>
      );
    }

    return null;
  }
}
export default Account;
