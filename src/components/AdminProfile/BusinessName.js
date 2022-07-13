import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import BusinessDetails from "./BusinessDetails";
import { UserContext } from "../../contexts/UserContext";

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
    <section className="section-detail">
      <>
        {showBusinessDetails ? (
          <BusinessDetails props={businessData} />
        ) : (
          renderBusiness()
        )}
      </>

      <div
        className="section-detail__icon"
        onClick={() => setShowBusinessDetails(!showBusinessDetails)}
      >
        {showBusinessDetails ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </div>
    </section>
  );
};

export default BusinessName;
