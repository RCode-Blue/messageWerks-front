import React, { useContext } from "react";

import UserContext from "../../contexts/UserContext";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h2>Main Profile Page</h2>
      <div>isLoggedIn: {user.isLoggedIn.toString()}</div>
      <div>isAdmin: {user.isAdmin.toString()}</div>
    </div>
  );
};

export default Profile;
