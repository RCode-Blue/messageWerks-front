import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import AuthButton from "../Main/AuthButton";

const Landing = () => {
  // console.log("-----");
  // const context = useContext(UserContext);
  // console.log(context.user);

  // console.log("environment: ", process.env.ENVIRONMENT);
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
          <AuthButton />
        </section>
      </div>
    </main>
  );
};
export default Landing;
