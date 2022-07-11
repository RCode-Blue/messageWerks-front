import React, { useContext, useState } from "react";
import { getBackendUrl } from "../../helpers/routeHelpers";
import { checkLocalToken } from "../../helpers/tokenHelpers";
import { UserContext } from "../../contexts/UserContext";

import BusinessDetails from "./BusinessDetails";

const BusinessName = (props) => {
  const { props: business } = props;
  const [businessData, setBusinessData] = useState(business);
  const [showBusinessDetails, setShowBusinessDetails] = useState(false);
  const userContext = useContext(UserContext);

  const renderBusiness = () => {
    if (!showBusinessDetails) {
      return <div>{business.name}</div>;
    }
  };

  return (
    <div>
      <div>
        {showBusinessDetails ? (
          <BusinessDetails props={businessData} />
        ) : (
          renderBusiness()
        )}
      </div>
      <button
        onClick={() => {
          setShowBusinessDetails(!showBusinessDetails);
        }}
      >
        {showBusinessDetails ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default BusinessName;
