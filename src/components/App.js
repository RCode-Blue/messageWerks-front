import React, { StrictMode, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import * as dotenv from "dotenv";

import UserProvider from "../contexts/UserContext";

import Logo from "./Main/Logo";
import Landing from "./Landing/Index";
import Login from "./Landing/Login";
import Profile from "./Profile/Index";

import "../styles/styles.scss";

// App
function App() {
  // dotenv.config();
  consoile.log("ENVIRON: ", process.env.ENVIRON);

  return (
    <div className="App app-wrapper">
      <StrictMode>
        <UserProvider>
          <Logo />
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </UserProvider>
      </StrictMode>
    </div>
  );
}

export default App;
