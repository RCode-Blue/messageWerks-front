import React from "react";

import BusinessName from "./BusinessName";

const BusinessesList = (props) => {
  const { props: businesses } = props;
  return (
    <div className="section-detail-wrapper">
      {businesses.map((business) => {
        return <BusinessName props={business} key={business.uuid} />;
      })}
    </div>
  );
};

export default BusinessesList;
