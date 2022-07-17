import React, { useState, useEffect, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { UserContext } from "../../contexts/UserContext";

import { getBackendUrl } from "../../helpers/routeHelpers";
import appSettings from "../../config/appSettings.json";
import PasswordField from "./PasswordField";

const emailStateReducer = (state, action) => {
  if (action.type === "EMAIL_ADDRESS_INPUT") {
    return { value: action.value, isValid: action.isValid };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  let navigate = useNavigate();

  const adminThreshold = appSettings.roles.adminThreshold;
  const passwordErrorMessage = "error: password is invalid";

  const [password, setPassword] = useState("");
  const [passwordValidityString, setPasswordValidityString] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const userContext = useContext(UserContext);

  const [emailState, emailStateDispatch] = useReducer(emailStateReducer, {
    value: "",
    isValid: false,
  });

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      const loginStatus = localStorage.getItem("isLoggedIn");
      if (typeof loginStatus === Boolean) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const checkLoginCallbackValid = (result) => {
    if (!result.data) {
      return false;
    }
    return true;
  };

  const submitLogin = (loginCredentials) => {
    const backendUrl = getBackendUrl("/auth/login");

    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCredentials),
      redirect: "follow",
    };

    try {
      fetch(backendUrl, options)
        .then((result) => result.json())
        .then((result) => {
          if (result.status !== 200 || !checkLoginCallbackValid(result)) {
            return userContext.setUser({
              ...userContext.user,
              isLoggedIn: false,
            });
          }
          userContext.setUser({
            ...userContext.user,
            isLoggedIn: true,
          });
          const currentAccessToken = jwt_decode(result.data);
          const { role, uuid } = currentAccessToken;
          let userIsAdmin = parseInt(role) >= adminThreshold ? true : false;

          localStorage.setItem("token", result.data);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("isAdmin", userIsAdmin);

          userContext.setUser({
            ...userContext.user,
            isLoggedIn: true,
            isAdmin: userIsAdmin,
          });
        })
        .then(() => {
          navigate("/profile");
        })
        .then(() => {
          if (parseInt(localStorage.getItem("role")) >= adminThreshold) {
            userContext.setUser({
              ...userContext.user,
              isLoggedIn: true,
              isAdmin: true,
            });
          } else {
            userContext.setUser({
              ...userContext.user,
              isLoggedIn: true,
              isAdmin: false,
            });
          }
        });
    } catch (err) {
      userContext.setUser({
        ...userContext.user,
        isLoggedIn: false,
      });
    }
  };

  const onEmailChange = (e) => {
    const validity = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      e.target.value
    );

    emailStateDispatch({
      type: "EMAIL_ADDRESS_INPUT",
      value: e.target.value,
      isValid: validity,
    });
  };

  const onPasswordChange = (e) => {
    const password = e.target.value;

    if (password.length < 8) {
      setPasswordValidityString(passwordErrorMessage);
      setPasswordIsValid(false);
    } else {
      setPasswordValidityString("");
      setPasswordIsValid(true);
    }

    setPassword(password);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const loginCredentials = {
      email: emailState.value,
      password,
    };
    submitLogin(loginCredentials);
  };

  return (
    <main className="login-form">
      <form onSubmit={handleFormSubmit}>
        <div className={emailState.isValid ? "" : "field-error"}>
          <input
            type="email"
            name="email"
            value={emailState.value}
            onChange={onEmailChange}
            placeholder="email *"
          />
        </div>
        <PasswordField
          onPasswordChange={onPasswordChange}
          password={password}
          placeholder={
            passwordValidityString === ""
              ? "password *"
              : passwordValidityString
          }
          passwordIsValid={passwordIsValid}
        />

        <button
          type="submit"
          disabled={!(emailState.isValid && passwordIsValid)}
        >
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;
