import React, { StrictMode, useContext, useState } from "react";
// import IsLoggedInContext  from "../contexts/authContext";
// import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthContext from "../contexts/authContext";

import Logo from "./main/logo";
import Landing from "./landing/landing";
import Login from "./landing/login";

import "../styles/styles.scss";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App app-wrapper">
      <StrictMode>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <Logo />
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthContext.Provider>
      </StrictMode>
    </div>
  );
}

export default App;
