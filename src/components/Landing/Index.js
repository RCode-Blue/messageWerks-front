import React from "react";
import { Link } from "react-router-dom";

import AuthButton from "../Main/AuthButton";

const Landing = () => {
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
        <section className="page-content__authsection styled-link">
          <AuthButton btnClassNamePrefix="page-content" />
        </section>
      </div>
    </main>
  );
};
export default Landing;
