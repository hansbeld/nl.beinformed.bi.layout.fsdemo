// @flow
import React from "react";
import { Link } from "react-router-dom";

import { Message } from "beinformed/containers/I18n/Message";

import "./Banner.scss";

import banner from "./banner.jpg";

import Icon from "beinformed/components/Icon/Icon";

/**
 * Render a home page banner
 */
const Banner = () => (
  <div className="homepage-banner">
    <img src={banner} alt="banner-background" />
    <div className="homepage-message">
      <p>
        <Message
          id="Homepage.banner.description"
          defaultMessage="Whether you&apos;re buying your first home, moving house, or looking for
        buy-to-let, we have the right mortgage for you."
        />
      </p>
      <Link
        to="/mortgage-calculators"
        data-id="mortgage-calculators"
        className="btn btn-primary"
      >
        <Icon name="calculator" textAfter />
        <Message
          id="Homepage.banner.calculators"
          defaultMessage="Mortgage calculators"
        />
      </Link>
      <a
        href="#not-implemented"
        className="btn link-mortgage-info not-implemented-link"
      >
        <Message id="Homepage.banner.info" defaultMessage="Mortgage info" />
      </a>
    </div>
  </div>
);

export default Banner;
