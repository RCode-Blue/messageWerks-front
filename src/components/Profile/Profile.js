import React, { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

import { checkIsAdmin } from "../../helpers/aclHelpers";
import { getBackendUrl } from "../../helpers/routeHelpers";
import AdminProfile from "../AdminProfile";
import AuthButton from "../Main/AuthButton";
import Business from "../Business/Index";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
  const [businesses, setBusinesses] = useState([]);
  const userContext = useContext(UserContext);

  const fetchUserProfile = (token) => {
    const backendUrl = getBackendUrl("/users/profile");

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
          if (result.status === 401) {
            userContext.setUser({ isLoggedIn: false });
            localStorage.setItem("isLoggedIn", false);
            localStorage.setItem("token", result.data.accessToken);
            options.headers.Authorization = result.data.accessToken;
            try {
              fetch(backendUrl, options)
                .then((result) => result.json())
                .then((result) => {
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
            } catch (error) {}
          }
          if (result.status === 400) {
            // console.log("-- 400 --");
            // console.log(result);
          }

          if (result.status === 200) {
            let userProfile = result.data;
            userContext.setUser({
              isLoggedIn: true,
              firstName: userProfile.first_name,
              lastName: userProfile.last_name,
              role: userProfile.role,
              isAdmin: checkIsAdmin(userProfile.role),
            });
            setBusinesses(userProfile.businesses);
          }
        });
    } catch (err) {
      userContext.setUser({ isLoggedIn: false, token: null });
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") ||
      localStorage.getItem("token") !== "undefined"
    ) {
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

    return <div>Please login again</div>;
  };

  return (
    <Fragment>
      <section className="profile-wrapper">
        <ProfileHeader props={userContext.user} />
        {userContext.user.isAdmin ? <AdminProfile /> : renderBusinesses()}
      </section>
      <section className="page-content__authsection styled-link">
        <AuthButton btnClassNamePrefix="page-content" />
      </section>
    </Fragment>
  );
};

export default Profile;
