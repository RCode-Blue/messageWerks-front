import React, { useContext, useState, useEffect } from "react";
import { getBackendUrl } from "../../helpers/routeHelpers";
import { checkLocalToken } from "../../helpers/tokenHelpers";
import { UserContext } from "../../contexts/UserContext";

const UserDetails = (props) => {
  // console.log(props);
  const { props: user } = props;
  const [userData, setUserData] = useState(user);
  // const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const userContext = useContext(UserContext);

  const [formData, setFormData] = useState({
    first_name: userData.first_name || "",
    last_name: userData.last_name || "",
    email: userData.email || "",
  });

  const handleFormDataChange = (e) => {
    const fieldName = e.target.name;
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const renderBusinesses = (businesses) => {
    if (businesses.length === 0) {
      return null;
    }
    return businesses.map((business) => {
      return <div key={business.uuid}>{business.name}</div>;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let result, token;
    const backendUrl = getBackendUrl("/users/edit");
    // console.log("Submitting form to ", backendUrl);
    token = checkLocalToken();
    if (!token) {
      userContext.setUser({ isLoggedIn: false });
    }

    let options = {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(formData),
    };

    let response = await fetch(backendUrl, options);
    result = await response.json();
    // console.log(result.data);
    const { first_name, last_name, email, uuid } = result.data;
    setUserData({
      first_name,
      last_name,
      email,
      uuid,
    });
    setShowForm(false);
  };

  const renderDetails = () => {
    // console.log("details rendered");
    return (
      <div>
        <div>{userData.first_name}</div>
        <div>{userData.last_name}</div>
        <div>{userData.email}</div>
        <div>Businesses:</div>
        <div>
          {userData.businesses ? renderBusinesses(userData.businesses) : null}
        </div>
        <button onClick={() => setShowForm(true)}>Edit</button>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First name"
          value={formData.first_name}
          onChange={handleFormDataChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last name"
          value={formData.last_name}
          onChange={handleFormDataChange}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleFormDataChange}
        />

        <button type="submit">Submit</button>
        <button onClick={() => setShowForm(false)}>Cancel</button>
      </form>
    );
  };

  useEffect(() => {
    let isMounted = true;

    const fetchUserDetails = async () => {
      let token, result, userDetails;

      token = checkLocalToken();
      if (!token) {
        userContext.setUser({ isLoggedIn: false });
      }

      const backendUrl = getBackendUrl("/users/uuid");

      let options = {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: token,
          uuid: userData.uuid,
        },
      };

      let response = await fetch(backendUrl, options);
      result = await response.json();

      if (result.status === 200) {
        userDetails = result.data;
      }

      if (result.status === 401) {
        options.headers.authorization = result.data.accesToken;
        let response = await fetch(backendUrl, options);
        userDetails = (await response.json()).data;
      }

      if (result.status === 400) {
        console.error("400 bad request");
      }
      if (result.status === 403) {
        console.error("403 forbidden");
      }

      userDetails.fetched = true;
      setUserData(userDetails);
      setFormData(userDetails);
    };

    fetchUserDetails();

    return () => {
      isMounted = false;
    };
  }, []);

  // console.log("showForm: ", showForm);
  return <div>{showForm ? renderForm() : renderDetails()}</div>;
};

export default UserDetails;
