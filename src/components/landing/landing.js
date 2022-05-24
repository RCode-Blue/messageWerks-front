"use strict";
import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Landing = () => {
  return (
    <div className="landing-wrapper">
      <div className="landing-content landing-content__wrap">
        <div className="landing-content__main">
          <Link to="/login" className="styled-link styled-hover">
            Login
          </Link>
        </div>
        <div className="landing-content__general">
          <div className="styled-link styled-hover">Demo</div>
          <div className="styled-link styled-hover">Signup</div>
        </div>
        <div className="landing-content__bottom styled-link">
          <Link to="/login" className="styled-link">
            <FontAwesomeIcon
              icon={faArrowRightToBracket}
              className="styled-hover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Landing;
