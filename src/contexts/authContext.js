import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  isAdmin: false,
  setIsLoggedIn: () => {},
  setIsAdmin: () => {},
});

/*
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState([]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
*/

export default AuthContext;
