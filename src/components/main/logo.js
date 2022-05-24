"use strict";
import React from "react";
import { Link } from "react-router-dom";

import logo_default from "../../assets/images/rocket_beige.png";
import logo_admin from "../../assets/images/rocket_gold.png";

const Logo = () => {
  const logo = new Image();
  logo.src = logo_default;
  // logo.src = logo_admin;

  return (
    <div className="logo">
      <div className="logo__text">
        <Link to="/" className="styled-link logo-hover">
          messageWerks
        </Link>
      </div>
      <div className="logo__img">
        <Link to="/" className="styled-link">
          <img src={logo.src} alt="messageWerks Logo" />
        </Link>
      </div>
    </div>
  );
};

export default Logo;
