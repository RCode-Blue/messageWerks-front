import React, { useState, useEffect, useContext } from "react";
import { getBackendUrl } from "../../helpers/routeHelpers";
import { checkLocalToken } from "../../helpers/tokenHelpers";
import { UserContext } from "../../contexts/UserContext";

import UsersList from "./UsersList";

const UsersHeader = () => {
  const [userList, setUserList] = useState([]);
  const [showList, setShowList] = useState(false);
  const userContext = useContext(UserContext);
  let users;
  useEffect(async () => {
    let token, result;

    token = checkLocalToken();
    if (!token) {
      return userContext.setUser({ isLoggedIn: false });
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
    console.log("result: ", result.data);

    if (result.status === 200) {
      console.log("result 200: ", result.data);

      return setUserList(result.data);
    }

    if (result.status === 401) {
      const controller401 = new AbortController();
      options.headers.authorization = result.data.accessToken;
      let response1 = await fetch(backendUrl, options);
      // return setUserList((await response.json()).data);
      // return setShowList(false);
      // console.log("result 401: ", result.data);
      const users401 = (await response1.json()).data;

      setUserList(users401);

      // result = await response1.json();
      console.log("result 401: ", users401);
    }

    if (result.status === 400) {
      console.log("400 bad request");
      // return setShowList(false);
    }
    if (result.status === 403) {
      console.log("403 forbidden");
      // return setShowList(false);
    }
    // console.log("data: ", );
    // return setUserList(result.data);

    return () => {
      controller401.abort();
    };
  }, []);

  console.log("userList: ", userList);

  return (
    <div>
      <div onClick={() => setShowList(!showList)}>Users Header</div>
    </div>
  );
};

export default UsersHeader;
