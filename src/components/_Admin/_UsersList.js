import React, { useState } from "react";

const UsersList = (props) => {
  const [isEdit, setIsEdit] = useState(false);

  const { props: users } = props;

  const handleShow = () => {
    return <div>DISPLAY</div>;
  };

  const handleEdit = () => {
    return <div>EDIT FORM</div>;
  };

  const handleDisplay = () => {
    return (
      <div>
        {isEdit ? handleEdit() : handleShow()}
        <button>{isEdit ? Cancel : Edit}</button>
      </div>
    );
  };

  return (
    <div>
      {users.map((user) => {
        return handleDisplay(user);
      })}
    </div>
  );
};

export default UsersList;
