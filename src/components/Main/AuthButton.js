import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../../contexts/UserContext";

const AuthButton = (props) => {
  const { btnClassNamePrefix: prefix } = props;

  let navigate = useNavigate();
  const userContext = useContext(UserContext);

  const handleLogoutClick = () => {
    localStorage.clear();
    userContext.setUser({
      ...userContext.user,
      isLoggedIn: false,
      isAdmin: false,
    });
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const renderLogoutButton = () => {
    return (
      <button
        className={`${prefix}__auth-button styled-link`}
        type="button"
        onClick={handleLogoutClick}
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </button>
    );
  };

  const renderLoginButton = () => {
    return (
      <button
        className={`${prefix}__auth-button styled-link`}
        type="button"
        onClick={handleLoginClick}
      >
        <FontAwesomeIcon icon={faArrowRightToBracket} />
      </button>
    );
  };

  return (
    <div className={`${prefix}__authsection`}>
      {userContext.user.isLoggedIn ? (
        <div>{renderLogoutButton()}</div>
      ) : (
        <div>{renderLoginButton()}</div>
      )}
    </div>
  );
};

export default AuthButton;
