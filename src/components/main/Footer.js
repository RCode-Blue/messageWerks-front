import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

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
    <div className="page-content__bottom styled-link">
      <button type="button" className="styled-link" onClick={handleLogoutClick}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </button>
    </div>
  );
};

export default Footer;
