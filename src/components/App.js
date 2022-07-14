import React, { StrictMode, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserProvider from "../contexts/UserContext";

import Logo from "./Main/Logo";
import Landing from "./Landing/Index";
import Login from "./Landing/Login";
import Profile from "./Profile/Index";

import "../styles/styles.scss";

// App
function App() {
  console.log("NODE_ENV: ", process.env.NODE_ENV);

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
