import React, { useState, useEffect, useReducer } from "react";
import PasswordField from "./passwordField";
import appSettings from "../../config/appSettings.json";

const emailStateReducer = (state, action) => {
  if (action.type === "EMAIL_ADDRESS_INPUT") {
    return { value: action.value, isValid: action.isValid };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const adminThreshold = appSettings.roles.adminThreshold;
  const emailErrorMessage = "error: invalid email address";
  const passwordErrorMessage = "error: password is invalid";

  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [token, setToken] = useState(null);
  const [loginIsValid, setLoginIsValid] = useState(true);
  const [emailValidityString, setEmailValidityString] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordValidityString, setPasswordValidityString] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
    // console.log("Result: ", result);
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
    let loginResult;

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
        .then((result) => (loginResult = result))
        .then(() => {
          if (
            loginResult.status !== 200 ||
            !checkLoginCallbackValid(loginResult)
          ) {
            return setLoginIsValid(false);
          }
          setLoginIsValid(true);
          const { role, token, uuid } = loginResult.data;
          localStorage.setItem("role", role);
          localStorage.setItem("token", token.value);
          localStorage.setItem("uuid", uuid);
          localStorage.setItem("isLoggedIn", true);
        })
        .then(() => {
          if (parseInt(localStorage.getItem("role")) >= adminThreshold) {
            setIsAdmin(true);
          }
        })
        .then(() => {
          // setEmail("");
          setPassword("");
        });
    } catch (err) {
      setLoginIsValid(false);
    }
  };

  const onEmailChange = (e) => {
    emailStateDispatch({
      type: "EMAIL_ADDRESS_INPUT",
      value: e.target.value,
      isValid: () => {
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value);
      },
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
            placeholder={
              emailValidityString === "" ? "email *" : emailValidityString
            }
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
