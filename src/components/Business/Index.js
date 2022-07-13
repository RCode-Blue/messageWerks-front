import log from "eslint-plugin-react/lib/util/log";
import React, { useState, Fragment } from "react";

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

  const initialShowState = {
    business: false,
    emails: false,
    assets: false,
    settings: false,
  };

  const [expandBusinessMenu, setexpandBusinessMenu] = useState(false);
  const [showDetails, setShowDetails] = useState(initialShowState);

  const renderBusinessDetails = () => {
    if (showDetails.business) {
      return (
        <section>
          <BusinessDetails props={businessDetails} />
        </section>
      );
    }
    if (showDetails.emails) {
      return <section>EMAILS</section>;
    }
    if (showDetails.assets) {
      return <section>ASSETS</section>;
    }
    if (showDetails.settings) {
      return <section>SETTINGS</section>;
    }

    return <div></div>;
  };

  const renderBusinessDropdown = () => {
    if (expandBusinessMenu) {
      return (
        <div>
          <menu className="business-menu">
            <ul>
              <li
                className={`styled-element ${
                  showDetails.business
                    ? "styled-element-active"
                    : "styled-element-default"
                }`}
                onClick={() => {
                  setShowDetails({
                    ...initialShowState,
                    business: !showDetails.business,
                  });
                }}
              >
                Business
              </li>

              <li
                className={`styled-element ${
                  showDetails.emails
                    ? "styled-element-active"
                    : "styled-element-default"
                }`}
                onClick={() =>
                  setShowDetails({
                    ...initialShowState,
                    emails: !showDetails.emails,
                  })
                }
              >
                Emails
              </li>
              <li
                className={`styled-element ${
                  showDetails.assets
                    ? "styled-element-active"
                    : "styled-element-default"
                }`}
                onClick={() =>
                  setShowDetails({
                    ...initialShowState,
                    assets: !showDetails.assets,
                  })
                }
              >
                Assets
              </li>
              <li
                className={`styled-element ${
                  showDetails.settings
                    ? "styled-element-active"
                    : "styled-element-default"
                }`}
                onClick={() =>
                  setShowDetails({
                    ...initialShowState,
                    settings: !showDetails.settings,
                  })
                }
              >
                Settings
              </li>
            </ul>
          </menu>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <Fragment>
      <div
        className={`styled-element business-title ${
          expandBusinessMenu
            ? "styled-element-active"
            : "styled-element-default"
        }`}
        onClick={() => {
          setexpandBusinessMenu(!expandBusinessMenu);
        }}
      >
        {name}
      </div>
      {expandBusinessMenu ? renderBusinessDropdown() : null}
      {renderBusinessDetails()}
    </Fragment>
  );
};

export default Business;
