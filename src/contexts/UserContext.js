import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import appSettings from "../config/appSettings.json";

export const UserContext = React.createContext({
  user: null,
  setUser: () => {},
});

const decodeToken = (token) => {
  const { role, uuid, expiresIn } = jwt_decode(token);
  return {
    role,
    uuid,
    expiresIn,
    token,
    isAdmin: role >= appSettings.roles.adminThreshold,
    isLoggedIn: true,
  };
};

const userInitialValues = {
  role: null,
  token: null,
  expiresIn: null,
  isAdmin: false,
  isLoggedIn: false,
};

const getInitialUserState = () => {
  if (
    !localStorage.getItem("token") ||
    localStorage.getItem("token") === "undefined"
  ) {
    return userInitialValues;
  }
  return decodeToken(localStorage.getItem("token"));
};

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(getInitialUserState);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
