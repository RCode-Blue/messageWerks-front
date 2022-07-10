import React from "react";
import UsersHeader from "./UsersHeader";
import BusinessesHeader from "./BusinessesHeader";

const AdminProfile = () => {
  return (
    <div>
      <div>Admin Profile</div>
      <div>
        <UsersHeader />
      </div>
      <div>
        <BusinessesHeader />
      </div>
    </div>
  );
};

export default AdminProfile;
