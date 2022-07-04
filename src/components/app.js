import React, { StrictMode, useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import UserContext from "../contexts/UserContext";
import UserProvider from "../contexts/UserContext";

import Logo from "./Main/Logo";
import Landing from "./Landing/Landing";
import Login from "./Landing/Login";
import Profile from "./Profile/Profile";

import "../styles/styles.scss";

function App() {
  // const [user, setUser] = useState(
  //   localStorage.getItem("isLoggedIn")
  //     ? { isLoggedIn: true, role: localStorage.getItem("role") }
  //     : { isLoggedIn: false, role: null }
  // );

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
