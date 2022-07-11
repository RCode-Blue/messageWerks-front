import React from "react";

import BusinessName from "./BusinessName";

const BusinessesList = (props) => {
  const { props: businesses } = props;
  // console.log("props: ", props);
  return (
    <div>
      {businesses.map((business) => {
        return <BusinessName props={business} key={business.uuid} />;
      })}
    </div>
  );
};

export default BusinessesList;
