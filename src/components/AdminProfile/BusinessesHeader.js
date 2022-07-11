import React, { useState, useEffect, useContext } from "react";

import BusinessesList from "./BusinessesList";
import { getBackendUrl } from "../../helpers/routeHelpers";
import { checkLocalToken } from "../../helpers/tokenHelpers";
import { UserContext } from "../../contexts/UserContext";

const BusinessesHeader = () => {
  const [showList, setShowList] = useState(false);
  const [businessList, setBusinessList] = useState([]);
  const userContext = useContext(UserContext);
  let allBusiness;

  useEffect(() => {
    let isMounted = true;

    const fetchBusinesses = async () => {
      let token, result;

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
      let response = await fetch(backendUrl, options);
      result = await response.json();

      if (result.status === 200) {
        allBusiness = result.data;
      }

      if (result.status === 401) {
      }

      if (result.status === 400) {
      }

      if (result.status === 403) {
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
    <div>
      <div onClick={() => setShowList(!showList)}>Businesses Header</div>
      {showList ? <BusinessesList props={businessList} /> : null}
    </div>
  );
};

export default BusinessesHeader;
