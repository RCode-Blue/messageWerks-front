import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import Footer from "../Main/Footer";
import { UserContext } from "../../contexts/UserContext";
import { getBackendUrl } from "../../helpers/routeHelpers";
import { checkIsAdmin } from "../../helpers/aclHelpers";
import Business from "../Business/Index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
  const [businesses, setBusinesses] = useState([]);
  // const { user, setUser } = useContext(UserContext);
  const userContext = useContext(UserContext);

  const fetchUserProfile = (token) => {
    const backendUrl = getBackendUrl("/users/uuid");

    let options = {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: token,
      },
    };
    try {
      fetch(backendUrl, options)
        .then((result) => result.json())
        .then((result) => {
          if (result.status != 200) {
            userContext.setUser({ isLoggedIn: false });
            return;
          }
          let userProfile = result.data;

          userContext.setUser({
            isLoggedIn: true,
            firstName: userProfile.first_name,
            lastName: userProfile.last_name,
            role: userProfile.role,
            isAdmin: checkIsAdmin(userProfile.role),
          });
          setBusinesses(userProfile.businesses);
        });
    } catch (err) {
      userContext.setUser({ isLoggedIn: false });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUserProfile(localStorage.getItem("token"));
    } else {
      userContext.setUser({ isLoggedIn: false });
    }
  }, []);

  const renderBusinesses = () => {
    if (businesses.length > 0) {
      return (
        <Fragment>
          {businesses.map((business) => {
            return (
              <div className="business-wrapper" key={business.uuid}>
                <Business props={business} />
              </div>
            );
          })}
        </Fragment>
      );
    }
    return <div></div>;
  };

  // console.log(userContext);

  return (
    <Fragment>
      <section className="profile-wrapper">
        <ProfileHeader props={userContext.user} />
        {renderBusinesses()}
      </section>
      <Footer />
    </Fragment>
  );
};

export default Profile;
