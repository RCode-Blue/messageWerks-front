import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { checkLocalToken } from "../../helpers/tokenHelpers";
import { getBackendUrl } from "../../helpers/routeHelpers";

const BusinessDetails = (props) => {
  const [formIsActive, setFormIsActive] = useState(false);
  // const [fomIsValid, setFormIsValid] = useState(
  //   formData.name ? true : false && formData.address_line1 ? true : false
  // );

  const {
    name,
    address_line1,
    address_line2,
    suburb,
    state,
    country,
    postcode,
    uuid,
  } = props.props;

  // const [nameIsValid, setNameIsValid] = useState(name ? true : false);

  const originalFormState = {
    name: name,
    address_line1: address_line1 || "",
    address_line2: address_line2 || "",
    suburb: suburb || "",
    state: state || "",
    country: country || "",
    postcode: postcode || "",
    uuid: uuid,
  };

  const [formData, setFormData] = useState(originalFormState);

  const [formFieldsValid, setFormFieldsValid] = useState({
    name: name ? true : false,
    address_line1: address_line1 ? true : false,
    suburb: suburb ? true : false,
    state: state ? true : false,
    country: country ? true : false,
    postcode: postcode ? true : false,
  });

  const userContext = useContext(UserContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let result, token;
    const backendUrl = getBackendUrl("/business/edit");

    token = checkLocalToken();
    if (!token) {
      userContext.setUser({ isLoggedIn: false });
    }

    token = localStorage.getItem("token");

    let options = {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(formData),
    };

    let resp = await fetch(backendUrl, options);
    result = await resp.json();
    const {
      name,
      uuid,
      address_line1,
      address_line2,
      suburb,
      state,
      country,
      postcode,
    } = result.data;
    setFormData({
      name,
      address_line1,
      address_line2,
      suburb,
      state,
      country,
      postcode,
      uuid,
    });
    setFormIsActive(false);
  };

  const fieldIsValid = (variable) => {
    if (variable) {
      return true;
    } else {
      return false;
    }
  };

  const formIsValid = () => {
    return Object.values(formFieldsValid).every((value) => value === true);
  };

  const handleFormDataChange = (e) => {
    const fieldName = e.target.name;
    if (
      fieldName === "name" ||
      "address_line1" ||
      "suburb" ||
      "state" ||
      "country" ||
      "postcode"
    ) {
      setFormFieldsValid({
        ...formFieldsValid,
        [fieldName]: fieldIsValid(e.target.value),
      });
    }
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const renderForm = () => {
    // console.log(formFieldsValid);
    // console.log(formIsValid);
    return (
      <form className="business-details__form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="* Business name"
          value={formData.name}
          onChange={handleFormDataChange}
        />
        <input
          type="text"
          name="address_line1"
          placeholder="* address line 1"
          value={formData.address_line1}
          onChange={handleFormDataChange}
        />
        <input
          type="text"
          name="address_line2"
          placeholder="address line 2"
          value={formData.address_line2}
          onChange={handleFormDataChange}
        />
        <input
          type="text"
          name="suburb"
          placeholder="* suburb"
          value={formData.suburb}
          onChange={handleFormDataChange}
        />
        <input
          type="text"
          name="state"
          placeholder="* state"
          value={formData.state}
          onChange={handleFormDataChange}
        />
        <input
          type="text"
          name="country"
          placeholder="* country"
          value={formData.country}
          onChange={handleFormDataChange}
        />
        <input
          type="text"
          name="postcode"
          placeholder="* postcode"
          value={formData.postcode}
          onChange={handleFormDataChange}
        />
        <button type="submit" disabled={!formIsValid()}>
          Submit
        </button>
      </form>
    );
  };

  const renderDisplay = () => {
    return (
      <div className="business-details__contents">
        <div>{formData.name}</div>
        <div>{formData.address_line1}</div>
        <div>{formData.address_line2}</div>
        <div>{formData.suburb}</div>
        <div>{formData.state}</div>
        <div>{formData.country}</div>
        <div>{formData.postcode}</div>
      </div>
    );
  };

  const renderContents = () => {
    return <div>{formIsActive ? renderForm() : renderDisplay()}</div>;
  };

  return (
    <div className="business-details">
      {renderContents()}
      <button
        className="business-details__button"
        onClick={() => {
          if (formIsActive) {
            setFormData(originalFormState);
          }
          setFormIsActive(!formIsActive);
        }}
      >
        {formIsActive ? "Cancel" : "Edit"}
      </button>
    </div>
  );
};

export default BusinessDetails;
