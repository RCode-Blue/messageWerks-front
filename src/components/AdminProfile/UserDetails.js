import React, { useContext, useState } from "react";
import { getBackendUrl } from "../../helpers/routeHelpers";
import { checkLocalToken } from "../../helpers/tokenHelpers";
import { UserContext } from "../../contexts/UserContext";
import log from "eslint-plugin-react/lib/util/log";

const UserDetails = (props) => {
  // console.log(props);
  const { props: user } = props;
  const [userData, setUserData] = useState(user);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const userContext = useContext(UserContext);

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
    console.log("businesses length: ", businesses.length);
    if (businesses.length === 0) {
      console.log("zero");
      return null;
    }
    return businesses.map((business) => {
      console.log("biz", business.name);
      return <div>{business.name}</div>;
    });
  };

  const renderUserDetails = () => {
    if (!showDetails && !showEdit) {
      return (
        <div
          onClick={() => {
            setShowDetails(!showDetails);
            if (!userData.fetched) {
              console.log("fetch");
              fetchUserDetails();
            }
          }}
        >
          {userData.first_name} {userData.last_name}
        </div>
      );
    }
    if (showDetails && !showEdit) {
      console.log("userData: ", userData);

      return (
        <div onClick={() => setShowDetails(!showDetails)}>
          <div>{userData.first_name}</div>
          <div>{userData.last_name}</div>
          <div>{userData.email}</div>
          <div>Businesses:</div>
          <div>
            {userData.businesses ? renderBusinesses(userData.businesses) : null}
          </div>
          <div>-</div>
        </div>
      );
    }
    if (showDetails && showEdit) {
      return <div>Show edit</div>;
    }
  };

  // console.log("userData: ", userData);
  return <div>{renderUserDetails()}</div>;
};

export default UserDetails;
