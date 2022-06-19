import React, { useState, useEffect, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PasswordField from "./PasswordField";
import appSettings from "../../config/appSettings.json";

import UserContext from "../../contexts/UserContext";

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
  const [loginIsValid, setLoginIsValid] = useState(true);
  const [passwordValidityString, setPasswordValidityString] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const { user, setUser } = useContext(UserContext);

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
    const { data } = result;
    if (!data.project_id || !data.role || !data.token || !data.uuid) {
      return false;
    }
    return true;
  };

  const submitLogin = (loginCredentials) => {
    const apiVersion = appSettings.backend.api.version;
    const path = "/auth/login";
    const backendUrl = `${process.env.BACKEND_PROTOCOL}${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/v${apiVersion}${path}`;

    let init = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCredentials),
      redirect: "follow",
    };
    try {
      fetch(backendUrl, init)
        .then((result) => result.json())
        .then((result) => {
          let loginResult = result;
          if (
            loginResult.status !== 200 ||
            !checkLoginCallbackValid(loginResult)
          ) {
            return setLoginIsValid(false);
          }
          setLoginIsValid(true);
          const { role, token, uuid } = loginResult.data;
          let userIsAdmin = parseInt(role) >= adminThreshold ? true : false;

          localStorage.setItem("role", role);
          localStorage.setItem("token", token.value);
          localStorage.setItem("uuid", uuid);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("isAdmin", userIsAdmin);

          setUser({
            isLoggedIn: true,
            isAdmin: userIsAdmin,
          });
        })
        .then(() => {
          navigate("/profile");
        })
        .then(() => {
          if (parseInt(localStorage.getItem("role")) >= adminThreshold) {
            setUser({ isLoggedIn: true, isAdmin: true });
          } else {
            setUser({ isLoggedIn: true, isAdmin: false });
          }
        });
    } catch (err) {
      setLoginIsValid(false);
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
    <div className="login-form">
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
    </div>
  );
};

export default Login;
