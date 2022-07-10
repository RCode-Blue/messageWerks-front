import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getBackendUrl } from "../../helpers/routeHelpers";
// import UsersList from "./UsersList";
import BusinessesList from "./BusinessesList";
import UserDisplay from "./UserDisplay";
// import { checkLocalToken } from "../../helpers/checkLocalToken";

const AdminProfile = () => {
  const userContext = useContext(UserContext);
  const [showBusinessesList, setShowBusinessesList] = useState(false);
  const [showUsersList, setShowUsersList] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [businessesList, setBusinessesList] = useState([]);

  const checkLocalToken = () => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") === "undefined"
    ) {
      userContext.setUser({ isLoggedIn: false });
      return false;
    } else {
      return localStorage.getItem("token");
    }
  };

  const fetchAllUserNames = async () => {
    let token = checkLocalToken();
    if (!token) return token;

    const backendUrl = getBackendUrl("/users/all");

    let options = {
      method: "GET",
      mode: "cors",
      headers: {
        authorization: token,
        querytype: "nameOnly",
      },
    };

    let response = await fetch(backendUrl, options);
    // const users = (await response.json()).data;
    // setUsersList(users);
    setUsersList((await response.json()).data);
  };

  const fetchAllBusinessNames = async () => {
    let token = checkLocalToken();
    if (!token) return false;

    const backendUrl = getBackendUrl("/business/all");

    let options = {
      method: "GET",
      mode: "cors",
      headers: {
        authorization: token,
        queryType: "nameOnly",
      },
    };

    let response = await fetch(backendUrl, options);
    // const businesses = (await response.json()).data;
    // setBusinessesList(businesses);
    setBusinessesList((await response.json()).data);
  };

  const renderUsers = () => {
    if (showUsersList) {
      return (
        <div>
          {usersList.map((user) => {
            return <UserDisplay props={user} key={user.uuid} />;
          })}
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    // fetchAllUserNames();
    // fetchAllBusinessNames();
  }, []);

  const renderAdminProfile = () => {
    // console.log("businessesList: ", businessesList);
    console.log("showUsersList: ", showUsersList);
    return (
      <div>
        <div>. Admin Profile .</div>
        <div onClick={() => setShowUsersList(!showUsersList)}>Users</div>
        <div>{renderUsers()}</div>
        <div onClick={() => setShowBusinessesList(!showBusinessesList)}>
          Businesses
        </div>
        <div>
          {showBusinessesList ? (
            <BusinessesList props={businessesList} />
          ) : null}
        </div>
      </div>
    );
  };

  // console.log("--- usersList: ", usersList);
  return (
    <div>
      <div>
        {userContext.user.isLoggedIn ? renderAdminProfile() : "Please log in"}
      </div>
    </div>
  );
};

export default AdminProfile;
