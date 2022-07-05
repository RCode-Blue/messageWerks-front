import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const AuthButton = () => {
  const userContext = useContext(UserContext);
  let navigate = useNavigate();

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
    let navigate = useNavigate();
    navigate()("/login");
  };

  const renderLogoutButton = () => {
    return (
      <button
        className="page-content__auth-button styled-link"
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
        className="page-content__auth-button styled-link"
        type="button"
        onClick={handleLoginClick}
      >
        <FontAwesomeIcon icon={faArrowRightToBracket} />
      </button>
    );
  };

  return (
    <div className="page-content__bottom">
      {userContext.user.isLoggedIn ? (
        <div>{renderLogoutButton()}</div>
      ) : (
        <div>{renderLoginButton()}</div>
      )}
    </div>
  );
};

export default AuthButton;
