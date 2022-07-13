import React from "react";

const checkLocalToken = () => {
  if (
    !localStorage.getItem("token") ||
    localStorage.getItem("token") === "undefined"
  ) {
    return false;
  } else {
    return localStorage.getItem("token");
  }
};

export { checkLocalToken };
