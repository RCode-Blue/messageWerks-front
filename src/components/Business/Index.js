import React, {
  useContext,
  useReducer,
  useState,
  useEffect,
  Fragment,
} from "react";
import { UserContext } from "../../contexts/UserContext";

import BusinessDetails from "./BusinessDetails";

const Business = (props) => {
  const businessDetails = props.props;
  const {
    name,
    address_line1,
    address_line2,
    suburb,
    state,
    country,
    postcode,
    uuid,
  } = businessDetails;

  const userContext = useContext(UserContext);
  const [expandBusiness, setexpandBusiness] = useState(false);
  const [showDetails, setShowDetails] = useState({
    business: false,
    emails: false,
    assets: false,
    settings: false,
  });

  const setActiveTab = (tabName) => {
    let scratchState = { ...showDetails };
  };

  const renderBusinessDropdown = () => {
    if (expandBusiness) {
      return (
        <menu className="business-menu">
          <ul>
            <li
              className="styled-element"
              onClick={() => console.log("clicked Business")}
            >
              Business
            </li>
            <li
              className="styled-element"
              onClick={() => setActiveTab("emails")}
            >
              Emails
            </li>
            <li
              className="styled-element"
              onClick={() => setActiveTab("assets")}
            >
              Assets
            </li>
            <li
              className="styled-element"
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </li>
          </ul>
        </menu>
      );
    }
    return <div>No display</div>;
  };

  return (
    <Fragment>
      <div
        className={`styled-element business-title ${
          expandBusiness ? "styled-element-active" : "styled-element-default"
        }`}
        onClick={() => {
          setexpandBusiness(!expandBusiness);
        }}
      >
        {name}
      </div>
      {renderBusinessDropdown()}
    </Fragment>
  );
};

export default Business;
