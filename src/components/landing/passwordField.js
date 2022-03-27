import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const PasswordField = (props) => {
  const [fieldType, setFieldType] = useState("password");
  const handleMaskClick = () => {
    let newFieldType = fieldType === "text" ? "password" : "text";
    setFieldType(newFieldType);
  };

  return (
    <div className="password-field">
      <input
        type={fieldType}
        placeholder="password *"
        onChange={props.onPasswordChange}
        value={props.password}
      ></input>
      <span>
        <FontAwesomeIcon icon={faEye} onClick={handleMaskClick} />
      </span>
    </div>
  );
};
export default PasswordField;
