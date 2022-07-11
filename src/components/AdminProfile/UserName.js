import React, { useContext, useState } from "react";
import { getBackendUrl } from "../../helpers/routeHelpers";
import { checkLocalToken } from "../../helpers/tokenHelpers";
import { UserContext } from "../../contexts/UserContext";

import UserDetails from "./UserDetails";

const UserName = (props) => {
  // console.log(props);
  const { props: user } = props;
  const [userData, setUserData] = useState(user);
  // const [showDetails, setShowDetails] = useState(false);
  // const [showEdit, setShowEdit] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const userContext = useContext(UserContext);
  /*
  const fetchUserDetails = async () => {
    let token, result, userDetails;

    token = checkLocalToken();
    if (!token) {
      userContext.setUser({ isLoggedIn: false });
    }

    const backendUrl = getBackendUrl("/users/uuid");

    let options = {
      method: "GET",
      mode: "cors",
      headers: {
        authorization: token,
        uuid: userData.uuid,
      },
    };

    let response = await fetch(backendUrl, options);
    result = await response.json();

    if (result.status === 200) {
      userDetails = result.data;
      // userDetails.fetched = true;
    }

    if (result.status === 401) {
      options.headers.authorization = result.data.accesToken;
      let response = await fetch(backendUrl, options);
      userDetails = (await response.json()).data;
      // userDetails.fetched = true;
    }

    if (result.status === 400) {
      console.error("400 bad request");
    }
    if (result.status === 403) {
      console.error("403 forbidden");
    }

    // console.log("result: ", result.data);
    // setUserData(result.data);
    // console.log("user details: ", userDetails);
    userDetails.fetched = true;
    setUserData(userDetails);
    // setUserData(...userDetails, { fetched: true });
  };

  
  const renderBusinesses = (businesses) => {
    // console.log("businesses: ", businesses);
    if (businesses.length === 0) {
      // console.log("zero");
      return null;
    }
    return businesses.map((business) => {
      // console.log("---biz: ", business.uuid);
      return <div key={business.uuid}>{business.name}</div>;
    });
  };

  const renderUserDetails = () => {
    if (!showDetails && !showEdit) {
      return (
        <div
          onClick={() => {
            setShowDetails(!showDetails);
            if (!userData.fetched) {
              // console.log("fetch");
              fetchUserDetails();
            }
          }}
        >
          {userData.first_name} {userData.last_name}
        </div>
      );
    }
    if (showDetails && !showEdit) {
      // console.log("userData: ", userData);

      return (
        <div onClick={() => setShowDetails(!showDetails)}>
          <div>{userData.first_name}</div>
          <div>{userData.last_name}</div>
          <div>{userData.email}</div>
          <div>Businesses:</div>
          <div>
            {userData.businesses ? renderBusinesses(userData.businesses) : null}
          </div>
          <button onClick={() => setShowEdit(true)}>Edit</button>
        </div>
      );
    }
    if (showDetails && showEdit) {
      return (
        <div>
          Show edit
          <button></button>
        </div>
      );
    }
  };
  */

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

  return (
    <div>
      <div>
        {showUserDetails ? <UserDetails props={userData} /> : renderUser()}
      </div>
      <button onClick={() => setShowUserDetails(!showUserDetails)}>
        {showUserDetails ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default UserName;
