import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import BusinessesList from "./BusinessesList";
import { checkLocalToken } from "../../helpers/tokenHelpers";
import { getBackendUrl } from "../../helpers/routeHelpers";
import { UserContext } from "../../contexts/UserContext";

const BusinessesHeader = () => {
  const [showList, setShowList] = useState(false);
  const [businessList, setBusinessList] = useState([]);
  const userContext = useContext(UserContext);
  let allBusiness;

  useEffect(() => {
    let isMounted = true;

    const fetchBusinesses = async () => {
      let token, response, result;

      token = checkLocalToken();
      if (!token) {
        UserContext.setUser({ isLoggedIn: false });
      }

      const backendUrl = getBackendUrl("/business/all");

      let options = {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: token,
          queryType: "nameOnly",
        },
      };
      response = await fetch(backendUrl, options);
      result = await response.json();

      if (result.status === 200) {
        allBusiness = result.data;
      }

      if (result.status === 401) {
        options.headers.authentication = result.data.accessToken;
        response = await fetch(backendUrl, options);
        allBusiness = (await response.json).data;
      }

      if (result.status === 400) {
        userContext.setUser({ isLoggedIn: false });
      }

      if (result.status === 403) {
        console.error("403 forbidden");
      }

      if (isMounted) {
        setBusinessList(allBusiness);
      }
    };
    fetchBusinesses();

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
          Businesses
        </h1>

        <div onClick={() => setShowList(!showList)}>
          {showList ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </div>
      </div>

      {showList ? <BusinessesList props={businessList} /> : null}
    </section>
  );
};

export default BusinessesHeader;
