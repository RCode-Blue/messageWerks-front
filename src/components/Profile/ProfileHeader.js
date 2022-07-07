import React from "react";
import AuthButton from "../Main/AuthButton";

const ProfileHeader = (props) => {
  const { firstName, lastName } = props.props;
  return (
    <header className="profile-header-wrapper">
      <div className="profile-header__name">
        {firstName} {lastName}
      </div>
      <div></div>
      <div className="profile-header__logout">
        <div>Logout</div>
        <div>
          <AuthButton btnClassNamePrefix="profile-header" />
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
