import React, { useState } from "react";

export const UserContext = React.createContext({
  user: null,
  setUser: () => {},
});

const userInitalValues = {
  role: null,
  token: null,
  expiresIn: null,
  uuid: null,
  isLoggedIn: false,
  isAdmin: false,
};

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(userInitalValues);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
