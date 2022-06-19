import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Landing = () => {
  return (
    <main className="landing-wrapper">
      <div className="landing-content landing-content__wrap">
        <div className="landing-content__main">
          <Link to="/login" className="styled-link">
            Login
          </Link>
        </div>
        <div className="landing-content__general">
          <div className="styled-link">Demo</div>
          <div className="styled-link">Signup</div>
        </div>
        <div className="landing-content__bottom styled-link">
          <Link to="/login" className="styled-link">
            <FontAwesomeIcon icon={faArrowRightToBracket} />
          </Link>
        </div>
      </div>
    </main>
  );
};
export default Landing;
