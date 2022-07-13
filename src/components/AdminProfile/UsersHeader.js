import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { checkLocalToken } from "../../helpers/tokenHelpers";
import { getBackendUrl } from "../../helpers/routeHelpers";
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

  return (
    <section
      className={`admin-profile-section ${
        showList ? "admin-profile-section__active" : ""
      }`}
    >
      <div className="admin-profile-section__header">
        <h1
          className={`styled-element ${
            showList ? "styled-element-active" : "styled-element-default"
          }`}
        >
          Users
        </h1>
        <div onClick={() => setShowList(!showList)}>
          {showList ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </div>
      </div>

      {showList ? <UsersList props={userList} /> : null}
    </section>
  );
};

export default UsersHeader;
