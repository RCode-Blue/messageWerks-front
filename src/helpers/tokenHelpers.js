import React from "react";

const checkLocalToken = () => {
  if (
    !localStorage.getItem("token") ||
    localStorage.getItem("token") === "undefined"
  ) {
    // userContext.setUser({ isLoggedIn: false });
    return false;
  } else {
    return localStorage.getItem("token");
  }
};

export { checkLocalToken };
