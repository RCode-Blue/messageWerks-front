import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  let navigate = useNavigate();
  const handleLogoutClick = () => {
    // localStorage.clear();
    // navigate("/");
  };

  return (
    <div className="page-content__bottom styled-link">
      <Link to="/" className="styled-link" onClick={() => localStorage.clear()}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </Link>
    </div>
  );
};

export default Footer;
