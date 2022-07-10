import React, { useState } from "react";

import BusinessesList from "./BusinessesList";

const BusinessesHeader = () => {
  const [showList, setShowList] = useState(false);

  return (
    <div>
      <div onClick={() => setShowList(!showList)}>Businesses Header</div>
      {showList ? <BusinessesList /> : null}
    </div>
  );
};

export default BusinessesHeader;
