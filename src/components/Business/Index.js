import React, {
  useContext,
  useReducer,
  useState,
  useEffect,
  Fragment,
} from "react";
import UserContext from "../../contexts/UserContext";

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

  const { user, setUser } = useContext(UserContext);
  const [expandBusiness, setexpandBusiness] = useState(false);
  const [showDetails, setShowDetails] = useState({
    business: false,
    emails: false,
    assets: false,
    settings: false,
  });

  const renderBusinessDropdown = () => {
    if (expandBusiness) {
      return (
        <menu className="business-menu">
          <ul>
            <li className="styled-component">Business</li>
            <li className="styled-component">Emails</li>
            <li className="styled-component">Assets</li>
            <li className="styled-component">Settings</li>
          </ul>
        </menu>
      );
    }
    return <div>No display</div>;
  };

  // useEffect(() => {
  //   console.log("expandBusiness: ", expandBusiness);
  // });

  return (
    <Fragment>
      <div
        className={`styled-component business-title ${
          expandBusiness
            ? "styled-component-active"
            : "styled-component-default"
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
