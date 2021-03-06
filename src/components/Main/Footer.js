import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../../contexts/UserContext";

const Footer = () => {
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

  return (
    <div className="page-content__authsection">
      <button
        className="page-content__auth-button styled-link"
        type="button"
        onClick={handleLogoutClick}
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </button>
    </div>
  );
};

export default Footer;
