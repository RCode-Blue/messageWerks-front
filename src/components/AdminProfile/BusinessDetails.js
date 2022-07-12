import React, { useContext, useState, useEffect } from "react";
import { getBackendUrl } from "../../helpers/routeHelpers";
import { checkLocalToken } from "../../helpers/tokenHelpers";
import { UserContext } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const BusinessDetails = (props) => {
  const { props: business } = props;
  const [businessData, setBusinessData] = useState(business);
  const [showForm, setShowForm] = useState(false);
  const userContext = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: businessData.name || "",
    address_line1: businessData.address_line1 || "",
    address_line2: businessData.address_line2 || "",
    suburb: businessData.suburb || "",
    state: businessData.state || "",
    country: businessData.country || "",
    postcode: businessData.postcode || "",
  });

  const handleFormDataChange = (e) => {
    const fieldName = e.target.name;
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let result, token;
    const backendUrl = getBackendUrl("/business/edit");
    token = checkLocalToken();
    if (!token) {
      userContext.setUser({ isLoggedIn: false });
    }

    let options = {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(formData),
    };

    let response = await fetch(backendUrl, options);
    result = await response.json();
    const {
      name,
      address_line1,
      address_line2,
      suburb,
      state,
      country,
      postcode,
      uuid,
    } = result.data;
    setBusinessData({
      name,
      address_line1,
      address_line2,
      suburb,
      state,
      country,
      postcode,
      uuid,
    });
    setShowForm(false);
  };

  const renderDetails = () => {
    return (
      <div className="section-detail__show">
        <div className="section-detail__show__data">
          <div>{businessData.name}</div>
          <div>
            {businessData.address_line1} {businessData.address_line2}
          </div>
          <div>{businessData.suburb}</div>
          <div>{businessData.state}</div>
          <div>{businessData.country}</div>
          <div>{businessData.postcode}</div>
        </div>
        <FontAwesomeIcon
          className="section-detail__show__icon"
          icon={faEdit}
          onClick={() => setShowForm(true)}
        />
      </div>
    );
  };

  const renderForm = () => {
    return (
      <form className="section-detail__form" onSubmit={handleFormSubmit}>
        <div className="section-detail__form__entry">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Business name"
            value={formData.name}
            onChange={handleFormDataChange}
          />
        </div>
        <div className="section-detail__form__entry">
          <label htmlFor="address_line1">Address line 1:</label>
          <input
            type="text"
            name="address_line1"
            placeholder="Address line 1"
            value={formData.address_line1}
            onChange={handleFormDataChange}
          />
        </div>

        <div className="section-detail__form__entry">
          <label htmlFor="address_line2">Address line 2:</label>
          <input
            type="text"
            name="address_line2"
            placeholder="Address line 2"
            value={formData.address_line2}
            onChange={handleFormDataChange}
          />
        </div>

        <div className="section-detail__form__entry">
          <label htmlFor="suburb">Suburb:</label>
          <input
            type="text"
            name="suburb"
            placeholder="Suburb"
            value={formData.suburb}
            onChange={handleFormDataChange}
          />
        </div>

        <div className="section-detail__form__entry">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleFormDataChange}
          />
        </div>

        <div className="section-detail__form__entry">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleFormDataChange}
          />
        </div>

        <div className="section-detail__form__entry">
          <label htmlFor="postcode">Postcode:</label>
          <input
            type="text"
            name="postcode"
            placeholder="Postcode"
            value={formData.postcode}
            onChange={handleFormDataChange}
          />
        </div>

        <button type="submit">Submit</button>
        <button onClick={() => setShowForm(false)}>Cancel</button>
      </form>
    );
  };

  useEffect(() => {
    let isMounted = true;

    const fetchBusinessDetails = async () => {
      let token, result, businessDetails;

      token = checkLocalToken();
      if (!token) {
        UserContext.setUser({ isLoggedIn: false });
      }

      const backendUrl = getBackendUrl("/business/uuid");

      let options = {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: token,
          uuid: businessData.uuid,
        },
      };
      let response = await fetch(backendUrl, options);
      result = await response.json();

      if (result.status === 200) {
        businessDetails = result.data;
      }
      if (result.status === 401) {
        options.headers.authentication = result.data.accessToken;
        let response = await fetch(backendUrl, options);
        userDetails = (await response.json).data;
      }
      if (result.status === 400) {
        console.error("400 bad request");
      }

      if (result.status === 403) {
        console.error("403 forbidden");
      }

      businessDetails.fetched = true;
      setBusinessData(businessDetails);
      setFormData(businessDetails);
    };

    fetchBusinessDetails();
    return () => {
      isMounted = false;
    };
  }, []);

  return <div>{showForm ? renderForm() : renderDetails()}</div>;
};

export default BusinessDetails;
