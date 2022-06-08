import React, { StrictMode } from "react";
// import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Logo from "./main/logo";
import Landing from "./landing/landing";
import Login from "./landing/login";

import "../styles/styles.scss";

function App() {
  return (
    <div className="App app-wrapper">
      <StrictMode>
        <Logo />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* </Router> */}
      </StrictMode>
    </div>
  );
}

export default App;
