"use strict";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";

import logo_default from "../../assets/images/rocket_beige.png";
import logo_admin from "../../assets/images/rocket_peach.png";

const Logo = () => {
  // const { user, setUser } = useContext(UserContext);
  const context = useContext(UserContext);

  const logo = new Image();
  // logo.src = user.isAdmin ? logo_admin : logo_default;
  logo.src = logo_default;

  return (
    <header>
      <nav className="logo">
        <div
          className={`logo__text ${
            context.user.isLoggedIn
              ? "logo__text__isloggedin"
              : "logo__text__default"
          }`}
        >
          <Link
            to="/"
            className={`logo-hover ${
              context.user.isAdmin ? "styled-link-admin" : "styled-link"
            }`}
          >
            messageWerks
          </Link>
        </div>
        <div
          className={`logo__img ${
            context.user.isLoggedIn
              ? "logo__img__isloggedin"
              : "logo__img__default"
          }`}
        >
          <Link to="/" className="styled-link">
            <img src={logo.src} alt="messageWerks Logo" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Logo;
