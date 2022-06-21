import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

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
          <Link to="/" className="styled-link">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
