import React, { useContext } from "react";
import { Link } from "react-router-dom";

import logo_default from "../../assets/images/rocket_beige.png";
import logo_admin from "../../assets/images/rocket_peach.png";

import { UserContext } from "../../contexts/UserContext";

const Logo = () => {
  const userContext = useContext(UserContext);

  const logo = new Image();
  logo.src = userContext.user.isAdmin ? logo_admin : logo_default;

  return (
    <header>
      <nav className="logo">
        <div
          className={`logo__text ${
            userContext.user.isLoggedIn
              ? "logo__text__isloggedin"
              : "logo__text__default"
          }`}
        >
          <Link
            to="/"
            className={`logo-hover ${
              userContext.user.isAdmin ? "styled-link-admin" : "styled-link"
            }`}
          >
            messageWerks
          </Link>
        </div>
        <div
          className={`logo__img ${
            userContext.user.isLoggedIn
              ? "logo__img__isloggedin"
              : "logo__img__default"
          }`}
        >
          <Link to="/" className="styled-link">
            <img
              src={userContext.user.isAdmin ? logo_admin : logo_default}
              alt={
                userContext.user.isAdmin
                  ? "messageWerks Admin logo"
                  : "messageWerks Default Logo"
              }
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Logo;
