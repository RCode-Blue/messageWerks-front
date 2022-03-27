import React, { useState } from "react";
import PasswordField from "./passwordField";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    console.log("email: ", email, "password: ", password);
  };

  return (
    <div className="login-form">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={onEmailChange}
          placeholder="email *"
        />
        <PasswordField
          onPasswordChange={onPasswordChange}
          password={password}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
