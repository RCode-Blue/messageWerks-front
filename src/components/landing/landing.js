import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Landing = () => {
  // console.log("-----");
  // console.log("isLoggedIn: ", localStorage.getItem("isLoggedIn"));
  return (
    <main className="page-wrapper">
      <div className="page-content page-content__wrap">
        <section className="page-content__main">
          <Link to="/login" className="styled-link">
            Login
          </Link>
        </section>
        <section className="page-content__general">
          <div className="styled-link">Demo</div>
          <div className="styled-link">Signup</div>
        </section>
        <section className="page-content__bottom styled-link">
          <Link to="/login" className="styled-link">
            <FontAwesomeIcon icon={faArrowRightToBracket} />
          </Link>
        </section>
      </div>
    </main>
  );
};
export default Landing;
