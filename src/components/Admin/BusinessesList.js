import React from "react";

const BusinessesList = (props) => {
  const { props: businesses } = props;
  return (
    <div>
      {businesses.map((business) => {
        return <div key={business.uuid}>{business.name}</div>;
      })}
    </div>
  );
};

export default BusinessesList;
