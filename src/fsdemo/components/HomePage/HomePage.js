// @flow
import React from "react";

import "./HomePage.scss";

import Banner from "fsdemo/components/HomePage/Banner";
import QuickNav from "fsdemo/components/HomePage/QuickNav";
import BankingChannels from "fsdemo/components/HomePage/BankingChannels";

/**
 * Render a home page
 */
const HomePage = () => (
  <div className="homepage">
    <Banner />

    <QuickNav />

    <BankingChannels />
  </div>
);

export default HomePage;
