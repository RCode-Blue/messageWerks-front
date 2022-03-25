import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import logo_default from "../../assets/images/rocket_beige.png";
import logo_admin from "../../assets/images/startup_red.png";

const Landing = () => {
  const logo = new Image();
  logo.src = logo_default;
  // logo.src = logo_admin;

  return (
    <div className="landing-wrapper">
      <div className="logo">
        <div className="logo__text">messageWerks</div>
        <div className="logo__img">
          <img src={logo.src} alt="messageWerks Logo" />
        </div>
      </div>
      <div className="landing-content landing-content__wrap">
        <div className="landing-content__main styled-links ">Login</div>
        <div className="landing-content__general">
          <div className="styled-links ">Demo</div>
          <div className="styled-links ">Signup</div>
        </div>
        <div className="landing-content__bottom styled-links">
          <FontAwesomeIcon icon={faArrowRightToBracket} />
        </div>
      </div>
    </div>
  );
};
export default Landing;
