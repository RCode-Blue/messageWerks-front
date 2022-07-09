import React, { useEffect, useState } from "react";
import { getBackendUrl } from "../../helpers/routeHelpers";

const UserDisplay = (props) => {
  let result;
  const { props: user } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState(user);
  const [showDetails, setShowDetails] = useState(false);

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

  const fetchUserData = async () => {
    let token = checkLocalToken();
    if (!token) return token;

    const backendUrl = getBackendUrl("/users/uuid");
    console.log(backendUrl);
    let options = {
      method: "GET",
      mode: "cors",
      headers: {
        authorization: token,
        uuid: userData.uuid,
      },
    };

    let resp = await fetch(backendUrl, options);
    result = await resp.json();
    console.log(await result);
    // console.log(await result.status);
    // console.log(await result.data.accessToken);

    if (result.status === 401) {
      options.headers.authorization = result.data.accessToken;
      // console.log(options);
      let resp = await fetch(backendUrl, options);
      result = await resp.json();
    }

    console.log("-----------");
    console.log(await result);
  };

  useEffect(() => {});

  const showUser = () => {
    if (!showDetails) {
      return (
        <div onClick={() => fetchUserData()}>
          {user.first_name} {user.last_name}
        </div>
      );
    }
  };

  const editUser = () => {
    return (
      <form>
        <input
          type="text"
          name="first_name"
          placeholder="First name"
          value={user.first_name}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last name"
          value={user.last_name}
        />
      </form>
    );
  };

  const renderShowEdit = () => {
    if (isEdit) {
      return editUser();
    }
    return showUser();
  };

  return (
    <div>
      {renderShowEdit()}
      <button onClick={() => setIsEdit(!isEdit)}>
        {isEdit ? "Cancel" : "Edit"}
      </button>
    </div>
  );
};

export default UserDisplay;
