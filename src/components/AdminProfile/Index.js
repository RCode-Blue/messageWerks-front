import React, { useState } from "react";
import UsersHeader from "./UsersHeader";
import BusinessesHeader from "./BusinessesHeader";

const AdminProfile = () => {
  // const [showSection, setShowSection]=useState({user:false})
  return (
    <div>
      <div>- Admin Profile -</div>
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
