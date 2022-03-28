import React, { useState } from "react";
import PasswordField from "./passwordField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [entriesValid, setEntriesValid] = useState(true);
  const [emailValidityString, setEmailValidityString] = useState("");
  const [passwordValidityString, setPasswordValidityString] = useState("");
  const [emailIsValid, setEmailIsValid] = useState("true");
  const [passwordIsValid, setPasswordIsValid] = useState("true");

  const emailErrorMessage = "error: invalid email address";
  const passwordErrorMessage = "error: password is invalid";

  const onEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onPasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // let emailIsValid = false;
    // let passwordIsValid = false;

    if (password === "") {
      setPasswordValidityString(passwordErrorMessage);
      setPasswordIsValid(false);
    } else {
      setPasswordValidityString("");
      setPasswordIsValid(true);
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailValidityString(emailErrorMessage);
      setEmailIsValid(false);
    } else {
      setEmailValidityString("");
      setEmailIsValid(true);
    }
    setEntriesValid(emailIsValid && passwordIsValid);
  };

  return (
    <div className="login-form">
      <form onSubmit={handleFormSubmit}>
        <div className={emailIsValid ? "" : "field-error"}>
          <input
            type="text"
            name="email"
            value={email}
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
