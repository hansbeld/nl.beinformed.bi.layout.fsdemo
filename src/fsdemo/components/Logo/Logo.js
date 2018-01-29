// @flow
import React from "react";
import { Link } from "react-router-dom";

import logo from "./logo.png";

import "./Logo.scss";

const Logo = () => (
  <Link to="/">
    <img src={logo} alt="Be Informed Banking" />
  </Link>
);

export default Logo;
