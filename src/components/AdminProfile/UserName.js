import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import UserDetails from "./UserDetails";

const UserName = (props) => {
  const { props: user } = props;
  const [userData, setUserData] = useState(user);
  const [showUserDetails, setShowUserDetails] = useState(false);

  /*
  const renderUser = () => {
    if (!showUserDetails) {
      return (
        <div>
          {user.first_name} {user.last_name}
        </div>
      );
    }

    return <UserDetails props={userData} />;
  };
  */

  return (
    <section className="section-detail">
      <>
        {showUserDetails ? (
          <UserDetails props={userData} />
        ) : (
          `${user.first_name} ${user.last_name}`
        )}
      </>

      <div
        className="section-detail__icon"
        onClick={() => setShowUserDetails(!showUserDetails)}
      >
        {showUserDetails ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </div>
    </section>
  );
};

export default UserName;
