import React, { useState, useEffect, useContext } from "react";
import { getBackendUrl } from "../../helpers/routeHelpers";
import { checkLocalToken } from "../../helpers/tokenHelpers";
import { UserContext } from "../../contexts/UserContext";

import UsersList from "./UsersList";

const UsersHeader = () => {
  const [userList, setUserList] = useState([]);
  const [showList, setShowList] = useState(false);
  const userContext = useContext(UserContext);
  let allUsers;

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      let token, result;

      token = checkLocalToken();
      // if (!token) return token;
      if (!token) {
        userContext.setUser({ isLoggedIn: false });
      }

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
      result = await response.json();

      if (result.status === 200) {
        allUsers = result.data;
      }

      if (result.status === 401) {
        options.headers.authorization = result.data.accessToken;
        let response = await fetch(backendUrl, options);
        allUsers = (await response.json()).data;
      }

      if (result.status === 400) {
        console.error("400 bad request");
        allUsers = [];
      }
      if (result.status === 403) {
        console.error("403 forbidden");
        allUsers = [];
      }
      if (isMounted) {
        setUserList(allUsers);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  // console.log("userList: ", userList);

  return (
    <div>
      <div onClick={() => setShowList(!showList)}>Users Header</div>
      {showList ? <UsersList props={userList} /> : null}
    </div>
  );
};

export default UsersHeader;
