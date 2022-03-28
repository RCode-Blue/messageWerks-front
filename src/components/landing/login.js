import React, { useState } from "react";
import PasswordField from "./passwordField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [entriesValid, setEntriesValid] = useState(true);
  const [emailValidityString, setEmailValidityString] = useState("");
  const [passwordValidityString, setPasswordValidityString] = useState("");

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
    let emailIsValid = false;
    let passwordIsValid = false;

    if (password === "") {
      setPasswordValidityString("error: password is invalid");
      passwordIsValid = false;
    } else {
      setPasswordValidityString("");
      passwordIsValid = true;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailValidityString("error: invalid email address");
      emailIsValid = false;
    } else {
      setEmailValidityString("");
      emailIsValid = true;
    }
    setEntriesValid(emailIsValid && passwordIsValid);

    // console.log("email: ", email, "password: ", password);
    // console.log("passwordValidityString: ", passwordValidityString);
  };
  // console.log("passwordValidityString: ", passwordValidityString);

  return (
    <div className="login-form">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={onEmailChange}
          placeholder={
            emailValidityString === "" ? "email *" : emailValidityString
          }
        />
        <PasswordField
          onPasswordChange={onPasswordChange}
          password={password}
          placeholder={
            passwordValidityString === ""
              ? "password *"
              : passwordValidityString
          }
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
