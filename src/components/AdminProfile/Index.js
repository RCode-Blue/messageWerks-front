import React, { useContext, useEffect } from "react";

import { UserContext } from "../../contexts/UserContext";
import BusinessesHeader from "./BusinessesHeader";
import UsersHeader from "./UsersHeader";

import { checkLocalToken } from "../../helpers/tokenHelpers";

const AdminProfile = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!checkLocalToken()) {
      userContext.setUser({ isLoggedIn: false });
    }
  });
  return (
    <section className="admin-profile-wrapper">
      <UsersHeader />
      <BusinessesHeader />
    </section>
  );
};

export default AdminProfile;
